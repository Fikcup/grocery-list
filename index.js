// Next steps

/*
    * Fix all issues with localStorage
    * Have the quantity value change in localStorage on click
*/

const itemInput = document.querySelector(".item-input");
const addButton = document.querySelector(".add-btn");
const list = document.querySelector(".list");
const clearButton = document.querySelector(".clear");

document.addEventListener('DOMContentLoaded', onLoad);
addButton.addEventListener("click", addItem);
clearButton.addEventListener("click", clearAll);

function addItem(event)
{
    // Prevent form from submitting without a value
    event.preventDefault();

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    // Create new LI
    const newItem = document.createElement("li");
    newItem.innerText = itemInput.value;
    newItem.classList.add("li-item");
    itemDiv.appendChild(newItem);

    // Add item to local storage
    saveItemLocally(itemInput.value);

    // Cross off item
    const crossOffBtn = document.createElement("button");
    crossOffBtn.innerHTML = "<i class='fas fa-check-square'></i>";
    crossOffBtn.classList.add("complete-btn");
    itemDiv.appendChild(crossOffBtn);
    crossOffBtn.addEventListener("click", crossOffItem);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
    deleteBtn.classList.add("delete-btn");
    itemDiv.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", deleteItem);

    // Quantity down button
    const quantityDecreaseBtn = document.createElement("button");
    quantityDecreaseBtn.innerHTML = "<i class='fas fa-caret-square-down'></i>";
    quantityDecreaseBtn.classList.add("quantity-decrease-btn");
    itemDiv.appendChild(quantityDecreaseBtn); 
    quantityDecreaseBtn.addEventListener("click", quantityDown); 

    // Quantity input field
    const quantityInput = document.createElement("input");
    quantityInput.type = "text";
    quantityInput.classList.add('quantity');
    quantityInput.value = "1";
    itemDiv.appendChild(quantityInput);

    // Quantity up button
    const quantityIncreaseBtn = document.createElement("button");
    quantityIncreaseBtn.innerHTML = "<i class='fas fa-caret-square-up'></i>";
    quantityIncreaseBtn.classList.add("quantity-increase-btn");
    itemDiv.appendChild(quantityIncreaseBtn);
    quantityIncreaseBtn.addEventListener("click", quantityUp);

    // Add quantity to local storage
    saveQuantityLocally(quantityInput.value);

    // Append to UL
    list.appendChild(itemDiv);

    // Clear input field
    itemInput.value = "";
}

function deleteItem(event)
{
    const icon = event.target;

    // Selects item and saves its innerHTML
    const itemRemoveQuery = document.querySelector('.li-item');
    const itemRemove = itemRemoveQuery.innerHTML;

    // Calls the entire created li item and removes it and its buttons
    if (icon.classList[0] === "delete-btn")
    {
        const liItem = icon.parentElement; 
        liItem.remove();
    }

    // Delete targeted item from local storage
    function removeLocalItems()
    {
        let items;
        let quantities;

        if (localStorage.getItem("items") === null || localStorage.getItem("quantities") === null)
        {
            items = [];
            quantities = [];
        }
        else
        {
            items = JSON.parse(localStorage.getItem("items"));
            quantities = JSON.parse(localStorage.getItem("quantities"));
        }

        for (let i = 0; i < items.length; i++)
        {           
            if (items[i] == itemRemove)
            {
                items.splice(i, 1);
                quantities.splice(i, 1);
                localStorage.setItem('items', items);
                localStorage.setItem('quantities', quantities);

                if (items == "")
                {
                    localStorage.clear();
                    console.log("Local storage cleared.");
                }
            }
        }
    }

    removeLocalItems();
}

function crossOffItem(event)
{
    const crossOff = event.target;
    const itemCrossOffQuery = document.querySelector('.li-item');

    // Cross off targeted element
    if (crossOff.classList[0] === "complete-btn")
    {
        itemCrossOffQuery.classList.toggle("cross-off");
    }
}

function quantityUp()
{
    // Grabs value quantity of the item and adds one
    var quantity = document.querySelector(".quantity").value;
    quantity++;

    // Changes value visually
    document.querySelector(".quantity").value = quantity;

    // Prevents quantity from going below zero
    if (quantity > 1)
    {
        document.querySelector(".quantity-decrease-btn").removeAttribute("disabled");
        document.querySelector(".quantity-decrease-btn").classList.remove("disabled");
    }
}

function quantityDown()
{
    // Grabs value quantity of the item and subtracts one
    var quantity = document.querySelector(".quantity").value;
    quantity--;

    // Changes value visually
    document.querySelector(".quantity").value = quantity;

    // Prevents quantity from going below zero
    if (quantity == 1)
    {
        document.querySelector(".quantity-decrease-btn").setAttribute("disabled", "disabled");
    }
}

function clearAll()
{
    document.getElementById("listDiv").innerHTML = "";
    localStorage.clear();
}

function saveItemLocally(item)
{
    let items;

    // If there is no local storage, create it. Else, retrieve it.
    if (localStorage.getItem("items") === null)
    {
        items = [];
    }
    else
    {
        items = JSON.parse(localStorage.getItem("items"));
    }

    // Saving items on a local array to save grocery list on refresh
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
}

function saveQuantityLocally(quantity)
{
    let quantities;

    // If there is no local storage, create it. Else, retrieve it.
    if (localStorage.getItem("quantities") === null)
    {
        quantities = [];
    }
    else
    {
        quantities = JSON.parse(localStorage.getItem("quantities"));
    }

    // Saving items on a local array to save grocery list on refresh
    quantities.push(quantity);
    localStorage.setItem("quantities", JSON.stringify(quantities));
}

function onLoad()
{
    let items;
    let quantities;

    // If there is no local storage, create it. Else, retrieve it.
    if (localStorage.getItem("items") === null)
    {
        items = [];
        quantities = [];
    }
    else
    {
        items = JSON.parse(localStorage.getItem("items"));
        quantities = JSON.parse(localStorage.getItem("quantities"));
    }

    // On refresh or web page load grab items in session storage and display
    items.forEach(function(items)
    {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        // Create new LI
        const newItem = document.createElement("li");
        newItem.innerText = items;
        newItem.classList.add("li-item");
        itemDiv.appendChild(newItem);

        // Cross off item
        const crossOffBtn = document.createElement("button");
        crossOffBtn.innerHTML = "<i class='fas fa-check-square'></i>";
        crossOffBtn.classList.add("complete-btn");
        itemDiv.appendChild(crossOffBtn);
        crossOffBtn.addEventListener("click", crossOffItem);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
        deleteBtn.classList.add("delete-btn");
        itemDiv.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", deleteItem);

        // Quantity down button
        const quantityDecreaseBtn = document.createElement("button");
        quantityDecreaseBtn.innerHTML = "<i class='fas fa-caret-square-down'></i>";
        quantityDecreaseBtn.classList.add("quantity-decrease-btn");
        itemDiv.appendChild(quantityDecreaseBtn); 
        quantityDecreaseBtn.addEventListener("click", quantityDown); 

        // Quantity input field
        const quantityInput = document.createElement("input");
        quantityInput.type = "text";
        quantityInput.classList.add('quantity');
        quantityInput.value = quantities;
        itemDiv.appendChild(quantityInput);

        // Quantity up button
        const quantityIncreaseBtn = document.createElement("button");
        quantityIncreaseBtn.innerHTML = "<i class='fas fa-caret-square-up'></i>";
        quantityIncreaseBtn.classList.add("quantity-increase-btn");
        itemDiv.appendChild(quantityIncreaseBtn);
        quantityIncreaseBtn.addEventListener("click", quantityUp);

        // Append to UL
        list.appendChild(itemDiv);
    });
}