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

let googleDomains = [
    "google.com", "google.ad", "google.ae", "google.com.af",
    "google.com.ag", "google.com.ai", "google.al", "google.am",
    "google.co.ao", "google.com.ar", "google.as", "google.at",
    "google.com.au", "google.az", "google.ba", "google.com.bd", "google.be",
    "google.bf", "google.bg", "google.com.bh", "google.bi", "google.bj",
    "google.com.bn", "google.com.bo", "google.com.br", "google.bs",
    "google.bt", "google.co.bw", "google.by", "google.com.bz", "google.ca",
    "google.cd", "google.cf", "google.cg", "google.ch", "google.ci",
    "google.co.ck", "google.cl", "google.cm", "google.cn", "google.com.co",
    "google.co.cr", "google.com.cu", "google.cv", "google.com.cy",
    "google.cz", "google.de", "google.dj", "google.dk", "google.dm",
    "google.com.do", "google.dz", "google.com.ec", "google.ee",
    "google.com.eg", "google.es", "google.com.et", "google.fi",
    "google.com.fj", "google.fm", "google.fr", "google.ga", "google.ge",
    "google.gg", "google.com.gh", "google.com.gi", "google.gl", "google.gm",
    "google.gp", "google.gr", "google.com.gt", "google.gy", "google.com.hk",
    "google.hn", "google.hr", "google.ht", "google.hu", "google.co.id",
    "google.ie", "google.co.il", "google.im", "google.co.in", "google.iq",
    "google.is", "google.it", "google.je", "google.com.jm", "google.jo",
    "google.co.jp", "google.co.ke", "google.com.kh", "google.ki",
    "google.kg", "google.co.kr", "google.com.kw", "google.kz", "google.la",
    "google.com.lb", "google.li", "google.lk", "google.co.ls", "google.lt",
    "google.lu", "google.lv", "google.com.ly", "google.co.ma", "google.md",
    "google.me", "google.mg", "google.mk", "google.ml", "google.com.mm",
    "google.mn", "google.ms", "google.com.mt", "google.mu", "google.mv",
    "google.mw", "google.com.mx", "google.com.my", "google.co.mz",
    "google.com.na", "google.com.nf", "google.com.ng", "google.com.ni",
    "google.ne", "google.nl", "google.no", "google.com.np", "google.nr",
    "google.nu", "google.co.nz", "google.com.om", "google.com.pa",
    "google.com.pe", "google.com.pg", "google.com.ph", "google.com.pk",
    "google.pl", "google.pn", "google.com.pr", "google.ps", "google.pt",
    "google.com.py", "google.com.qa", "google.ro", "google.ru", "google.rw",
    "google.com.sa", "google.com.sb", "google.sc", "google.se",
    "google.com.sg", "google.sh", "google.si", "google.sk", "google.com.sl",
    "google.sn", "google.so", "google.sm", "google.sr", "google.st",
    "google.com.sv", "google.td", "google.tg", "google.co.th",
    "google.com.tj", "google.tk", "google.tl", "google.tm", "google.tn",
    "google.to", "google.com.tr", "google.tt", "google.com.tw",
    "google.co.tz", "google.com.ua", "google.co.ug", "google.co.uk",
    "google.com.uy", "google.co.uz", "google.com.vc", "google.co.ve",
    "google.vg", "google.co.vi", "google.com.vn", "google.vu", "google.ws",
    "google.rs", "google.co.za", "google.co.zm", "google.co.zw",
    "google.cat", "google.com.pt", "google.kr", "google.com.dz",
    "google.sl", "google.do", "google.sg", "google.com.bi", "google.tw",
    "google.mx", "google.com.lv", "google.vn", "google.qa", "google.ph",
    "google.pk", "google.jp", "google.com.gr", "google.com.cn", "google.ng",
    "google.hk", "google.ua", "google.co.hu", "google.it.ao",
    "google.com.pl", "google.com.ru", "google.ne.jp", "google.com.cn",
];

function isMainGoogle(domain) {
    if (domain.startsWith("www.")) {
        domain = domain.substring(4);
    }

    if (googleDomains.indexOf(domain) > -1) {
        return true;
    }

    return false;
}

function isGoogle(domain) {
    if (isMainGoogle(domain) === true) {
        return true;
    }

    for (var i=0; i<googleDomains.length; i++) {
        if (domain.endsWith("." + googleDomains[i])) {
            return true;
        }
    }

    return false;
}
