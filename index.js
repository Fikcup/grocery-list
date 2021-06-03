// Next steps

/*
    * Fix DOM calls in quantity, delete, and cross off functions
    * Move quantity into addItem to be created with each new item
    * Get the removeLocalStorage function to work
*/

var quantity = 0;
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
    saveLocally(itemInput.value);

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
    quantityDisplay.innerHTML = quantity;
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
    var placeHolder = item.previousSibling;
    var itemToRemove = placeHolder.previousSibling;
    var itemRemoveValue = itemToRemove.innerText;

    if (item.classList[0] === "delete-btn")
    {
        const liItem = item.parentElement; 
        liItem.remove();
    }

    // Delete targeted item from local storage
    // NOT FUNCTIONAL
    function removeLocalItems(liItem)
    {
        let items;

        if (localStorage.getItem("items") === null)
        {
            items = [];
        }
        else
        {
            items = JSON.parse(localStorage.getItem("items"));
        }

        for (let i = 0; i < items.length; i++)
        {
            if (items[i] == itemRemoveValue)
            {
                localStorage.removeItem(itemRemoveValue);
            }
            console.log(items[i]);
            console.log(itemRemoveValue);
        }
    }

    removeLocalItems();
}

// NOT FUNCTIONAL
function crossOffItem(event)
{
    const crossOff = event.target;

    // Cross off targeted element
    if (crossOff.classList[0] === "complete-btn")
    {
        const liItem = item.nextSibling;
        console.log(liItem);
        liItem.style.textDecoration = line-through;
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

function saveLocally(item)
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

function onLoad()
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
        quantityDisplay.innerHTML = quantity;
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