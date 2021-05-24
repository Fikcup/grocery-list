document.getElementById("add").onclick = function addItems()
{
    var node = document.createElement("li");
    var itemVal = document.getElementById("item").value;
    var itemNode = document.createTextNode(itemVal);

    console.log(itemVal);
    console.log(itemNode);

    node.appendChild(itemNode);
    document.getElementById("list").appendChild(node);
}

document.getElementById("clear").onclick = function clearList()
{
    document.getElementById("list").innerHTML = "";
}

function deleteItem()
{
    // On click delete associated item
}