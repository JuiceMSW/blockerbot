function block() {
    var url;
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        url = arrayOfTabs[0].url;
    });

    

    redirect();
}

function redirect() {
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("block").addEventListener("click", block);
})