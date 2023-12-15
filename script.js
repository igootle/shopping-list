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
};

// Event Listeners
itemForm.addEventListener("submit", onAddItem);

itemList.addEventListener("click", removeItem);

clearBtn.addEventListener("click", onClearItem);

itemFilter.addEventListener("input", onFilter);

checkUI();
