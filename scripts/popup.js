function block() {
    var url;
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        url = new URL(arrayOfTabs[0].url);
        url = url.href.replace(/\/+$/, "");

        console.log(url);
        chrome.storage.sync.get({
            blockList:[]
        }, function(data) {
            console.log(data.blockList);
            update(data.blockList, url);
        });
    });

    redirect();
}

function update(list, url) {
    list.push(url);
    chrome.storage.sync.set({
        blockList:list
    }, function() {
        console.log("Added '" + url + "' to block list");
    });
}

function redirect() {
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
    });
}

function manage() {
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        var code = 'window.open(chrome.extension.getURL("manage.html"), \'_blank\');';
        chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("block").addEventListener("click", block);
    document.getElementById("manage").addEventListener("click", manage);
});