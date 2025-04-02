// Вибір елементів
let modal = document.getElementById("myModal");
let btn = document.getElementById("openModal");
let span = document.getElementsByClassName("close")[0];
let isEditing = false; // Флаг редагування
let editingIndex = null; // Індекс елемента, що редагується

// Відкриття модального вікна
btn.onclick = function () {
	document.getElementById("title").value = "";
	document.getElementById("code").value = "";
	isEditing = false; // Скидаємо редагування
	editingIndex = null;
	modal.style.display = "block";
};

// Закриття модального вікна
span.onclick = function () {
	modal.style.display = "none";
};

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

// Збереження нового або редагованого коду
document.getElementById("saveCode").onclick = function () {
	let title = document.getElementById("title").value;
	let code = document.getElementById("code").value;

	if (!title || !code) {
		alert("Введіть назву та код!");
		return;
	}

	let savedCodes = JSON.parse(localStorage.getItem("savedCodes")) || [];

	if (isEditing) {
		savedCodes[editingIndex] = { title, code }; // Оновлення запису
	} else {
		savedCodes.push({ title, code }); // Додавання нового запису
	}

	localStorage.setItem("savedCodes", JSON.stringify(savedCodes));
	displaySavedCodes();
	modal.style.display = "none";
};

// Відображення збережених кодів
function displaySavedCodes() {
	let savedCodes = JSON.parse(localStorage.getItem("savedCodes")) || [];
	let savedCodeDiv = document.getElementById("savedCode");
	savedCodeDiv.innerHTML = '';

	savedCodes.forEach((item, index) => {
		let div = document.createElement('div');
		div.classList.add('saved-item');

		div.innerHTML = `
            <h3>${item.title}</h3>
            <pre><code class="language-javascript">${item.code}</code></pre>
            <button class="copyBtn" data-code="${item.code}">Скопіювати код</button>
            <button class="editBtn" data-index="${index}">Редагувати</button>
            <button class="deleteBtn" data-index="${index}">Видалити</button>
        `;

		savedCodeDiv.appendChild(div);
	});

	// Копіювання
	document.querySelectorAll('.copyBtn').forEach(button => {
		button.addEventListener('click', (e) => {
			let code = e.target.getAttribute('data-code');
			navigator.clipboard.writeText(code)
				.then(() => alert("Код скопійовано!"))
				.catch(err => alert("Не вдалося скопіювати код."));
		});
	});

	// Редагування
	document.querySelectorAll('.editBtn').forEach(button => {
		button.addEventListener('click', (e) => {
			let index = e.target.getAttribute('data-index');
			let savedCodes = JSON.parse(localStorage.getItem("savedCodes"));
			let item = savedCodes[index];

			document.getElementById("title").value = item.title;
			document.getElementById("code").value = item.code;
			isEditing = true;
			editingIndex = index;
			modal.style.display = "block";
		});
	});

	// Видалення
	document.querySelectorAll('.deleteBtn').forEach(button => {
		button.addEventListener('click', (e) => {
			let index = e.target.getAttribute('data-index');
			let savedCodes = JSON.parse(localStorage.getItem("savedCodes"));
			savedCodes.splice(index, 1);
			localStorage.setItem("savedCodes", JSON.stringify(savedCodes));
			displaySavedCodes();
		});
	});

	Prism.highlightAll();
}

// Завантаження збережених кодів при старті
window.onload = function () {
	displaySavedCodes(); // Відображаємо збережені коди
	modal.style.display = "none"; // Гарантуємо, що модальне вікно закрите
};

