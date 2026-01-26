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


// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
//
// // Регистрируем плагины
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
//
// // Создаем плавный скролл
// ScrollSmoother.create({
//   wrapper: "#smooth-wrapper",
//   content: "#smooth-content",
//   smooth: 1.2, // скорость скролла
//   effects: true, // включаем data-speed и data-lag эффекты
// });
//
// // Горизонтальный скролл для слайдера
// if (document.getElementById("slider-1")) {
//   const horizontalSection = document.querySelector("#slider-1");
//   const pinWrap = horizontalSection.querySelector(".slider__items");
//   const container = horizontalSection.querySelector(".container");
//
//   let pinWrapWidth;
//   let horizontalScrollLength;
//
//   function refresh() {
//     pinWrapWidth = pinWrap.scrollWidth;
//     horizontalScrollLength = pinWrapWidth - container.offsetWidth;
//   }
//
//   refresh();
//
//   gsap.to(pinWrap, {
//     scrollTrigger: {
//       scrub: true,
//       trigger: horizontalSection,
//       pin: horizontalSection,
//       start: "center center",
//       end: () => `+=${pinWrapWidth}`,
//       invalidateOnRefresh: true
//     },
//     x: () => -horizontalScrollLength,
//     ease: "none"
//   });
//
//   ScrollTrigger.addEventListener("refreshInit", refresh);
// }
