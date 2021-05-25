var quantity;
const itemInput = document.querySelector(".item-input");
const addButton = document.querySelector(".add-btn");
const quantityUpButton = document.querySelector(".quantity-increase-btn");
const quantityDownButton = document.querySelector(".quantity-decrease-btn");
const deleteButton = document.querySelector(".delete-btn");
const crossOffButton = document.querySelector(".complete-btn");
const list = document.querySelector(".list");

addButton.addEventListener("click", addItem);
deleteButton.addEventListener("click", deleteItem);
crossOffButton.addEventListener("click", crossOffItem);
quantityUpButton.addEventListener("click", quantityUp);
quantityDownButton.addEventListener("click", quantityDown);

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
}

function deleteItem(e)
{
    const item = e.target;

    // Delete item
    if (item.classList[0] === "delete-btn")
    {
        const liItem = item.parentElement;
        liItem.remove();
    }

    // Cross off
    {
        const liItem = item.parentElement;
        liItem.classList.toggle('crossOff');
    }
}

function crossOffItem(e)
{
    const crossOff = e.item;
}

function quantityUp(e)
{
    const quantityIncrease = e.target;
}

function quantityDown(e)
{
    const quantityDecrease = e.target;
}