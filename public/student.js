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

