var quantity;

document.getElementById("add").onclick = function addItems()
{
    var node = document.createElement("li");
    var itemVal = document.getElementById("item").value;
    var itemNode = document.createTextNode(itemVal);

    console.log(itemVal);
    console.log(itemNode);

    node.appendChild(itemNode);
    document.getElementById("list").appendChild(node);

    addQuantity();
}

document.getElementById("clear").onclick = function clearList()
{
    document.getElementById("list").innerHTML = "";
}

function addQuantity()
{
    quantity = document.createTextNode("1");

    document.getElementById("list").appendChild(quantity);
}

document.getElementById("quantity").onclick = function addMoreOnClick()
{
    quantity.value += 1;
    document.getElementById("list").appendChild(quantity);
}