import menuToggle from './components/mobileMenu.js'
import swiper from "./components/swiper.js";
import cultureSwiper from "./components/cultureSwiper.js";
import slider from "./components/slider.js";


document.addEventListener('DOMContentLoaded', () => {
	menuToggle()
	swiper()
	cultureSwiper()
	slider()
})



// Активный пункт для меню
document.addEventListener('DOMContentLoaded', () => {
	const nav = document.querySelector('.main-nav');

	if (!nav) return;

	nav.addEventListener('click', (event) => {
		const targetItem = event.target.closest('.main-nav__item');

		if (!targetItem || targetItem.classList.contains('main-nav__item--active')) {
			return;
		}

		event.preventDefault();

		const activeItem = nav.querySelector('.main-nav__item--active');
		if (activeItem) {
			activeItem.classList.remove('main-nav__item--active');
		}

		targetItem.classList.add('main-nav__item--active');

	});
});

