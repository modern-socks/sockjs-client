import websocket from './transport/websocket';
import xhrStreaming from './transport/xhr-streaming';
import xdrStreaming from './transport/xdr-streaming';
import eventsource from './transport/eventsource';
import iframeWrap from './transport/lib/iframe-wrap';
import htmlFile from './transport/htmlfile';
import xhrPolling from './transport/xhr-polling';
import xdrPolling from './transport/xdr-polling';
import jsonpPolling from './transport/jsonp-polling';

export default [
  // streaming transports
  websocket
, xhrStreaming
, xdrStreaming
, eventsource
, iframeWrap(eventsource)

  // polling transports
, htmlFile
, iframeWrap(htmlFile)
, xhrPolling
, xdrPolling
, iframeWrap(xhrPolling)
, jsonpPolling
];
