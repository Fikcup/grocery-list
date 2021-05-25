var quantity;
const itemInput = document.querySelector(".item-input");
const addButton = document.querySelector(".add-btn");
const list = document.querySelector(".list");

addButton.addEventListener("click", addItem);

function addItem(event)
{
    console.log("Hello");
    // Prevent form from submitting without a value
    event.preventDefault();

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    // Create new LI
    const newItem = document.createElement("li");
    newItem.innerText = itemInput;
    newItem.classList.add("item");
    itemDiv.appendChild(newItem);

    // Cross off item
    const crossOffBtn = document.createElement("button");
    crossOffBtn.innerHTML = "<i class='fas fa-check-square'></i>";
    crossOffBtn.classList.add("add-btn");
    itemDiv.appendChild(crossOffBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
    deleteBtn.classList.add();
    itemDiv.appendChild(deleteBtn);

    // Append to UL
    list.appendChild(itemDiv);
}