const itemForm = document.querySelector("#item-form");
const itemList = document.querySelector("#item-list");
const itemInput = document.querySelector("#item-input");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector(".filter");

// function  Add Items List
const onAddItem = (e) => {
  e.preventDefault();

  // check ค่าว่าง itemInput
  if (itemInput.value === "") {
    alert("กรุณากรอกข้อมูล");
    return;
  }

  // แปลง itemInput.value เป็น TextNode แล้วเก็บไว้ที่ itemInputValue
  const itemInputValue = document.createTextNode(itemInput.value);

  // create element li แล้ว append child Input value
  const li = document.createElement("li");
  li.appendChild(itemInputValue);

  // สร้าง button ผ่าน function
  const button = createButton("remove-item btn-link text-red");

  // แทรกตัว button ไว้ที่ li
  li.appendChild(button);

  // แทรก li ไปยัง unorder list(DOM)
  itemList.appendChild(li);

  checkUI();

  // clear ค่า input เป็น ค่าว่าง
  itemInput.value = "";
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

// function remove item
const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
};

const onClearItem = () => {
  // Array.from(itemList.children).forEach((item) => {
  //   item.remove();
  // });

  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
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
};

// Event Listeners
itemForm.addEventListener("submit", onAddItem);

itemList.addEventListener("click", removeItem);

clearBtn.addEventListener("click", onClearItem);
checkUI();
