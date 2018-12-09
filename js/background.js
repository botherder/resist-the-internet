// Copyright (c) 2018 Claudio Guarnieri.
//
// This file is part of Resist the Internet!
//
// Resist the Internet is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Resist the Internet is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Resist the Internet.  If not, see <https://www.gnu.org/licenses/>.

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

    //   _____                   _
    //  / ____|                 | |
    // | |  __  ___   ___   __ _| | ___
    // | | |_ |/ _ \ / _ \ / _` | |/ _ \
    // | |__| | (_) | (_) | (_| | |  __/
    //  \_____|\___/ \___/ \__, |_|\___|
    //                      __/ |
    //                     |___/
    // 
    if (isGoogle(hostname) === true) {
        // Check if we're alloed to block Google services.
        if (localStorage.blockGoogle === "false") {
            return {cancel: false};
        }

        // Check for Gmail.
        if (hostname.startsWith("mail.google.") ||
            url.pathname.startsWith("/gmail/")  ||
            hostname.startsWith("accounts.google.")) {
            // We don't redirect this.
            return {cancel: false};
        // Check for Google maps.
        } else if (hostname.startsWith("maps.google.") || url.pathname.startsWith("/maps/")) {
            newUrl = "https://www.openstreetmap.org"
            let begin = details.url.indexOf("/@");
            if (begin >= 0) {
                let coordsString = details.url.substring(begin + 2);
                let coords = coordsString.split(",");

                if (coords.length >= 2) {
                    newUrl += "?mlat=" + coords[0] + "&mlon=" + coords[1];
                    if (coords.length == 3) {
                        newUrl += "&zoom=" + coords[2].substring(0, 2);
                    }
                }
            }
        // Check for Google Translate.
        } else if (hostname.startsWith("translate.google.")) {
            newUrl = "https://www.deepl.com"
            let begin = details.url.indexOf('/#');
            if (begin >= 0) {
                let params = details.url.substring(begin + 2);
                newUrl += "/translator#" + params;
            }
        } else if (hostname.startsWith("drive.google.")) {
            newUrl = "https://nextcloud.com/";
        // If regular Google.
        } else if (isMainGoogle(hostname) === true) {
            console.log(details.url);
            newUrl = "https://duckduckgo.com";
            let q = params.get("q");
            if (q) {
                newUrl += "/?q=" + q;
            }
        }

 //  __     __      _______    _           
 //  \ \   / /     |__   __|  | |          
   // \ \_/ /__  _   _| |_   _| |__   ___  
    // \   / _ \| | | | | | | | '_ \ / _ \ 
    //  | | (_) | |_| | | |_| | |_) |  __/ 
    //  |_|\___/ \__,_|_|\__,_|_.__/ \___| 
    //                                
    } else if (hostname.endsWith("youtube.com")) {
        if (localStorage.blockTwitter === "false") {
            return {cancel: false};
        }

        newUrl = "https://invidio.us";        
        
    //  ______             _                 _    
    // |  ____|           | |               | |   
    // | |__ __ _  ___ ___| |__   ___   ___ | | __
    // |  __/ _` |/ __/ _ \ '_ \ / _ \ / _ \| |/ /
    // | | | (_| | (_|  __/ |_) | (_) | (_) |   < 
    // |_|  \__,_|\___\___|_.__/ \___/ \___/|_|\_\
    //
    } else if (hostname.endsWith("facebook.com")) {
        // Check if we're alloed to block Twitter.
        if (localStorage.blockFacebook === "false") {
            return {cancel: false};
        }

        let tooManyToPick = [
            "https://duckduckgo.com/?q=facebook+cambridge+analytica",
            "https://duckduckgo.com/?q=facebook+leaked+emails",
            "https://duckduckgo.com/?q=facebook+myanmar"
        ];

        newUrl = tooManyToPick[Math.floor(Math.random() * tooManyToPick.length)];

    //  _______       _ _   _            
    // |__   __|     (_) | | |           
    //    | |_      ___| |_| |_ ___ _ __ 
    //    | \ \ /\ / / | __| __/ _ \ '__|
    //    | |\ V  V /| | |_| ||  __/ |   
    //    |_| \_/\_/ |_|\__|\__\___|_|   
    //                                
    } else if (hostname.endsWith("twitter.com")) {
        if (localStorage.blockTwitter === "false") {
            return {cancel: false};
        }

        newUrl = "https://joinmastodon.org";

    // Yikes.
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
