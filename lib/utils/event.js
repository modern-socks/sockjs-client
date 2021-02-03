import random from './random';

var onUnload = {}
  , afterUnload = false
    // detect google chrome packaged apps because they don't allow the 'unload' event
  , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
  ;

export function attachEvent(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
        global.addEventListener(event, listener, false);
    } else if (global.document && global.attachEvent) {
        // IE quirks.
        // According to: http://stevesouders.com/misc/test-postmessage.php
        // the message gets delivered only to 'document', not 'window'.
        global.document.attachEvent('on' + event, listener);
        // I get 'window' for ie8.
        global.attachEvent('on' + event, listener);
    }
}

export function detachEvent(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
        global.removeEventListener(event, listener, false);
    } else if (global.document && global.detachEvent) {
        global.document.detachEvent('on' + event, listener);
        global.detachEvent('on' + event, listener);
    }
}

export function unloadAdd(listener) {
    if (isChromePackagedApp) {
        return null;
    }

    var ref = random.string(8);
    onUnload[ref] = listener;
    if (afterUnload) {
        setTimeout(this.triggerUnloadCallbacks, 0);
    }
    return ref;
}

export function unloadDel(ref) {
    if (ref in onUnload) {
        delete onUnload[ref];
    }
}

export function triggerUnloadCallbacks() {
    for (var ref in onUnload) {
      onUnload[ref]();
      delete onUnload[ref];
    }
}

const unloadTriggered = function () {
    if (afterUnload) {
        return;
    }
    afterUnload = true;
    triggerUnloadCallbacks();
};

// 'unload' alone is not reliable in opera within an iframe, but we
// can't use `beforeunload` as IE fires it on javascript: links.
if (!isChromePackagedApp) {
  attachEvent('unload', unloadTriggered);
}
export default {
    attachEvent,
    detachEvent,
    unloadAdd,
    unloadDel,
    triggerUnloadCallbacks
}
