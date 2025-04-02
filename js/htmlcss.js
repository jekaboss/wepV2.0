// DOM элементы
const addBtn = document.getElementById('add-btn');
const addModal = document.getElementById('add-modal');
const closeModal = document.getElementById('close-modal');
const saveBtn = document.getElementById('save-btn');
const codeList = document.getElementById('code-list');
const viewModal = document.getElementById('view-modal');
const closeViewModal = document.getElementById('close-view-modal');
const titleInput = document.getElementById('title');
const htmlInput = document.getElementById('html-code');
const cssInput = document.getElementById('css-code');
const jsInput = document.getElementById('js-code');
const imageUpload = document.getElementById('image-upload');

// Данные
let codeData = JSON.parse(localStorage.getItem('codeData')) || [];

// Функция сохранения данных в localStorage
const saveToLocalStorage = () => {
	localStorage.setItem('codeData', JSON.stringify(codeData));
};

// Открытие модальных окон
addBtn.addEventListener('click', () => addModal.classList.remove('hidden'));
closeModal.addEventListener('click', () => addModal.classList.add('hidden'));
closeViewModal.addEventListener('click', () => viewModal.classList.add('hidden'));

// Сохранение нового элемента
saveBtn.addEventListener('click', () => {
	const title = titleInput.value;
	const html = htmlInput.value;
	const css = cssInput.value;
	const js = jsInput.value;
	const file = imageUpload.files[0];
	const imageUrl = file ? URL.createObjectURL(file) : '';

	if (title && html) {
		codeData.push({ title, html, css, js, imageUrl });
		saveToLocalStorage();
		renderCodeList();
		addModal.classList.add('hidden');
		titleInput.value = '';
		htmlInput.value = '';
		cssInput.value = '';
		jsInput.value = '';
		imageUpload.value = '';
	}
});

// Удаление элемента
const deleteCode = (index) => {
	codeData.splice(index, 1);
	saveToLocalStorage();
	renderCodeList();
};

// Отображение списка
const renderCodeList = () => {
	codeList.innerHTML = '';
	codeData.forEach((item, index) => {
		const codeItem = document.createElement('div');
		codeItem.classList.add('code-item');
		codeItem.innerHTML = `
		        
            <div class="placeholder ${item.imageUrl ? '' : 'default-placeholder'}" data-index="${index}">
                ${item.imageUrl
				? `<img src="${item.imageUrl}" alt="Image">`
				: `<span></span>`
			}
            </div>
            <div class="del">
                <h4>${item.title}</h4>
                <button class="delete-btn" data-index="${index}">Удалить</button>
            </div>
        `;
		codeList.appendChild(codeItem);
	});

	// Кнопки удаления
	document.querySelectorAll('.delete-btn').forEach(btn => {
		btn.addEventListener('click', (e) => {
			const index = e.target.dataset.index;
			deleteCode(index);
		});
	});

	// Клики по заглушкам/изображениям
	document.querySelectorAll('.placeholder').forEach(placeholder => {
		placeholder.addEventListener('click', (e) => {
			const index = e.target.closest('.placeholder').dataset.index;
			viewCode(index);
		});
	});
};


// Просмотр элемента с подсветкой кода
const viewCode = (index) => {
	const { html, css, js } = codeData[index];

	// Вставляем код в соответствующие блоки
	document.getElementById('view-html').textContent = html;
	document.getElementById('view-css').textContent = css;
	document.getElementById('view-js').textContent = js;

	// Активируем подсветку синтаксиса
	Prism.highlightAll();

	viewModal.classList.remove('hidden');
};

// Функция копирования текста в буфер обмена
const copyToClipboard = (text) => {
	navigator.clipboard.writeText(text).then(() => {
		alert('Текст скопирован в буфер обмена');
	}).catch(err => {
		console.error('Ошибка копирования: ', err);
	});
};

// Обработчики событий для кнопок копирования
document.getElementById('copy-html-btn').addEventListener('click', () => {
	const htmlCode = document.getElementById('view-html').textContent;
	copyToClipboard(htmlCode);
});

document.getElementById('copy-css-btn').addEventListener('click', () => {
	const cssCode = document.getElementById('view-css').textContent;
	copyToClipboard(cssCode);
});

document.getElementById('copy-js-btn').addEventListener('click', () => {
	const jsCode = document.getElementById('view-js').textContent;
	copyToClipboard(jsCode);
});


// Инициализация
renderCodeList();


// <button class="delete-btn" data-index="${index}">Удалить</button>