// Одержуємо елементи
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const saveBtn = document.getElementById('saveBtn');
const updateBtn = document.getElementById('updateBtn');
const nameInput = document.getElementById('nameInput');
const codeInput = document.getElementById('codeInput');
const codesContainer = document.getElementById('codesContainer');

let editingIndex = null; // Змінна для збереження індексу елемента, який редагується

// Відкриття модального вікна
openModalBtn.onclick = function () {
	modal.style.display = 'block';
	resetModal();
}

// Закриття модального вікна
closeModalBtn.onclick = function () {
	modal.style.display = 'none';
	resetModal();
}

// Закриття модального вікна, якщо користувач клікне поза вікном
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
		resetModal();
	}
}

// Збереження введеного коду
saveBtn.onclick = function () {
	const name = nameInput.value;
	const code = codeInput.value;

	if (name && code) {
		const codeItem = {
			name: name,
			code: code
		};

		let savedCodes = JSON.parse(localStorage.getItem('codes')) || [];
		savedCodes.push(codeItem);
		localStorage.setItem('codes', JSON.stringify(savedCodes));

		displayCodes();
		modal.style.display = 'none';
		resetModal();
	}
}

// Оновлення існуючого коду
updateBtn.onclick = function () {
	const name = nameInput.value;
	const code = codeInput.value;

	if (name && code && editingIndex !== null) {
		let savedCodes = JSON.parse(localStorage.getItem('codes')) || [];
		savedCodes[editingIndex] = { name, code };
		localStorage.setItem('codes', JSON.stringify(savedCodes));

		displayCodes();
		modal.style.display = 'none';
		resetModal();
	}
}

// Функція для відображення збережених кодів
function displayCodes() {
	codesContainer.innerHTML = '';
	let savedCodes = JSON.parse(localStorage.getItem('codes')) || [];

	savedCodes.forEach((item, index) => {
		const codeDiv = document.createElement('div');
		codeDiv.classList.add('code-item');
		codeDiv.innerHTML = `
            <h3>${item.name}</h3>
            <pre><code class="language-javascript">${item.code}</code></pre>
            <div class="ton">
						  <button class="view-php-btn" data-index="${index}">Скопіювати код</button>
						  <button class="edit-btn" data-index="${index}">Редагувати</button>
              <button class="delete-btn" data-index="${index}">Видалити</button>
						</div>
            
        `;
		codesContainer.appendChild(codeDiv);

		// Підсвітка коду після додавання в контейнер
		Prism.highlightAll();
	});

	// Додаємо події для кнопок
	document.querySelectorAll('.copy-code-btn').forEach(button => {
		button.onclick = function () {
			const index = this.getAttribute('data-index');
			const savedCodes = JSON.parse(localStorage.getItem('codes')) || [];
			const codeToCopy = savedCodes[index].code;
			navigator.clipboard.writeText(codeToCopy);
		};
	});

	document.querySelectorAll('.view-php-btn').forEach(button => {
		button.onclick = function () {
			const index = this.getAttribute('data-index');
			const savedCodes = JSON.parse(localStorage.getItem('codes')) || [];
			alert(`Відкрити PHP для коду: ${savedCodes[index].name}`);
		};
	});

	// Додаємо події для кнопки "Видалити"
	document.querySelectorAll('.delete-btn').forEach(button => {
		button.onclick = function () {
			const index = this.getAttribute('data-index');
			let savedCodes = JSON.parse(localStorage.getItem('codes')) || [];
			savedCodes.splice(index, 1); // Видаляємо елемент
			localStorage.setItem('codes', JSON.stringify(savedCodes));
			displayCodes(); // Оновлюємо список
		};
	});

	// Додаємо події для кнопки "Редагувати"
	document.querySelectorAll('.edit-btn').forEach(button => {
		button.onclick = function () {
			const index = this.getAttribute('data-index');
			let savedCodes = JSON.parse(localStorage.getItem('codes')) || [];
			const codeToEdit = savedCodes[index];

			nameInput.value = codeToEdit.name;
			codeInput.value = codeToEdit.code;
			editingIndex = index;

			modal.style.display = 'block';
			saveBtn.style.display = 'none';
			updateBtn.style.display = 'inline-block';
		};
	});
}

// Скидання модального вікна
function resetModal() {
	nameInput.value = '';
	codeInput.value = '';
	editingIndex = null;
	saveBtn.style.display = 'inline-block';
	updateBtn.style.display = 'none';
}

// Відображаємо збережені коди при завантаженні сторінки
window.onload = function () {
	displayCodes();
};
