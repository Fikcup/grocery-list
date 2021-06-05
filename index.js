// Next steps

/*
    * Fix DOM calls in quantity function
    * Move quantity into addItem to be created with each new item
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

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
    deleteBtn.classList.add("delete-btn");
    itemDiv.appendChild(deleteBtn);

    // Set Default Quantity to One
    var quantity = 1;

    // Quantity display
    const quantityDisplay = document.createElement("p");
    quantityDisplay.innerHTML = quantity;
    quantityDisplay.classList.add("quantity");
    itemDiv.appendChild(quantityDisplay);

    // Add quantity to local storage
    saveQuantityLocally(quantity);

    // Quantity up button
    const quantityIncreaseBtn = document.createElement("button");
    quantityIncreaseBtn.innerHTML = "<i class='fas fa-caret-square-up'></i>";
    quantityIncreaseBtn.classList.add("quantity-increase-btn");
    itemDiv.appendChild(quantityIncreaseBtn);

    // Quantity down button
    const quantityDecreaseBtn = document.createElement("button");
    quantityDecreaseBtn.innerHTML = "<i class='fas fa-caret-square-down'></i>";
    quantityDecreaseBtn.classList.add("quantity-decrease-btn");
    itemDiv.appendChild(quantityDecreaseBtn); 

    // Append to UL
    list.appendChild(itemDiv);

    // Clear input field
    itemInput.value = "";

    // Query Selector for created buttons
    const quantityUpButton = document.querySelector(".quantity-increase-btn");
    const quantityDownButton = document.querySelector(".quantity-decrease-btn");
    const deleteButton = document.querySelector(".delete-btn");
    const crossOffButton = document.querySelector(".complete-btn");

    // Event listeners for new buttons
    deleteButton.addEventListener("click", deleteItem);
    crossOffButton.addEventListener("click", crossOffItem);
    quantityUpButton.addEventListener("click", quantityUp);
    quantityDownButton.addEventListener("click", quantityDown); 
}

function deleteItem(event)
{
    const item = event.target;
    const itemRemoveQuery = document.querySelector('.li-item');
    const itemRemove = itemRemoveQuery.innerHTML;

    if (item.classList[0] === "delete-btn")
    {
        const liItem = item.parentElement; 
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
            var quantityRemove = quantities[i];

            console.log(quantityRemove);
            if (items[i] == itemRemove)
            {
                localStorage.removeItem('items', 'itemRemove');
                localStorage.removeItem('quantities', 'quantityRemove')
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

// NOT FUNCTIONAL
function quantityUp(event)
{
    const quantityIncrease = event.target;

    // Increase quantity of targeted element
    if (quantityIncrease.classList[0] === "quantity-increase-btn")
    {
        const quantityElement = quantityIncrease.previousSibling.innerHTML;
        console.log(quantityElement);
    }
}

// NOT FUNCTIONAL
function quantityDown(event)
{
    const quantityDecrease = event.target;

    // Decrease quantity of targeted element
    if (quantityDecrease.classList[0] === "quantity-decrease-btn")
    {
        const quantityElement = document.querySelector(".quantity");
        quantityElement.quantity--;
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

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
        deleteBtn.classList.add("delete-btn");
        itemDiv.appendChild(deleteBtn);

        // Quantity display
        const quantityDisplay = document.createElement("p");
        quantityDisplay.innerText = quantities;
        quantityDisplay.classList.add("quantity");
        itemDiv.appendChild(quantityDisplay);

        // Quantity up button
        const quantityIncreaseBtn = document.createElement("button");
        quantityIncreaseBtn.innerHTML = "<i class='fas fa-caret-square-up'></i>";
        quantityIncreaseBtn.classList.add("quantity-increase-btn");
        itemDiv.appendChild(quantityIncreaseBtn);

        // Quantity down button
        const quantityDecreaseBtn = document.createElement("button");
        quantityDecreaseBtn.innerHTML = "<i class='fas fa-caret-square-down'></i>";
        quantityDecreaseBtn.classList.add("quantity-decrease-btn");
        itemDiv.appendChild(quantityDecreaseBtn); 

        // Append to UL
        list.appendChild(itemDiv);

         // Query Selector for created buttons
        const quantityUpButton = document.querySelector(".quantity-increase-btn");
        const quantityDownButton = document.querySelector(".quantity-decrease-btn");
        const deleteButton = document.querySelector(".delete-btn");
        const crossOffButton = document.querySelector(".complete-btn");

        // Event listeners for new buttons
        deleteButton.addEventListener("click", deleteItem);
        crossOffButton.addEventListener("click", crossOffItem);
        quantityUpButton.addEventListener("click", quantityUp);
        quantityDownButton.addEventListener("click", quantityDown); 
    });
}