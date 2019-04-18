const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function(arg) {
    if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
    } else if (typeof arg === "string") {
        return document.querySelectorAll(arg);
    }
};