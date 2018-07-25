(function() {
    if (typeof localStorage.isFree === "undefined") {
        localStorage.isFree = true;
    }

    if (localStorage.isFree === "true") {
        browser.browserAction.setIcon({path: browser.extension.getURL("img/resist.png")});
    } else {
        browser.browserAction.setIcon({path: browser.extension.getURL("img/surveillance.png")});
    }
})();
