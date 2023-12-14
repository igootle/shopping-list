const itemForm = document.querySelector("#item-form");
const itemList = document.querySelector("#item-list");
const itemInput = document.querySelector("#item-input");

const onAddItem = (e) => {
  e.preventDefault();

  const itemInputValue = document.createTextNode(itemInput.value);
  const li = document.createElement("li");
  li.appendChild(itemInputValue);

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  itemList.appendChild(li);

  itemInput.value = "";
};

const createButton = (classes) => {
  const btn = document.createElement("button");
  btn.className = classes;
  btn.appendChild(createIcon("fa-solid fa-xmark"));
  return btn;
};

const createIcon = (classes) => {
  const ico = document.createElement("i");
  ico.className = classes;
  return ico;
};

itemForm.addEventListener("submit", onAddItem);
