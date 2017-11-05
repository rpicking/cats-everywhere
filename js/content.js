
document.addEventListener("scroll", replaceImages);

window.addEventListener("load", function () {
    getCats().then(function() {
        replaceImages();
    });
});

// gets cat image urls from background script
function getCats() {
    return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({"request": "cats"}, function(response) {
            cats = JSON.parse(response.cats);
            resolve(true);
        });
    });
}

function replaceImages() {
    var images = document.getElementsByTagName("img");
    var index = 0;
    Array.from(images).forEach(function(element) {
        if (index >= cats.length) index = 0;
        
        if (!element.hasAttribute("cat")) {
            element.setAttribute("src", cats[index]);
            element.setAttribute("cat", "kitty");
            ++index;
        }
    });
}

var cats;
