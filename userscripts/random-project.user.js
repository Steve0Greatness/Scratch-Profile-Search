// ==UserScript==
// @name         Random Project
// @namespace    https://the2000isawesome.github.io/content/randomProject.html
// @version      1.0
// @description  Adds a link under "community" in the footer, credit to @the2000 for making the original js bookmarklet.
// @author       Steve0Greatness
// @match        https://scratch.mit.edu/*
// @include      https://scratch.mit.edu
// @include      https://scratch.mit.edu/community_guidelines/
// @icon         https://www.google.com/s2/favicons?domain=scratch.mit.edu
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    const s2Pages = [
        "discuss",
        "users",
        "statistics",
        "mystuff",
        "accounts"
    ]
    const path = window.location.pathname
    var parent = document.getElementById("footer").getElementsByTagName("dl")[1]
    var footerElement = document.createElement("dd")
    s2Pages.forEach(page => {
        if (path.includes(page)) {
            parent = document.querySelector(".footer-col").getElementsByTagName("ul")[1]
            footerElement = document.createElement("li")
        }
    })
    // thanks to @The2000 on Scratch.
    const code = `javascript:(function()%7Bvar%20min%20%3D%2011%3Bvar%20max%20%3D%200%3Bfunction%20randProj()%20%7Breturn%20Math.floor(Math.random()%20*%20(max%20-%20min)%20%2B%20min)%3B%7Dfunction%20fetchProject(num)%20%7Bfetch('https%3A%2F%2Fapi.scratch.mit.edu%2Fprojects%2F'%20%2B%20num).then(res%20%3D%3E%20res.json()).then((out)%20%3D%3E%20%7Bif%20(out.code)%20%7BfetchProject(randProj())%3B%7D%20else%20%7Bwindow.location.href%20%3D%20'https%3A%2F%2Fscratch.mit.edu%2Fprojects%2F'%20%2B%20num%3B%7D%7D).catch(err%20%3D%3E%20console.error(err))%3B%7Dfetch('https%3A%2F%2Fapi.scratch.mit.edu%2Fproxy%2Ffeatured').then(res%20%3D%3E%20res.json()).then((out)%20%3D%3E%20%7Bfor%20(let%20i%20%3D%200%3B%20i%20%3C%2020%3B%20i%2B%2B)%20%7Bmax%20%3D%20Math.max(max%2C%20out.community_newest_projects%5Bi%5D.id)%3B%7DfetchProject(randProj())%3B%7D).catch(err%20%3D%3E%20console.error(err))%7D)()`
    const link = `<a href="${code}">Random Project</a>`
    footerElement.innerHTML = link
    parent.appendChild(footerElement)
})();