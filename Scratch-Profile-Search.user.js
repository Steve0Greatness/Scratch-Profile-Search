// ==UserScript==
// @name         Search projects on Scratch Profile
// @namespace    https://steve0greatness.github.io/extras/User-Project-Search.html
// @version      1.0
// @description  Search projects from a profile on my user project search
// @author       Steve0Greatness
// @include      https://scratch.mit.edu/users/*/projects/*
// @match        https://scratch.mit.edu/users/*/projects/*
// @icon         https://scratch.mit.edu/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var loadEmpty = document.createElement("button")
    loadEmpty.onclick = () => { location.reload() }
    loadEmpty.innerHTML = "Remove Search"
    var user = location.pathname.split(/\//)[2]
    var options = document.createElement("select")
    options.innerHTML = `<option value="newestDefualt">Sort by...</option>
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>`
    options.style.height = "auto"
    var boxHead = document.getElementsByClassName("box-head")[0]
    var boxContent = document.getElementsByClassName("media-grid")[0].getElementsByTagName("ul")[0]
    var input = document.createElement("input")
    var form = document.createElement("form")
    form.style.display = "inline-block"
    form.onsubmit = () => { button.click() }
    input.id = "searchValue"
    input.title = "Search projects on user search projects"
    input.placeholder = "Search projects on this profile"
    form.appendChild(input)
    var button = document.createElement("button")
    button.onclick = () => {
        if (document.getElementById("searchValue").value == ""|undefined|null) {
            location.reload()
        }
        if (options.value == "newestDefualt") { options.value = "newest" }
        boxContent.innerHTML = ""
        fetch("https://scratchdb.lefty.one/v2/project/info/user/" + user)
            .then(res => res.json())
            .then(data => {
                 var projects = data.projects
                 for (let i = 0; i < projects.length; i++) {
                     let currentProject = projects[i]
                     let title = currentProject.info.title
                     let id = currentProject.info.scratch_id
                     if (title.toUpperCase().includes(input.value.toUpperCase())) {
                         let thumb = `//cdn2.scratch.mit.edu/get_image/project/${id}_144x108.png`
                         let link = `/projects/${id}`
                         let li = document.createElement("li")
                         let before = document.createElement("li")
                         li.className = "project thumb item"
                         li.innerHTML = `<a href="${link}"><img class="lazy image" data-original="${thumb}" src="${thumb}" width="144" height="108" style="display: block;"></a>
                         <span class="title"><a href="${link}">${title}</a></span>
                         <span class="owner">by <a href="/users/${user}">${user}</a></span>`
                         before.innerHTML = "<!-- templates/carousel/project-thumb.html -->"
                         if (options.value == "newest"|"newestDefualt") {
                             boxContent.insertBefore(li, boxContent.firstChild)
                             boxContent.insertBefore(before, boxContent.firstChild)
                         } else if (options.value == "oldest") {
                             boxContent.appendChild(before)
                             boxContent.appendChild(li)
                         }
                     }
                 }
                 boxHead.appendChild(loadEmpty)
             })
    }
    button.innerHTML = "Search"
    boxHead.appendChild(form)
    boxHead.appendChild(button)
    boxHead.appendChild(options)
})();
