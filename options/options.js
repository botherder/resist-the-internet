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

function loadOptions() {
    if (localStorage.isFree === "true") {
        document.getElementById("icon").src = "../ico/resist.png";
        document.getElementById("status").innerText = "You are free";

    } else {
        document.getElementById("icon").src = "../ico/surveillance.png";
        document.getElementById("status").innerText = "You are surveilled";
    }

    if (localStorage.blockGoogle === "true") {
        document.getElementById("google").checked = true;
    }
    if (localStorage.blockFacebook === "true") {
        document.getElementById("facebook").checked = true;
    }
    if (localStorage.blockTwitter === "true") {
        document.getElementById("twitter").checked = true;
    }
}

function saveOptions() {
    localStorage.blockGoogle = document.querySelector("#google").checked;
    localStorage.blockFacebook = document.querySelector("#facebook").checked;
    localStorage.blockTwitter = document.querySelector("#twitter").checked;
    loadOptions();
}

function setFree() {
    if (localStorage.isFree === "true") {
        browser.notifications.create("freedom-alert", {
            "type": "basic",
            "iconUrl": browser.extension.getURL("ico/surveillance.png"),
            "title": "Resist the Internet",
            "message": "You have decided to opt-in with Surveillance Capitalism. Stay safe!"
        });
        localStorage.isFree = false;
        browser.browserAction.setIcon({path: browser.extension.getURL("ico/surveillance.png")});
    } else {
        browser.notifications.create("freedom-alert", {
            "type": "basic",
            "iconUrl": browser.extension.getURL("ico/resist.png"),
            "title": "Resist the Internet",
            "message": "Welcome back to a less privacy erosive Internet!"
        });
        localStorage.isFree = true;
        browser.browserAction.setIcon({path: browser.extension.getURL("ico/resist.png")});
    }
    loadOptions();
}

document.addEventListener("DOMContentLoaded", loadOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#freedomButton").addEventListener("click", setFree);
