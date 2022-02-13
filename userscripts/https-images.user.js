// ==UserScript==
// @name         https images
// @namespace    https://github.com/Steve0Greatness/userscripts
// @version      1.0
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

    const allImages = document.getElementsByTagName("img")

    for (var i = 0, element; element = allImages[i++];) {
        let src = element.src
        if (src.substr(0, 7) == "http://") {
            element.dataset.washttp = true
            element.src = "https" + src.substr(4)
        }
    }
})();