var quantity;
const itemInput = document.querySelector(".item-input");
const addButton = document.querySelector(".add-btn");
const list = document.querySelector(".list");

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