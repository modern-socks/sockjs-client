const path = require('path');

module.exports = {
    entry: './lib/entry.js',
    mode: 'production',
    resolve: {
        alias: {
            events: path.resolve(__dirname, 'lib/event/emitter.js'),
            crypto: path.resolve(__dirname, 'lib/utils/browser-crypto.js'),
            eventsource: path.resolve(__dirname, 'lib/transport/browser/eventsource.js'),
        }
    }
};
