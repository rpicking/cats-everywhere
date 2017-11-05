
// receives message from content script requesting cats
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.request === "cats") {
            sendResponse({"cats": JSON.stringify(cats)});
        }
    }
)


// checks if image exists, removing from object at index if not
function imageExists(image_url, index, object) {
    var xhr = new XMLHttpRequest();

    xhr.open('HEAD', image_url, true);
    xhr.onreadystatechange = function () {
        if (xhr.status != 200) {
            object.splice(index, 1);
        }
    };
    xhr.send();
}

// sends request to url calling get_cats with response
function send_request(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = xhr.responseXML;
            process_cats(response);
        }
    };
    xhr.send();
}

// takes cats xml data and puts urls in array for use in popup/content script
function process_cats(response) {
    var urls = [].slice.call(response.getElementsByTagName("url"));
    cats = urls.map(a => a.textContent);
    
    // check that each image exists removing if it doesn't
    cats.forEach(function(element, index, object) {
        imageExists(element, index, object);
    });
}

function init() {
    var api_url = "http://thecatapi.com/api/images/get?format=xml&results_per_page=25";
    send_request(api_url);
}

var cats = [];
init();