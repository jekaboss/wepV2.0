document.addEventListener('DOMContentLoaded', function () {
	const searchInput = document.getElementById('searchInput');
	const searchButton = document.getElementById('searchButton');
	const searchResults = document.getElementById('searchResults');


	// Список всіх елементів, які потрібно шукати
	const pages = [
		{ title: 'HTML', url: 'header/html.html' },
		{ title: 'CSS', url: 'header/css.html' },
		{ title: 'SCSS', url: 'header/scss.html' },
		{ title: 'JavaScript', url: 'header/JavaScript.html' },
		{ title: 'PHP', url: '#' },
		{ title: 'WordpRess', url: '#' },
		{ title: 'GIT', url: '#' },
		{ title: 'Сборщик проектов Gulp 4', url: 'html/documentation.html' },
		{ title: 'Видео уроки', url: 'html/videolessons.html' },
		{ title: 'мастер-клас', url: 'html/videoclass.html' },
		{ title: 'HTML CSS', url: 'html/htmlcss.html' },
		{ title: 'JavaScript', url: 'html/js.html' },
		{ title: 'React', url: 'html/react.html' },
		{ title: 'php', url: 'html/php.html' },
		{ title: 'WordpRess', url: '#' },
		{ title: 'vs Code', url: 'https://upgraded-space-cod-jw5rrqg9q59hqgpg.github.dev/' },
		{ title: 'stackblitz', url: 'https://stackblitz.com/' },
		{ title: 'github', url: 'https://github.com' },
		{ title: 'Нотатки (Оcінь 2023)', url: 'https://fish-flute-4d3.notion.site/ed45efc8d6e94249865076650fcddd25?v=b1e6974b796247f0a04a0ee3a3e396b0' },
		{ title: 'шпаргалка ( Фрилансер по життю )', url: 'https://fls.guru/' },
		{ title: 'Безплатний розмишеня свого сайта', url: 'https://yhub.net/admin/dashboard' },
		{ title: 'чат GPT', url: 'https://chatgpt.com/' },
		{ title: 'чат Deepseek', url: 'https://chat.deepseek.com/' },
		{ title: 'создания чат бота', url: 'https://app.leadteh.ru/projects/6e016db6-a2d4-45de-9a9d-5e9c5cb468e8' },
		{ title: 'pinterest', url: 'https://ru.pinterest.com/' },
		{ title: 'udemy', url: 'https://www.udemy.com/' },
		// Додайте інші елементи, які потрібно шукати (Чертоги Фрілансера” v3?).
		{ title: 'Навіщо потрібні “Чертоги Фрілансера” v3? Презентація шаблону та його можливості', url: '../dok/_1.html' },
		{ title: 'Встановлення та запуск шаблону. Підготовка до роботи', url: '../dok/_2.html' },
		{ title: 'Архітектура шаблону. Файли та папки', url: '../dok/_3.html' },
		{ title: 'Робота зі шрифтами. Локальні та іконочні шрифти. Підключення з Google Fonts', url: '../dok/_4.html' },
		{ title: 'Робота з SVG-спрайтами', url: '../dok/_5.html' },
		{ title: 'Робота з шаблонізатором PUG', url: '../dok/_6.html' },
		{ title: 'STYLE.SCSS – налаштування адаптивної сітки, шрифтів, підключення дочірніх файлів', url: '../dok/_7.html' },
		{ title: 'SCSS-Міксин “Чуйна (адаптивна) властивість”', url: '../dok/_8.html' },
		{ title: 'Модуль меню «бургер»', url: '../dok/_9.html' },
		{ title: 'Модуль “Popup”. Випливаючі (модальні) вікна', url: '../dok/_10.html' },
		{ title: 'Модуль “Динамічний адаптив”', url: '../dok/_11.html' },
		{ title: 'Модуль “Прокручування до потрібного блоку”. Плавна навігація по сторінці.', url: '../dok/_12.html' },
		{ title: 'Модуль додавання класів до шапки під час прокручування сторінки', url: '../dok/_13.html' },
		{ title: 'Модуль “Спостерігач” за появою елементів під час прокручування сторінки (скролі)', url: '../dok/_14.html' },
		{ title: 'Модуль “Показати ще”', url: '../dok/_15.html' },
		{ title: 'Модуль “Таби”', url: '../dok/_16.html' },
		{ title: 'Модуль “Спойлери”', url: '../dok/_17.html' },
		{ title: 'Модуль “Ліниве підвантаження” (Lazy Loading)', url: '../dok/_18.html' },
		{ title: 'Модуль слайдеру “Swiper”', url: '../dok/_19.html' },
		{ title: 'Робота з формами та елементами форм', url: '../dok/_20.html' },
		{ title: 'Модуль кастомізації елемента SELECT', url: '../dok/_21.html' },
		{ title: 'Модуль “Галерея”', url: '../dok/_22.html' },
		{ title: 'Модуль анімації (паралакс) об’єктів під час руху миші', url: '../dok/_23.html' },
		{ title: 'Модуль “Календар” (js-datepicker)', url: '../dok/_24.html' },
		{ title: 'Модуль форми «Кількість»', url: '../dok/_25.html' },
		{ title: 'Надсилання листа на пошту (PHPMailer)', url: '../dok/_26.html' },
		{ title: 'Модуль екранного прокручування сторінки (FullPage)', url: '../dok/_27.html' },
		{ title: 'Модуль анімації цифрового лічильника', url: '../dok/_28.html' },
		{ title: 'Паралакс-ефект при скроллі сторінки', url: '../dok/_29.html' },
		{ title: 'Модуль “Прелоадер”', url: '../dok/_30.html' },
		{ title: 'Модуль “Ripple Effect”', url: '../dok/_31.html' },
		{ title: 'Модуль “Custom Cursor”', url: '../dok/_32.html' },
		{ title: 'Модуль Isotope (масонрі сітка)', url: '../dok/_33.html' },
		{ title: 'Палітра кольорів', url: '../dok/_34.html' },
		{ title: 'Використання React', url: '../dok/_35.html' },
		{ title: 'Модуль “До/Після”', url: '../dok/_36.html' },
		{ title: 'Модуль адаптивних зображень “IBG”', url: '../dok/_37.html' },
		{ title: 'Модуль “Зірковий рейтинг”', url: '../dok/_38.html' },
		{ title: 'Робота з Tailwind', url: '../dok/_39.html' },
		{ title: 'Конструктивний міксін “Грід-контейнер”', url: '../dok/_40.html' },
		// Додайте інші елементи, які потрібно шукати (Видео уроки)
		{ title: 'Урок', url: '../html/videolessons.html' },
		{ title: 'мастер-клас', url: '../html/videoclass.html' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
		{ title: '', url: '' },
	];

	searchButton.addEventListener('click', function () {
		performSearch();
	});

	searchInput.addEventListener('input', function () {
		if (searchInput.value.trim() === '') {
			searchResults.innerHTML = ''; // Очистити результати, якщо поле порожнє
		} else {
			performSearch();
		}
		
	});
	

	function performSearch() {
		const query = searchInput.value.toLowerCase();
		const results = pages.filter(page => page.title.toLowerCase().includes(query));

		displayResults(results);
	}

	function displayResults(results) {
		searchResults.innerHTML = '';
		if (results.length === 0) {
			searchResults.innerHTML = '<p>Нічого не знайдено</p>';
		} else {
			results.forEach(result => {
				const link = document.createElement('a');
				link.href = result.url;
				link.textContent = result.title;
				link.classList.add('search-result');
				searchResults.appendChild(link);
			});
		}
	}
});

document.addEventListener('DOMContentLoaded', function () {
	const links = document.querySelectorAll('.menu__link');

	links.forEach(link => {
		link.addEventListener('click', function (event) {
			event.preventDefault();
			const url = this.getAttribute('href');
			loadPage(url);
		});
	});

	function loadPage(url) {
		fetch(url)
			.then(response => response.text())
			.then(html => {
				document.querySelector('.page').innerHTML = html;
			})
			.catch(err => console.error('Помилка завантаження сторінки:', err));
	}
});

