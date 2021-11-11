// ==UserScript==
// @name         Search projects on Scratch Profile
// @namespace    https://steve0greatness.github.io/extras/User-Project-Search.html
// @version      1.0
// @description  Search projects from a profile on my user project search
// @author       Steve0Greatness
// @include      https://scratch.mit.edu/users/*/projects/
// @match        https://scratch.mit.edu/users/*/projects/
// @icon         https://scratch.mit.edu/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //creating the new elements
    var input = document.createElement("input")
    var button = document.createElement("button")
    //getting the elemet this will be placed at
    var box = document.getElementsByClassName("box-head")[0]
    //setting the search bar
    input.id = "searchValue"
    input.title = "Search projects on user search projects"
    //setting the search button
    button.onclick = function(){ location = `https://steve0greatness.github.io/extras/User-Project-Search.html?u=${location.pathname.split(/\//)[2]}&q=${document.getElementById('searchValue').value}` }
    button.innerHTML = "Search"
    //appending
    box.appendChild(input)
    box.appendChild(button)
})();