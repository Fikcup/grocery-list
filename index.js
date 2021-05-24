document.getElementById("add").onclick = function addItems()
{
    // Add item on click
    // Fill in item name typed in text field
    var node = document.createElement("li");
    var itemVal = document.getElementById("item").value;
    var itemNode = document.createTextNode(itemVal);

    console.log(itemVal);
    console.log(itemNode);

    node.appendChild(itemNode);
    document.getElementById("list").appendChild(node);
}