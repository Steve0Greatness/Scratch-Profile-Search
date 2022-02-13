// ==UserScript==
// @name         https images
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make all images https, please note that this may break some images, if it does, go into the nav bar, and turn off this userscript
// @author       You
// @match        *://*.*
// @include      *
// @include      http://*.*
// @include      https://*.*
// @icon         https://thumbs.dreamstime.com/b/secure-http-protocol-color-square-buttons-icons-rounded-glossy-button-set-198232389.jpg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const allImages = document.getElementsByTagName("img").elements

    for (var i = 0, element; element = allImages[i++];) {
        let src = element.src
        if (src.substr(0, 4) == "http") {
            element.src = "https" + src.substr(4)
        }
    }
})();
