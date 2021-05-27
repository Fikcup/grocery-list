var quantity = 1;
const itemInput = document.querySelector(".item-input");
const addButton = document.querySelector(".add-btn");
const list = document.querySelector(".list");

document.addEventListener('DOMContentLoaded', onLoad);
addButton.addEventListener("click", addItem);

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

    // Delete targeted item
    if (item.classList[0] === "delete-btn")
    {
        const liItem = item.parentElement;
        liItem.remove();
        localStorage.removeItem("liItem");
    }
    // Delete in local storage as well
}

function crossOffItem(event)
{
    const crossOff = event.target;

    // Cross off targeted element
    if (crossOff.classList[0] === "complete-btn")
    {
        const liItem = item.parentElement;
        liItem.style.textDecoration = line-through;
    }
}

function quantityUp(event)
{
    const quantityIncrease = event.target;

    // Increase quantity of targeted element
    if (quantityIncrease.classList[0] === "quantity-increase-btn")
    {
        const liItem = item.parentElement;
        liItem.quantity++;
    }
}

function quantityDown(event)
{
    const quantityDecrease = event.target;

    // Decrease quantity of targeted element
    if (quantityDecrease.classList[0] === "quantity-decrease-btn")
    {
        const liItem = item.parentElement;
        liItem.quantity--;
    }
}

function saveLocally(item)
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
    // Saving items on a local array to save grocery list on refresh
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    // Need to add visual saving functionality
}

function onLoad()
{
    console.log("Hello");
    let items;

    if (localStorage.getItem("items") === null)
    {
        items = [];
    }
    else
    {
        items = JSON.parse(localStorage.getItem("items"));
    }

    items.forEach(function(items)
    {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        // Create new LI
        const newItem = document.createElement("li");
        newItem.innerText = items.value;
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
    });
}