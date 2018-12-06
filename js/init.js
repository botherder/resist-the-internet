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

(function() {
    if (typeof localStorage.isFree === "undefined") {
        localStorage.isFree = true;
    }
    if (typeof localStorage.blockGoogle === "undefined") {
        localStorage.blockGoogle = true;
    }
    if (typeof localStorage.blockFacebook === "undefined") {
        localStorage.blockFacebook = true;
    }
    if (typeof localStorage.blockTwitter === "undefined") {
        localStorage.blockTwitter = true;
    }

    if (localStorage.isFree === "true") {
        browser.browserAction.setIcon({path: browser.extension.getURL("ico/resist.png")});
    } else {
        browser.browserAction.setIcon({path: browser.extension.getURL("ico/surveillance.png")});
    }
})();
