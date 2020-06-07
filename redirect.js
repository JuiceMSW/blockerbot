// Injected script that runs on the page

chrome.storage.sync.get({
    blockList:[]
}, function(data) {
    console.log(data.blockList);
    list = data.blockList;
    var url = window.location.href;
    if (list.includes(url)) {
        window.location.replace(chrome.extension.getURL("default.html"));
    }
});