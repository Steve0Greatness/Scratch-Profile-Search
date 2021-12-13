// ==UserScript==
// @name         Search projects on Scratch Profile
// @namespace    https://steve0greatness.github.io/extras/User-Project-Search.html
// @version      1.5
// @description  Search projects from a profile on my user project search
// @author       Steve0Greatness
// @include      https://scratch.mit.edu/users/*/projects/*
// @match        https://scratch.mit.edu/users/*/projects/*
// @icon         https://scratch.mit.edu/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //config
    const settings = {
        stylesheet: true, // for if you're using it with another extension, for example, scratch addons with the dark theme addon on.
        autosortbynew: false, // for if you always want to sort by new
        stylesheetSettings: {
            boxShadow: "inset 0 1px 1px rgba(0 0 0 / 8%)",
            boxShadowMoz: "inset 0 1px 1px rgba(0, 0, 0.075)",
            transition: "border linear .2s,box-shadow linear .2s",
            backgroundColor: "#fff",
            padding: "4px",
            marginBottom: "6px",
            fontSize: "13px",
            lineHeight: "18px",
            color: "#555",
            border: "1px solid #ccc",
            borderRadius: "3px",
            height: "28px",
            fontFamily: "\"Helvetica Neue\",Helvetica,Arial,sans-serif",
            backgroundImage: "none",
            display: "inline-block"
        }
    }

    var loadEmpty = document.createElement("button")
    var style = document.createElement("style")
    style.innerText = `button#search, button#removesearch {
        font-family: ${settings.stylesheetSettings.fontFamily};
    	-webkit-box-shadow: ${settings.stylesheetSettings.boxShadow};
	    -moz-box-shadow: ${settings.stylesheetSettings.boxShadowMoz};
    	box-shadow: ${settings.stylesheetSettings.boxShadow};
	    -webkit-transition: ${settings.stylesheetSettings.transition};
    	-moz-transition: ${settings.stylesheetSettings.transition};
	    -ms-transition: ${settings.stylesheetSettings.transition};
    	-o-transition: ${settings.stylesheetSettings.transition};
	    transition: ${settings.stylesheetSettings.transition};
    	background-color: ${settings.stylesheetSettings.backgroundColor};
	    background-image: ${settings.stylesheetSettings.backgroundImage};
    	display: ${settings.stylesheetSettings.display};
	    padding: ${settings.stylesheetSettings.padding};
    	margin-bottom: ${settings.stylesheetSettings.marginBottom};
	    font-size: ${settings.stylesheetSettings.fontSize};
    	line-height: ${settings.stylesheetSettings.lineHeight};
	    color: ${settings.stylesheetSettings.color};
    	border: ${settings.stylesheetSettings.border};
	    -webkit-border-radius: ${settings.stylesheetSettings.borderRadius};
    	-moz-border-radius: ${settings.stylesheetSettings.borderRadius};
	    border-radius: ${settings.stylesheetSettings.borderRadius};
    	height: ${settings.stylesheetSettings.height};
    }`
    loadEmpty.onclick = () => { location.reload() }
    loadEmpty.innerHTML = "Remove Search"
    loadEmpty.id = "removesearch"
    var user = location.pathname.split(/\//)[2]
    var options = document.createElement("select")
    options.innerHTML = `<option value="newestDefualt">Sort by...</option>
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>`
    options.style.height = "auto"
    var boxHead = document.getElementsByClassName("box-head")[0]
    var boxContent = document.getElementsByClassName("media-grid")[0].getElementsByTagName("ul")[0]
    var input = document.createElement("input")
    input.id = "searchValue"
    input.title = "Search projects on user search projects"
    input.placeholder = "Search projects on this profile"
    var button = document.createElement("button")
    button.onclick = () => {
        if (input.value == ""|undefined|null) {
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
                checkStuff(id, "https://scratch.mit.edu/projects/" + id)
            }
            boxHead.appendChild(loadEmpty)
        })
    }
    button.innerHTML = "Search"
    button.id = "search"
    boxHead.appendChild(input)
    boxHead.appendChild(button)
    if (!settings.autosortbynew) {
        boxHead.appendChild(options)
    }
    function checkStuff(id, link) {
        fetch("https://api.scratch.mit.edu/projects/" + id)
            .then(res => res.json())
            .then(data => {
                let searchQ = input.value
                let notes = data.description
                let instr = data.instructions
                let title = data.title
                let user = data.author.username
                if (title.toUpperCase().includes(searchQ.toUpperCase()) || notes.toUpperCase().includes(searchQ.toUpperCase()) || instr.toUpperCase().includes(searchQ.toUpperCase())) {
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
            }})
    }
    if (settings.stylesheet) {
        document.head.appendChild(style)
    }
})();
