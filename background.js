// Diplays the popup window on all websites when the extension is clicked

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return {
        redirectUrl : chrome.extension.getURL("default.html")
    };
    }, {
    urls : ["*://*.facebook.com/"]
    }, ["blocking"]);



    
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {urlMatches: 'http[s]://*'},
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});