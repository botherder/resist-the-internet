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
    if (localStorage.isFree === "false"){
        return {cancel: false};
    }

    let url = new URL(details.url);
    let params = url.searchParams;

    if (url.hostname.endsWith("google.com")) {
        if (url.hostname == "maps.google.com" || url.pathname.startsWith("/maps/")) {
            let newUrl = "https://www.openstreetmap.org"
            let begin = details.url.indexOf("/@");
            if (begin >= 0) {
                let rightPart = details.url.substring(begin + 2);
                let end = rightPart.indexOf("/");
                let coordsString = rightPart.substring(0, end);
                let coords = coordsString.split(",");

                newUrl += "?mlat=" + coords[0] + "&mlon=" + coords[1] + "&zoom=" + coords[2].substring(0, 2);
            }

            return {redirectUrl: newUrl};
        } else {
            let newUrl = "https://duckduckgo.com";
            let q = params.get("q");
            if (q) {
                newUrl += "/?q=" + q;
            }
            return {redirectUrl: newUrl};
        }
    } else if (url.hostname.endsWith("twitter.com")  ||
               url.hostname.endsWith("facebook.com") ||
               url.hostname.endsWith("instagram.com")) {
        return {redirectUrl: "https://www.joinmastodon.org"};
    } else if (url.hostname.endsWith("techcrunch.com")) {
        var betterSpent = [
            "https://my.fsf.org/donate",
            "https://donate.openstreetmap.org/",
            "https://www.openbsd.org/donations.html",
            "https://www.freebsdfoundation.org/donate/",
            "https://www.linuxfoundation.org/about/donate/",
        ];

        var rand = betterSpent[Math.floor(Math.random() * betterSpent.length)];
        return {redirectUrl: rand};
    } else if (url.hostname.endsWith("foxnews.com")   ||
               url.hostname.endsWith("breitbart.com") ||
               url.hostname.endsWith("afd.de")        ||
               url.hostname.endsWith("leganord.org")) {
        return {redirectUrl: "https://duckduckgo.com/?q=cute+puppies&ia=images&iax=images"}
    }
}, {
    urls: ["<all_urls>"],
    types: ["main_frame"],
}, [
    "blocking"
]);
