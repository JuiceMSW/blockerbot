document.addEventListener("DOMContentLoaded", function() {
    var docList = document.getElementById('demo');
    var lastid = 0;
    chrome.storage.sync.get({
        blockList:[]
    }, function(data) {
        console.log(data.blockList);

        var globalList = data.blockList;
        setInitialList()

        document.getElementById("newUrlButton").addEventListener("click", changeText2);

        function setInitialList(){
            for (var i = 0; i < globalList.length; i++) {
                append(globalList[i]);
            }
        }

        function changeText2() {
            var newUrl = document.getElementById('newUrl').value;
            append(newUrl, 0)
            globalList.push(newUrl)
            updateGlobalList()
        }

        function append(url, index){
        
            var entry = document.createElement('li');
            entry.appendChild(document.createTextNode(url));
            entry.setAttribute('id', 'item' + lastid);
            var removeButton = document.createElement('button');
            removeButton.appendChild(document.createTextNode("remove"));
            removeButton.addEventListener("click", function() {
                var arg = entry.getAttribute('id');
                console.log(arg);
                removeName(arg);
            });
            // removeButton.setAttribute('onClick', 'removeName("' + 'item' + lastid + '")');
            entry.appendChild(removeButton);
            docList.appendChild(entry);
            lastid += 1;
        }

        function updateGlobalList(globalList){
            chrome.storage.sync.set({
                blockList:globalList
            }, function() {
                console.log("Modified blocked urls");
            });
        }

        function removeName(itemid) {
            console.log(docList);
            var item = document.getElementById(itemid);
            console.log(item);
            docList.removeChild(item);
            var globalItem = item.textContent;
            if (globalItem.endsWith("remove")) {
                globalItem = globalItem.slice(0, -6);
            }
            globalList = globalList.filter(item => item !== globalItem);
            console.log(globalList);
            updateGlobalList(globalList);
        }
    });
});