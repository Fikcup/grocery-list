// Next steps

/*
    * Have the quantity value change in localStorage on click
*/

const itemInput = document.querySelector(".item-input");
const addButton = document.querySelector(".add-btn");
const list = document.querySelector(".list");
const clearButton = document.querySelector(".clear");

document.addEventListener('DOMContentLoaded', onLoad);
addButton.addEventListener("click", addNewItem);
clearButton.addEventListener("click", clearAll);

function addNewItem() 
{
    addItem(itemInput.value, 1, true);
}

function addItem(title, quantity, saveLocally)
{
    /**
        * @param {string} title The name of the new item
        * @param {number} quantity The quantity of the item
        * @param {boolean} saveLocally Saves the item in localStorage if true
    */
   
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    // Create new LI
    const newItem = document.createElement("li");
    newItem.innerText = title;
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
    quantityInput.value = quantity;
    itemDiv.appendChild(quantityInput);

    // Quantity up button
    const quantityIncreaseBtn = document.createElement("button");
    quantityIncreaseBtn.innerHTML = "<i class='fas fa-caret-square-up'></i>";
    quantityIncreaseBtn.classList.add("quantity-increase-btn");
    itemDiv.appendChild(quantityIncreaseBtn);
    quantityIncreaseBtn.addEventListener("click", quantityUp);

    if (saveLocally)
    {
        // Add item to local storage
        saveItemLocally(itemInput.value);

        // Add quantity to local storage
        saveQuantityLocally(quantityInput.value);
    }

    // Append to UL
    list.appendChild(itemDiv);

    // Clear input field
    itemInput.value = "";
}

function deleteItem()
{
    // Defines the whole data structure and removes it
    const parent = this.parentElement;
    parent.remove();

    // Selects item and saves its innerHTML
    const itemRemoveQuery = parent.querySelector('li');
    const itemRemove = itemRemoveQuery.innerHTML;

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
                localStorage.setItem('items', JSON.stringify(items));
                localStorage.setItem('quantities', JSON.stringify(quantities));

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
    const quantityInput = this.previousElementSibling;
    let quantity = quantityInput.value;
    quantity++;

    // Changes value visually
    quantityInput.value = quantity;

    // Prevents quantity from going below zero
    if (quantity > 1) 
    {
        document
            .querySelector(".quantity-decrease-btn")
            .removeAttribute("disabled");
        document
            .querySelector(".quantity-decrease-btn")
            .classList.remove("disabled");
    }

    // Calling the relevant item
    const parent = this.parentElement;
    const itemQuery = parent.querySelector('li');
    const item = itemQuery.innerHTML;

    // Updating quantity in localStorage
    updateLocalQuantity(item, quantity);
}

function quantityDown()
{
    // Grabs value quantity of the item and adds one
    const quantityInput = this.nextElementSibling;
    let quantity = quantityInput.value;
    quantity--;

    // Changes value visually
    quantityInput.value = quantity;

    // Prevents quantity from going below zero
    if (quantity == 1)
    {
        document
            .querySelector(".quantity-decrease-btn")
            .setAttribute("disabled", "disabled");
    }

    // Calling the relevant item
    const parent = this.parentElement;
    const itemQuery = parent.querySelector('li');
    const item = itemQuery.innerHTML;

    // Updating quantity in localStorage
    updateLocalQuantity(item, quantity);
}

function updateLocalQuantity(item, quantity)
{
    // Pull quantities and items data from local storage and hold data in an array
    let quantities = JSON.parse(localStorage.getItem("quantities"));
    let items = JSON.parse(localStorage.getItem("items"));

    // Iterates through items array
    for (let i = 0; i < items.length; i++)
    {
        // If the item name is equal to the index, take that index of quantity and update it
        if (items[i] == item)
        {
            quantities[i] = quantity;
            localStorage.setItem('quantities', JSON.stringify(quantities));
        }
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

    for (let i = 0; i < items.length; i++) 
    {
        const item = items[i];
        const quantity = quantities[i];
        addItem(item, quantity, false);
    }
}