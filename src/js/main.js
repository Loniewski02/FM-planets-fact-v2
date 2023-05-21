const burgerBtn = document.querySelector('.nav__burger-btn');
const navItems = document.querySelector('.nav__items');
const allNavItems = navItems.querySelectorAll('.nav__items-item');
const planetBtns = document.querySelectorAll('.planet__btns-panel-btn');
const mobilePlanetBtns = document.querySelectorAll('.mobile-btns-panel__btn');
const URL = 'data.json';

const planetText = document.querySelector('.planet__info-text');
const planetSource = document.querySelector('.planet__info-source a');

const handleNav = () => {
	if (!burgerBtn.classList.contains('nav__burger-btn--active')) {
		showBurgerBtnClose();
	} else {
		hideBurgerBtnClose();
	}
	burgerBtn.classList.toggle('nav__burger-btn--active');
	navItems.classList.toggle('nav__items--active');

	allNavItems.forEach(item =>
		item.addEventListener('click', () => {
			burgerBtn.classList.remove('nav__burger-btn--active');
			navItems.classList.remove('nav__items--active');
			hideBurgerBtnClose();
		})
	);
};

async function handleData(atr) {
	const response = await axios.get(URL);
	const data = response.data;
	try {
		const planet = document.querySelector('.planet');
		const imagesBox = document.querySelector('.planet__imgs');
		const firstImg = document.querySelector('.planet__imgs-img--first');
		const secondImg = document.querySelector('.planet__imgs-img--second');
		const popupImg = document.querySelector('.planet__imgs-img--popup');
		const planetTitle = document.querySelector('.planet__info-title');
		const rotation = document.querySelector('.rotation');
		const revolution = document.querySelector('.revolution');
		const radius = document.querySelector('.radius');
		const temperature = document.querySelector('.temp');

		setTimeout(() => {
			for (let i = 0; i < data.length; i++) {
				planet.classList.remove(`planet-${data[i].name.toLowerCase()}`);
				imagesBox.classList.remove(`planet__imgs--${data[i].name.toLowerCase()}`);
			}
			planetBtns.forEach(btn => {
				btn.classList.remove('planet__btns-panel-btn--active');
			});
			mobilePlanetBtns.forEach(btn => {
				btn.classList.remove('mobile-btns-panel__btn--active');
			});

			planetBtns[0].classList.add('planet__btns-panel-btn--active');
			mobilePlanetBtns[0].classList.add('mobile-btns-panel__btn--active');

			planet.classList.add(`planet-${data[atr].name.toLowerCase()}`);
			imagesBox.classList.add(`planet__imgs--${data[atr].name.toLowerCase()}`);
			firstImg.setAttribute('src', `${data[atr].images.planet}`);
			secondImg.setAttribute('src', `${data[atr].images.internal}`);
			popupImg.setAttribute('src', `${data[atr].images.geology}`);
			planetTitle.textContent = data[atr].name;
			planetText.textContent = data[atr].overview.content;
			planetSource.setAttribute('href', `${data[atr].overview.source}`);
			rotation.textContent = data[atr].rotation;
			radius.textContent = data[atr].radius;
			revolution.textContent = data[atr].revolution;
			temperature.textContent = data[atr].temperature;
			firstImg.style.opacity = 1;
			secondImg.style.opacity = 0;
		}, 1500);
		popupImg.style.opacity = 0;
	} catch (error) {
		console.error(error);
	}
}

async function handlePlanetInfo(btn) {
	const response = await axios.get(URL);
	const data = response.data;
	try {
		for (let i = 0; i < data.length; i++) {
			if (
				allNavItems[i].classList.contains('nav__items-item--active') &&
				allNavItems[i].classList.contains(`nav__items-item--${data[i].name.toLowerCase()}`)
			) {
				let content, source;
				if (btn.classList.contains('overview-btn')) {
					gsap.to(`.planet__imgs-img--first`, {
						duration: 0.5,
						opacity: 1,
					});
					gsap.to(`.planet__imgs-img--second`, {
						duration: 0.5,
						opacity: 0,
					});
					gsap.to(`.planet__imgs-img--popup`, {
						duration: 0.5,
						opacity: 0,
						y: '0%',
					});
					content = data[i].overview.content;
					source = data[i].overview.source;
				} else if (btn.classList.contains('structure-btn')) {
					gsap.to(`.planet__imgs-img--second`, {
						duration: 0.5,
						opacity: 1,
					});
					gsap.to(`.planet__imgs-img--first`, {
						duration: 0.5,
						opacity: 0,
					});
					gsap.to(`.planet__imgs-img--popup`, {
						duration: 0.5,
						opacity: 0,
						y: '0%',
					});
					content = data[i].structure.content;
					source = data[i].structure.source;
				} else if (btn.classList.contains('geology-btn')) {
					gsap.to(`.planet__imgs-img--second`, {
						duration: 0.5,
						opacity: 0,
					});
					gsap.to(`.planet__imgs-img--first`, {
						duration: 0.5,
						opacity: 1,
					});
					gsap.to(`.planet__imgs-img--popup`, {
						duration: 0.5,
						opacity: 1,
						y: '85%',
					});
					content = data[i].geology.content;
					source = data[i].geology.source;
				}

				planetText.textContent = content;
				planetSource.setAttribute('href', source);
			}
		}
	} catch (error) {
		console.error(error);
	}
}

const showBurgerBtnClose = () => {
	gsap.to('.nav__burger-btn-bars', { duration: 0.2, bottom: 0 });
	gsap.to('.nav__burger-btn-bars--middle', { duration: 0.1, opacity: '0', bottom: 0 });
	gsap.to('.nav__burger-btn-bars--top', { duration: 0.1, delay: 0.2, y: -7, rotation: 45 });
	gsap.to('.nav__burger-btn-bars--bottom', { duration: 0.1, delay: 0.2, y: -7, rotation: -45 });
};

const hideBurgerBtnClose = () => {
	gsap.to('.nav__burger-btn-bars--top', { duration: 0.2, y: 0, rotation: 0 });
	gsap.to('.nav__burger-btn-bars--bottom', { duration: 0.2, y: 0, rotation: 0 });
	gsap.to('.nav__burger-btn-bars--middle', { duration: 0.1, delay: 0.3, opacity: '1' });
	gsap.to('.nav__burger-btn-bars--middle', { duration: 0.2, delay: 0.3, bottom: '7px' });
	gsap.to('.nav__burger-btn-bars--top', { duration: 0.2, delay: 0.3, bottom: '14px' });
};

burgerBtn.addEventListener('click', handleNav);

const changeAnimation = () => {
	gsap.to('.planet__main', {
		duration: 0.1,
		opacity: 0,
		scale: 0,
	});
	gsap.to('.footer', {
		duration: 0.1,
		opacity: 0,
		scale: 0,
	});
	gsap.to('.hero-bg', {
		duration: 1.5,
		rotation: '-1080deg',
		scale: 0,
	});
	gsap.to('.planet__imgs', {
		duration: 1,
		delay: 0.2,
		rotation: '-720deg',
		scale: 0,
	});

	gsap.to('.hero-bg', {
		duration: 1.5,
		delay: 1.5,
		rotation: '1080deg',
		scale: 1,
	});
	gsap.to('.planet__imgs', {
		duration: 1,
		delay: 1.5,
		rotation: '720deg',
		scale: 1,
	});
	gsap.to('.planet__main', {
		duration: 0.1,
		delay: 2,
		opacity: 1,
		scale: 1,
	});
	gsap.to('.footer', {
		duration: 0.1,
		delay: 2,
		opacity: 1,
		scale: 1,
	});
};

allNavItems.forEach(item => {
	item.addEventListener('click', e => {
		let index = e.target.dataset.index;
		handleData(index);
		allNavItems.forEach(item => item.classList.remove('nav__items-item--active'));
		item.classList.add('nav__items-item--active');
		changeAnimation();
	});
});

planetBtns.forEach(btn => {
	btn.addEventListener('click', e => {
		planetBtns.forEach(btn => btn.classList.remove('planet__btns-panel-btn--active'));
		const target = e.target.closest('button');
		target.classList.add('planet__btns-panel-btn--active');
		handlePlanetInfo(target);
	});
});

mobilePlanetBtns.forEach(btn => {
	btn.addEventListener('click', e => {
		mobilePlanetBtns.forEach(btn => btn.classList.remove('mobile-btns-panel__btn--active'));
		const target = e.target.closest('button');
		btn.classList.add('mobile-btns-panel__btn--active');
		handlePlanetInfo(target);
	});
});

document.addEventListener('DOMContentLoaded', () => {
	gsap.to('.hero-bg', {
		rotation: '-360deg',
		repeat: -1,
		ease: 'linear',
		duration: 180,
	});
	// handleBottomInfo();
	// handleData();
});
