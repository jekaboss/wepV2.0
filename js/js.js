const addButton = document.getElementById('addButton');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('closeButton');
const saveButton = document.getElementById('saveButton');
const titleInput = document.getElementById('titleInput');
const codeInput = document.getElementById('codeInput');
const cardsContainer = document.getElementById('cardsContainer');

let items = JSON.parse(localStorage.getItem('items')) || [];

function renderItems() {
	cardsContainer.innerHTML = '';
	items.forEach((item, index) => {
		const card = document.createElement('div');
		card.className = 'card';
		card.innerHTML = `
                    <img src="https://img.icons8.com/?size=100&id=3R589JIXPtZh&format=png&color=000000" alt="Placeholder" class="card-img">
                    <div class="content">
                        <h4>${item.title}</h4>
                        <pre><code class="language-javascript">${item.code}</code></pre>
                    </div>
                    <button class="copy-btn" data-index="${index}">Скопировать</button>
                    <button class="delete-btn" data-index="${index}">Удалить</button>
                `;
		cardsContainer.appendChild(card);
	});

	Prism.highlightAll(); // Применяем подсветку синтаксиса
}

// Открытие модального окна для добавления нового элемента
addButton.addEventListener('click', function () {
	modal.style.display = 'flex'; // Показываем модальное окно
	titleInput.value = ''; // Очищаем поля ввода
	codeInput.value = ''; // Очищаем поле для кода
	modal.style.pointerEvents = 'auto'; // Разрешаем клики по модальному окну
});

// Закрытие модального окна
closeButton.addEventListener('click', function () {
	modal.style.display = 'none'; // Закрываем модальное окно
	modal.style.pointerEvents = 'none'; // Запрещаем клики по фону
});

// Сохранение нового элемента в localStorage
saveButton.addEventListener('click', function () {
	const title = titleInput.value;
	const code = codeInput.value;

	if (title && code) {
		items.push({ title, code });
		localStorage.setItem('items', JSON.stringify(items));
		renderItems();
		modal.style.display = 'none'; // Закрыть модальное окно
	} else {
		alert('Заполните все поля!');
	}
});

// Удаление элемента из localStorage
function deleteItem(index) {
	items.splice(index, 1);
	localStorage.setItem('items', JSON.stringify(items));
	renderItems();
}

// Копирование кода в буфер обмена
function copyToClipboard(index) {
	const code = items[index].code;
	navigator.clipboard.writeText(code).then(() => {
		alert('Код скопирован!');
	});
}

// Открытие модального окна для редактирования существующего элемента (клик по изображению)
cardsContainer.addEventListener('click', (event) => {
	const target = event.target;
	const index = target.getAttribute('data-index');

	if (target.classList.contains('delete-btn')) {
		deleteItem(index);
	} else if (target.classList.contains('copy-btn')) {
		copyToClipboard(index);
	} else if (target.classList.contains('card-img')) {
		// Открыть модальное окно с существующим заголовком и кодом
		const item = items[index];
		titleInput.value = item.title;
		codeInput.value = item.code;
		modal.style.display = 'flex'; // Показываем модальное окно
		modal.style.pointerEvents = 'auto'; // Разрешаем клики по модальному окну
	}
});

// Изначальная отрисовка элементов
renderItems();