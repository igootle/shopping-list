const itemForm = document.querySelector("#item-form");
const itemList = document.querySelector("#item-list");
const itemInput = document.querySelector("#item-input");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector(".filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
};

// function  Add Items List
const onAddItemSubmit = (e) => {
  e.preventDefault();
  // แปลง itemInput.value เป็น TextNode แล้วเก็บไว้ที่ itemInputValue
  const itemInputValue = itemInput.value;
  // check ค่าว่าง itemInput
  if (itemInput.value === "") {
    alert("กรุณากรอกข้อมูล");
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(itemInputValue)) {
      alert("That item already exists!");
      return;
    }
  }

  // create Item DOM Element
  addItemToDOM(itemInputValue);

  // Add item to localStorage
  addItemToStorage(itemInputValue);

  // displayItems();
  checkUI();

  // clear ค่า input เป็น ค่าว่าง
  itemInput.value = "";
};

const addItemToDOM = (item) => {
  console.log(item);
  // create element li แล้ว append child Input value
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  // สร้าง button ผ่าน function
  const button = createButton("remove-item btn-link text-red");

  // แทรกตัว button ไว้ที่ li
  li.appendChild(button);

  // แทรก li ไปยัง unorder list(DOM)
  itemList.appendChild(li);
};

// function Create Button
const createButton = (classes) => {
  // create element button
  const btn = document.createElement("button");
  // กำหนด class ที่ ได้รับค่ามา
  btn.className = classes;
  // แทรก icon โดยเรียกใช้ function
  btn.appendChild(createIcon("fa-solid fa-xmark"));
  return btn;
};

// function create Icon
const createIcon = (classes) => {
  // create element i
  const ico = document.createElement("i");
  // กำหนด class ที่ ได้รับค่ามา
  ico.className = classes;
  return ico;
};

const addItemToStorage = (item) => {
  // สร้างตัวแปร
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to javascript object to JSON for set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
  // สร้างตัวแปร
  let itemsFromStorage;
  // check ข้อมูลใน localStorage ว่าที่ key items เป็นค่า null หรือไม่
  if (localStorage.getItem("items") === null) {
    // ให้ตัวแปร itemsFromStorage มีค่าเป็น array แบบว่าง
    // itemsFromStorage = new Array();
    itemsFromStorage = [];
  } else {
    // ให้ตัวแปร itemsFromStorage เก็บค่า ของ localStorage ที่มี key items แล้วแปลงข้อมูลจาก localStorage ที่เป็นแบบ json ให้เป็น javascript object
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

const checkIfItemExists = (item) => {
  const itemsFromStorage = getItemsFromStorage();

  return itemsFromStorage.includes(item);
};

const setItemToEdit = (item) => {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#228822";
  itemInput.value = item.textContent;
};

// function remove item

const removeItem = (item) => {
  if (confirm("Are you sure?")) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed

  itemsFromStorage = itemsFromStorage.filter((i) => {
    return i !== item;
  });

  console.log(itemsFromStorage);

  // Re-set to localstorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const onClearItem = () => {
  // Array.from(itemList.children).forEach((item) => {
  //   item.remove();
  // });

  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear form localStorage
  localStorage.removeItem("items");
  checkUI();
};
const onFilter = (e) => {
  // select li ทั้งหมดเป็น array เก็บไว้ที่ items
  const items = document.querySelectorAll("li");

  // เก็บค่าเมื่อเราพิมพ์ที่ filter แปลงเป็นตัวเล็กเก็บไว้ที่ ตัวแปร text
  const text = e.target.value.toLowerCase();

  // แสดงข้อมูล items ทั้งหมดผ่าน forEach
  items.forEach((item) => {
    const itemName = item.textContent.toLowerCase();

    if (itemName.indexOf(text) === -1) {
      item.style.display = "none";
    } else {
      item.style.display = "";
    }
  });
  // เลือกข้อมูลที่เป็น text ที่อยู่ใน Element li แปลงเป็น lowercase เก็บค่าไว้ที่ตัวแปร itemName

  // เช็คค่าว่า itemName มีส่วนที่ตรงกัน กับ สิ่งที่พิมพ์ในช่อง filter ไหม โดยใช้ indexOf ถ้าไม่ใช่จะ return ค่าเป็น -1

  // ไม่ต้องแสดงอะไร

  // แสดง display เป็น none
};

const checkUI = () => {
  const items = document.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
  formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item";
  formBtn.style.backgroundColor = "#333";
  isEditMode = false;
};

// Initialize app
const init = () => {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);

  itemList.addEventListener("click", onClickItem);

  clearBtn.addEventListener("click", onClearItem);

  itemFilter.addEventListener("input", onFilter);

  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
};
init();
