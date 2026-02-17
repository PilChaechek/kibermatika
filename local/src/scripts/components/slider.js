import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function slider() {
	const section = document.getElementById("principles");
	if (!section) return;

	const mm = gsap.matchMedia();

	// --- Desktop (GSAP) ---
	mm.add("(min-width: 1024px)", () => {
		gsap.registerPlugin(ScrollTrigger);
		const pinWrap = section.querySelector(".slider__items");
		const container = section.querySelector(".container");

		if (!pinWrap || !container) return;

		let pinWrapWidth;
		let horizontalScrollLength;

		function refresh() {
			pinWrapWidth = pinWrap.scrollWidth;
			horizontalScrollLength = pinWrapWidth - container.offsetWidth;
		}

		refresh();

		gsap.to(pinWrap, {
			scrollTrigger: {
				scrub: true,
				trigger: section,
				pin: section,
				start: "center center",
				end: () => `+=${pinWrapWidth}`,
				invalidateOnRefresh: true
			},
			x: () => -horizontalScrollLength,
			ease: "none"
		});

		ScrollTrigger.addEventListener("refreshInit", refresh);
	});

	// --- Mobile (Swiper) ---
	mm.add("(max-width: 1023px)", async () => {
		// Находим контейнер Swiper внутри секции
		const swiperContainer = section.querySelector('.swiper');
		if (!swiperContainer) return;

		const initSwiper = async () => {
			const { default: Swiper } = await import('swiper');

			// Инициализируем Swiper на правильном контейнере
			const sliderSwiper = new Swiper(swiperContainer, {
				slidesPerView: 1.1,
				spaceBetween: 12,
				grabCursor: true,
				slidesOffsetBefore: 12,
				slidesOffsetAfter: 12,
				breakpoints: {
					744: {
						//enabled: false,
						slidesPerView: "auto"
					},
				}
			});
		};
		await initSwiper();
	});
}