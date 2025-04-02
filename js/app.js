(() => {
	"use strict";
	function isWebp() {
		function testWebP(callback) {
			let webP = new Image;
			webP.onload = webP.onerror = function () {
				callback(webP.height == 2);
			};
			webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
		}
		testWebP((function (support) {
			let className = support === true ? "webp" : "no-webp";
			document.documentElement.classList.add(className);
		}));
	}
	function functions_getHash() {
		if (location.hash) return location.hash.replace("#", "");
	}
	function setHash(hash) {
		hash = hash ? `#${hash}` : window.location.href.split("#")[0];
		history.pushState("", "", hash);
	}
	let _slideUp = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains("_slide")) {
			target.classList.add("_slide");
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.height = `${target.offsetHeight}px`;
			target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout((() => {
				target.hidden = !showmore ? true : false;
				!showmore ? target.style.removeProperty("height") : null;
				target.style.removeProperty("padding-top");
				target.style.removeProperty("padding-bottom");
				target.style.removeProperty("margin-top");
				target.style.removeProperty("margin-bottom");
				!showmore ? target.style.removeProperty("overflow") : null;
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				target.classList.remove("_slide");
				document.dispatchEvent(new CustomEvent("slideUpDone", {
					detail: {
						target
					}
				}));
			}), duration);
		}
	};
	let _slideDown = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains("_slide")) {
			target.classList.add("_slide");
			target.hidden = target.hidden ? false : null;
			showmore ? target.style.removeProperty("height") : null;
			let height = target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.height = height + "px";
			target.style.removeProperty("padding-top");
			target.style.removeProperty("padding-bottom");
			target.style.removeProperty("margin-top");
			target.style.removeProperty("margin-bottom");
			window.setTimeout((() => {
				target.style.removeProperty("height");
				target.style.removeProperty("overflow");
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				target.classList.remove("_slide");
				document.dispatchEvent(new CustomEvent("slideDownDone", {
					detail: {
						target
					}
				}));
			}), duration);
		}
	};
	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
	};
	let bodyLockStatus = true;
	let bodyLockToggle = (delay = 500) => {
		if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
	};
	let bodyUnlock = (delay = 500) => {
		if (bodyLockStatus) {
			const lockPaddingElements = document.querySelectorAll("[data-lp]");
			setTimeout((() => {
				lockPaddingElements.forEach((lockPaddingElement => {
					lockPaddingElement.style.paddingRight = "";
				}));
				document.body.style.paddingRight = "";
				document.documentElement.classList.remove("lock");
			}), delay);
			bodyLockStatus = false;
			setTimeout((function () {
				bodyLockStatus = true;
			}), delay);
		}
	};
	let bodyLock = (delay = 500) => {
		if (bodyLockStatus) {
			const lockPaddingElements = document.querySelectorAll("[data-lp]");
			const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
			lockPaddingElements.forEach((lockPaddingElement => {
				lockPaddingElement.style.paddingRight = lockPaddingValue;
			}));
			document.body.style.paddingRight = lockPaddingValue;
			document.documentElement.classList.add("lock");
			bodyLockStatus = false;
			setTimeout((function () {
				bodyLockStatus = true;
			}), delay);
		}
	};
	function spollers() {
		const spollersArray = document.querySelectorAll("[data-spollers]");
		if (spollersArray.length > 0) {
			document.addEventListener("click", setSpollerAction);
			const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
				return !item.dataset.spollers.split(",")[0];
			}));
			if (spollersRegular.length) initSpollers(spollersRegular);
			let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
			if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
				mdQueriesItem.matchMedia.addEventListener("change", (function () {
					initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				}));
				initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			}));
			function initSpollers(spollersArray, matchMedia = false) {
				spollersArray.forEach((spollersBlock => {
					spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
					if (matchMedia.matches || !matchMedia) {
						spollersBlock.classList.add("_spoller-init");
						initSpollerBody(spollersBlock);
					} else {
						spollersBlock.classList.remove("_spoller-init");
						initSpollerBody(spollersBlock, false);
					}
				}));
			}
			function initSpollerBody(spollersBlock, hideSpollerBody = true) {
				let spollerItems = spollersBlock.querySelectorAll("details");
				if (spollerItems.length) spollerItems.forEach((spollerItem => {
					let spollerTitle = spollerItem.querySelector("summary");
					if (hideSpollerBody) {
						spollerTitle.removeAttribute("tabindex");
						if (!spollerItem.hasAttribute("data-open")) {
							spollerItem.open = false;
							spollerTitle.nextElementSibling.hidden = true;
						} else {
							spollerTitle.classList.add("_spoller-active");
							spollerItem.open = true;
						}
					} else {
						spollerTitle.setAttribute("tabindex", "-1");
						spollerTitle.classList.remove("_spoller-active");
						spollerItem.open = true;
						spollerTitle.nextElementSibling.hidden = false;
					}
				}));
			}
			function setSpollerAction(e) {
				const el = e.target;
				if (el.closest("summary") && el.closest("[data-spollers]")) {
					e.preventDefault();
					if (el.closest("[data-spollers]").classList.contains("_spoller-init")) {
						const spollerTitle = el.closest("summary");
						const spollerBlock = spollerTitle.closest("details");
						const spollersBlock = spollerTitle.closest("[data-spollers]");
						const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
						const scrollSpoller = spollerBlock.hasAttribute("data-spoller-scroll");
						const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
						if (!spollersBlock.querySelectorAll("._slide").length) {
							if (oneSpoller && !spollerBlock.open) hideSpollersBody(spollersBlock);
							!spollerBlock.open ? spollerBlock.open = true : setTimeout((() => {
								spollerBlock.open = false;
							}), spollerSpeed);
							spollerTitle.classList.toggle("_spoller-active");
							_slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
							if (scrollSpoller && spollerTitle.classList.contains("_spoller-active")) {
								const scrollSpollerValue = spollerBlock.dataset.spollerScroll;
								const scrollSpollerOffset = +scrollSpollerValue ? +scrollSpollerValue : 0;
								const scrollSpollerNoHeader = spollerBlock.hasAttribute("data-spoller-scroll-noheader") ? document.querySelector(".header").offsetHeight : 0;
								window.scrollTo({
									top: spollerBlock.offsetTop - (scrollSpollerOffset + scrollSpollerNoHeader),
									behavior: "smooth"
								});
							}
						}
					}
				}
				if (!el.closest("[data-spollers]")) {
					const spollersClose = document.querySelectorAll("[data-spoller-close]");
					if (spollersClose.length) spollersClose.forEach((spollerClose => {
						const spollersBlock = spollerClose.closest("[data-spollers]");
						const spollerCloseBlock = spollerClose.parentNode;
						if (spollersBlock.classList.contains("_spoller-init")) {
							const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
							spollerClose.classList.remove("_spoller-active");
							_slideUp(spollerClose.nextElementSibling, spollerSpeed);
							setTimeout((() => {
								spollerCloseBlock.open = false;
							}), spollerSpeed);
						}
					}));
				}
			}
			function hideSpollersBody(spollersBlock) {
				const spollerActiveBlock = spollersBlock.querySelector("details[open]");
				if (spollerActiveBlock && !spollersBlock.querySelectorAll("._slide").length) {
					const spollerActiveTitle = spollerActiveBlock.querySelector("summary");
					const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
					spollerActiveTitle.classList.remove("_spoller-active");
					_slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
					setTimeout((() => {
						spollerActiveBlock.open = false;
					}), spollerSpeed);
				}
			}
		}
	}
	function tabs() {
		const tabs = document.querySelectorAll("[data-tabs]");
		let tabsActiveHash = [];
		if (tabs.length > 0) {
			const hash = functions_getHash();
			if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
			tabs.forEach(((tabsBlock, index) => {
				tabsBlock.classList.add("_tab-init");
				tabsBlock.setAttribute("data-tabs-index", index);
				tabsBlock.addEventListener("click", setTabsAction);
				initTabs(tabsBlock);
			}));
			let mdQueriesArray = dataMediaQueries(tabs, "tabs");
			if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
				mdQueriesItem.matchMedia.addEventListener("change", (function () {
					setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				}));
				setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			}));
		}
		function setTitlePosition(tabsMediaArray, matchMedia) {
			tabsMediaArray.forEach((tabsMediaItem => {
				tabsMediaItem = tabsMediaItem.item;
				let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
				let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
				let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
				let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
				tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
				tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
				tabsContentItems.forEach(((tabsContentItem, index) => {
					if (matchMedia.matches) {
						tabsContent.append(tabsTitleItems[index]);
						tabsContent.append(tabsContentItem);
						tabsMediaItem.classList.add("_tab-spoller");
					} else {
						tabsTitles.append(tabsTitleItems[index]);
						tabsMediaItem.classList.remove("_tab-spoller");
					}
				}));
			}));
		}
		function initTabs(tabsBlock) {
			let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
			let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
			const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
			const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
			if (tabsActiveHashBlock) {
				const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
				tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
			}
			if (tabsContent.length) tabsContent.forEach(((tabsContentItem, index) => {
				tabsTitles[index].setAttribute("data-tabs-title", "");
				tabsContentItem.setAttribute("data-tabs-item", "");
				if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
				tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
			}));
		}
		function setTabsStatus(tabsBlock) {
			let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
			let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
			const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
			function isTabsAnamate(tabsBlock) {
				if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
			}
			const tabsBlockAnimate = isTabsAnamate(tabsBlock);
			if (tabsContent.length > 0) {
				const isHash = tabsBlock.hasAttribute("data-tabs-hash");
				tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
				tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
				tabsContent.forEach(((tabsContentItem, index) => {
					if (tabsTitles[index].classList.contains("_tab-active")) {
						if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
						if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
					} else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
				}));
			}
		}
		function setTabsAction(e) {
			const el = e.target;
			if (el.closest("[data-tabs-title]")) {
				const tabTitle = el.closest("[data-tabs-title]");
				const tabsBlock = tabTitle.closest("[data-tabs]");
				if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
					let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
					tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
					tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
					tabTitle.classList.add("_tab-active");
					setTabsStatus(tabsBlock);
				}
				e.preventDefault();
			}
		}
	}
	function menuInit() {
		if (document.querySelector(".icon-menu")) document.addEventListener("click", (function (e) {
			if (bodyLockStatus && e.target.closest(".icon-menu")) {
				bodyLockToggle();
				document.documentElement.classList.toggle("menu-open");
			}
		}));
	}
	function uniqArray(array) {
		return array.filter((function (item, index, self) {
			return self.indexOf(item) === index;
		}));
	}
	function dataMediaQueries(array, dataSetValue) {
		const media = Array.from(array).filter((function (item, index, self) {
			if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
		}));
		if (media.length) {
			const breakpointsArray = [];
			media.forEach((item => {
				const params = item.dataset[dataSetValue];
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			}));
			let mdQueries = breakpointsArray.map((function (item) {
				return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
			}));
			mdQueries = uniqArray(mdQueries);
			const mdQueriesArray = [];
			if (mdQueries.length) {
				mdQueries.forEach((breakpoint => {
					const paramsArray = breakpoint.split(",");
					const mediaBreakpoint = paramsArray[1];
					const mediaType = paramsArray[2];
					const matchMedia = window.matchMedia(paramsArray[0]);
					const itemsArray = breakpointsArray.filter((function (item) {
						if (item.value === mediaBreakpoint && item.type === mediaType) return true;
					}));
					mdQueriesArray.push({
						itemsArray,
						matchMedia
					});
				}));
				return mdQueriesArray;
			}
		}
	}
	let addWindowScrollEvent = false;
	setTimeout((() => {
		if (addWindowScrollEvent) {
			let windowScroll = new Event("windowScroll");
			window.addEventListener("scroll", (function (e) {
				document.dispatchEvent(windowScroll);
			}));
		}
	}), 0);
	function updateTime() {
		var now = new Date;
		document.getElementById("time").innerText = zeroPadding(now.getHours(), 2) + ":" + zeroPadding(now.getMinutes(), 2) + ":" + zeroPadding(now.getSeconds(), 2);
		document.getElementById("date").innerText = zeroPadding(now.getDate(), 2) + "-" + zeroPadding(now.getMonth() + 1, 2) + "-" + now.getFullYear();
	}
	updateTime();
	setInterval(updateTime, 1e3);
	function zeroPadding(num, digit) {
		return String(num).padStart(digit, "0");
	}
	const daysElement = document.getElementById("days");
	const monthYearElement = document.getElementById("monthYear");
	const prevButton = document.getElementById("prev");
	const nextButton = document.getElementById("next");
	let currentDate = new Date;
	function renderCalendar(date) {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1).getDay();
		const lastDate = new Date(year, month + 1, 0).getDate();
		const days = [];
		for (let i = 1; i < (firstDay || 7); i++) days.push("");
		for (let i = 1; i <= lastDate; i++) days.push(i);
		monthYearElement.textContent = date.toLocaleString("un", {
			month: "long",
			year: "numeric"
		});
		daysElement.innerHTML = days.map((day => {
			const isToday = day === (new Date).getDate() && month === (new Date).getMonth() && year === (new Date).getFullYear();
			return `<div class="${isToday ? "today" : ""}">${day || ""}</div>`;
		})).join("");
	}
	prevButton.addEventListener("click", (() => {
		currentDate.setMonth(currentDate.getMonth() - 1);
		renderCalendar(currentDate);
	}));
	nextButton.addEventListener("click", (() => {
		currentDate.setMonth(currentDate.getMonth() + 1);
		renderCalendar(currentDate);
	}));
	renderCalendar(currentDate);
	window["FLS"] = true;
	isWebp();
	menuInit();
	spollers();
	tabs();
})();

// Музичний плеєр
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playlist = document.getElementById('playlist');
const playlistItems = playlist.getElementsByTagName('li');

let currentTrack = 0;

function loadTrack(index) {
	const trackSrc = playlistItems[index].getAttribute('data-src');
	audio.src = trackSrc;
	audio.play();
	playPauseBtn.textContent = '⏸️';
}

function playPause() {
	if (audio.paused) {
		audio.play();
		playPauseBtn.textContent = '⏸️';
	} else {
		audio.pause();
		playPauseBtn.textContent = '▶️';
	}
}

function stop() {
	audio.pause();
	audio.currentTime = 0;
	playPauseBtn.textContent = '▶️';
}

function prev() {
	currentTrack = (currentTrack - 1 + playlistItems.length) % playlistItems.length;
	loadTrack(currentTrack);
}

function next() {
	currentTrack = (currentTrack + 1) % playlistItems.length;
	loadTrack(currentTrack);
}

playPauseBtn.addEventListener('click', playPause);
stopBtn.addEventListener('click', stop);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

Array.from(playlistItems).forEach((item, index) => {
	item.addEventListener('click', () => {
		currentTrack = index;
		loadTrack(currentTrack);
	});
});

audio.addEventListener('ended', next);
// ============================================