
window.addEventListener("load", function() {
    createPage();
});

// creates individual cat img and adds to dom
function createCat(cat_url) {
    var cat_element = document.createElement("li");

    var cat = document.createElement("img");
    cat.setAttribute("src", cat_url);
    cat.setAttribute("width", "200px");
    cat.setAttribute("height", "200px");
    cat_element.appendChild(cat);

    document.getElementById("cat-list").appendChild(cat_element);
}

function createPage() {
    cats.forEach(function(elem) {
        createCat(elem);
    });
}


function init() {
    // call background script to get list of img urls
    cats = chrome.extension.getBackgroundPage().cats;
    // build page
    //createPage(cats);
}

var cats;
init();