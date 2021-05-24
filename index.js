function addItems()
{
    document.getElementById("list").onclick = function ()
    {
        // Add item on click
        // Fill in item name typed in text field
        var item = document.getElementById("item");

        var li = "<li>" + item + "</li>";

        document.getElementById("list").appendChild(li);
    }

}