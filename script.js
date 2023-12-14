const itemForm = document.querySelector("#item-form");
const itemList = document.querySelector("#item-list");
const itemInput = document.querySelector("#item-input");
const itemClear = document.querySelector("#clear");

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

  // แทรก li ไปยัง unorder list
  itemList.appendChild(li);

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
    e.target.parentElement.parentElement.remove();
  }
};

const onClearItem = () => {
  // Array.from(itemList.children).forEach((item) => {
  //   item.remove();
  // });

  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
};

// Event Listeners
itemForm.addEventListener("submit", onAddItem);

itemList.addEventListener("click", removeItem);

itemClear.addEventListener("click", onClearItem);
