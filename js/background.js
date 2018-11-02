browser.browserAction.onClicked.addListener(function(tab) {
    if (localStorage.isFree === "true") {
        browser.notifications.create("freedom-alert", {
            "type": "basic",
            "iconUrl": browser.extension.getURL("img/surveillance.png"),
            "title": "Resist the Internet",
            "message": "You have decided to opt-in with Surveillance Capitalism. Good luck out there!"
        });
        localStorage.isFree = false;
        browser.browserAction.setIcon({path: browser.extension.getURL("img/surveillance.png")});
    } else {
        browser.notifications.create("freedom-alert", {
            "type": "basic",
            "iconUrl": browser.extension.getURL("img/resist.png"),
            "title": "Resist the Internet",
            "message": "Welcome back to a less privacy erosive Internet!"
        });
        localStorage.isFree = true;
        browser.browserAction.setIcon({path: browser.extension.getURL("img/resist.png")});
    }
});

browser.webRequest.onBeforeRequest.addListener(function(details) {
    // If we're not free, we don't do anything.
    if (localStorage.isFree === "false"){
        return {cancel: false};
    }

    let url = new URL(details.url);
    let params = url.searchParams;
    let hostname = url.hostname.toLowerCase();
    // URL we're going to redirect to.
    let newUrl = "";

    // Check for Google services.
    if (isGoogle(hostname) === true) {
        // Check for Google maps.
        if (hostname.startsWith("maps.google.") || url.pathname.startsWith("/maps/")) {
            newUrl = "https://www.openstreetmap.org"
            let begin = details.url.indexOf("/@");
            if (begin >= 0) {
                let rightPart = details.url.substring(begin + 2);
                let end = rightPart.indexOf("/");
                let coordsString = rightPart.substring(0, end);
                let coords = coordsString.split(",");

                newUrl += "?mlat=" + coords[0] + "&mlon=" + coords[1] + "&zoom=" + coords[2].substring(0, 2);
            }
        // Check for Google Translate.
        } else if (hostname.startsWith("translate.google.")) {
            newUrl = "https://www.deepl.com"
            let begin = details.url.indexOf('/#');
            if (begin >= 0) {
                let params = details.url.substring(begin + 2);
                newUrl += "/translator#" + params;
            }
        // If regular Google.
        } else if (isMainGoogle(hostname) === true) {
            newUrl = "https://duckduckgo.com";
            let q = params.get("q");
            if (q) {
                newUrl += "/?q=" + q;
            }
        }
    // Check for social media.
    } else if (hostname.endsWith("twitter.com")  ||
               hostname.endsWith("facebook.com") ||
               hostname.endsWith("instagram.com")) {
        newUrl = "https://www.joinmastodon.org";
    // Check for start-up shit.
    } else if (hostname.endsWith("techcrunch.com")) {
        let betterSpent = [
            "https://my.fsf.org/donate",
            "https://www.debian.org/donations",
            "https://www.openbsd.org/donations.html",
            "https://www.freebsdfoundation.org/donate/",
            "https://www.linuxfoundation.org/about/donate/",
            "https://donate.openstreetmap.org/",
        ];

        newUrl = betterSpent[Math.floor(Math.random() * betterSpent.length)];
    // Check for fascist shit.
    } else if (hostname.endsWith("foxnews.com")   ||
               hostname.endsWith("breitbart.com") ||
               hostname.endsWith("afd.de")        ||
               hostname.endsWith("leganord.org")) {
        newUrl = "https://duckduckgo.com/?q=cute+puppies&ia=images&iax=images";
    }

    // If we got an alternative, redirect to it.
    if (newUrl != "") {
        return {redirectUrl: newUrl};
    } else {
        return {cancel: false};
    }
}, {
    urls: ["<all_urls>"],
    types: ["main_frame"],
}, [
    "blocking"
]);
