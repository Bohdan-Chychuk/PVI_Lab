// JavaScript
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];



btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  
  }
}

let indexfordelete
//Модальне видалити студента
var modalDelStudent=document.getElementById("myModalDeleteStudent");
var delStudentButtons = document.getElementsByClassName("DelStudent");
for (let i = 0; i < delStudentButtons.length; i++) {
  delStudentButtons[i].onclick = function() {
    // Get the message element
    var message = document.getElementById("MassageDelStud");
   
    // Set the message text
    indexfordelete = (currentPage * 4) + i ;
    var name = students[indexfordelete].firstName + " " + students[indexfordelete].lastName;
    message.innerText = "Ви дійсно хочете видалити користувача " + name + "?";
    modalDelStudent.style.display = "block";
  };
  
}
document.getElementById("DeketeBtn").addEventListener('click', function() {
 
  students.splice(indexfordelete, 1); 
  updateTable();
  modalDelStudent.style.display = "none";
});

document.getElementById("DelCancelBtn").addEventListener('click',function(){
  modalDelStudent.style.display ="none" ;
});



window.onclick = function(event) {
  if (event.target == modalDelStudent) {
    modalDelStudent.style.display = "none";
  
  }
}

var spanDelstud = document.getElementsByClassName("close")[1];
spanDelstud.onclick = function() {
  modalDelStudent.style.display = "none";
}


//
//Редагування данних про студента 
//
var modalEdit = document.getElementById("myModalEdit");
var spanEdit = document.getElementsByClassName("close")[2];
var btnEdit = document.getElementsByClassName("EditStudent");
let indexforEdit
for (let i = 0; i < btnEdit.length; i++) {
  btnEdit[i].onclick = function() {
  indexforEdit= (currentPage * 4) + i ;
  
   
   
    modalEdit.style.display = "block";
  };
}

document.getElementById("SaveBtn").addEventListener('click', function() {

  editStudent();
  
});

window.onclick = function(event) {
  if (event.target == modalEdit) {
    modalEdit.style.display = "none";
  
  }
}

spanEdit.onclick = function() {
  modalEdit.style.display = "none";
}




function editStudent() {
  // Отримання значень форми
  let group = document.getElementById('GroupEdit').value;
  let firstName = document.getElementById('fnameEdit').value;
  let lastName = document.getElementById('lnameEdit').value;
  let gender = document.getElementById('GenderEdit').value;
  let birthday = document.getElementById('birthdayEdit').value;
  
  // Перевірка чи всі поля заповнені
  if (!group || !firstName || !lastName || !gender || !birthday) {
    alert("Не всі поля заповнено");
    return;
  }
  
  // Оновлення даних студента
  students[indexforEdit] = {group, firstName, lastName, gender, birthday};

  // Оновлення таблиці
  updateTable();
  alert("Дані оновлено");
}




// Масив студентів
let students = [];

// Функція додавання студента
function addStudent() {
  // Отримання значень форми
  let group = document.getElementById('Group').value;
  let firstName = document.getElementById('fname').value;
  let lastName = document.getElementById('lname').value;
  let gender = document.getElementById('Gender').value;
  let birthday = document.getElementById('birthday').value;
  // Перевірка чи всі поля заповнені
  if (!group || !firstName || !lastName || !gender || !birthday) {
    alert("Не всі поля заповнено");
    return;
  }
  // Створення нового студента
  let student = {group, firstName, lastName, gender, birthday};

  // Додавання студента до масиву студентів
  students.push(student);

  // Оновлення таблиці
  updateTable();
}

// Поточна сторінка
let currentPage = 0;

// Функція оновлення таблиці
function updateTable() {
  // Отримання таблиці
  let table = document.querySelector('.Table table');

  // Очищення таблиці
  for (let i = 1; i < table.rows.length; i++) {
    let row = table.rows[i];
    row.cells[1].innerText = '';
    row.cells[2].innerText = '';
    row.cells[3].innerText = '';
    row.cells[4].innerText = '';
    row.cells[5].innerText = '';
    row.querySelector('.buttonin' + i + 'row').style.visibility = 'hidden';
  }

  // Додавання студентів до таблиці
  for (let i = 0; i < 4; i++) {
    let index = currentPage * 4 + i;
    if (index < students.length) {
      let row = table.rows[i + 1];
      row.cells[1].innerText = students[index].group;
      row.cells[2].innerText = students[index].firstName +" "+ students[index].lastName ;
      row.cells[3].innerText = students[index].gender;
      row.cells[4].innerText = students[index].birthday;

      // Створення нового елемента div для зеленої крапки
      let dot = document.createElement('div');
      dot.style.backgroundColor = 'green';
      dot.style.borderRadius = '50%';
      dot.style.width = '20px';  // Збільшуємо розмір крапки
      dot.style.height = '20px'; // Збільшуємо розмір крапки
      dot.style.display = 'inline-block';
      dot.style.margin = '0 auto'; // Вирівнюємо крапку по центру

      // Додаємо зелену крапку в 5-й стовпець
      let cell = row.cells[5];
      cell.innerHTML = '';
      cell.style.textAlign = 'center'; // Вирівнюємо контент клітинки по центру
      cell.appendChild(dot);


      row.querySelector('.buttonin' + (i + 1) + 'row').style.visibility = 'visible';
    }
  }
}

// Функція перемикання сторінки
function changePage(event) {
  let button = event.target;
  if (button.innerText === '<') {
    if (currentPage > 0) {
      currentPage--;
    }
  } else if (button.innerText === '>') {
    if (currentPage < Math.ceil(students.length / 4) - 1) {
      currentPage++;
    }
  } else {
    let pageNumber = parseInt(button.innerText);
    if (!isNaN(pageNumber)) {
      currentPage = pageNumber - 1;
    }
  }
  updateTable();
}

// Приєднання події до кнопок навігації
let buttons = document.querySelectorAll('.buttons-change-table-page button');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', changePage);
}

// Приєднання події до кнопки "Створити"
document.getElementById('createBtn').addEventListener('click', function() {
  addStudent();
});

//Анімація дзвіночка 

let bell = document.getElementById('BellSpan');
let newIcon = document.createElement('img');
newIcon.src = "assets/Notification_Bell_SVG_red_Dot.svg"; // Path to your red circle image
newIcon.style.position = "absolute";
newIcon.style.height = "40px";
newIcon.style.width = "40px";
newIcon.style.display = "none"; // Hide it initially
newIcon.style.top="0px";

bell.appendChild(newIcon);

setInterval(function() {
    if (newIcon.style.display === "none") {
        newIcon.style.display = "block"; // Show the new icon
    } else {
        newIcon.style.display = "none"; // Hide the new icon
    }
}, 5000); // Run every 5 seconds
