//import 'swiper/css';

let pathSwiper = null;

export default async function swiper() {
	const container = document.getElementById('path-cards');

	// Если блока нет на странице
	if (!container) return;

	// Задаем диапазон
	const breakpoint = window.matchMedia('(min-width: 400px) and (max-width: 1200px)');

	// Функция-контроллер (менеджер состояния)
	const handleResize = async () => {
		if (breakpoint.matches) {
			// Если слайдер уже есть, ничего не делаем
			if (pathSwiper) return;

			// Если слайдера нет — создаем
			await initPathSwiper();

		} else {
			// === МЫ ВНЕ ДИАПАЗОНА (<400 или >940) ===

			if (pathSwiper) {
				pathSwiper.destroy(true, true);
				pathSwiper = null;
			}
		}
	};

	// 4. Функция инициализации
	const initPathSwiper = async () => {
		const { default: Swiper } = await import('swiper');

		// Импорт CSS
		import('swiper/css');

		pathSwiper = new Swiper(container, {
			slidesPerView: 1.2,
			spaceBetween: 8,
			grabCursor: true,
			slidesOffsetBefore: 12,
			slidesOffsetAfter: 12,
			enabled: false,
			breakpoints: {
				400: {
					enabled: true,
					slidesPerView: 1.2,
					spaceBetween: 8,
					slidesOffsetBefore: 16,
					slidesOffsetAfter: 16,
				},
				744: {
					enabled: true,
					slidesPerView: 1.8,
					spaceBetween: 8,
					slidesOffsetBefore: 30,
					slidesOffsetAfter: 30,
				},
				992: {
					enabled: true,
					slidesPerView: 2.1,
					spaceBetween: 8,
					slidesOffsetBefore: 30,
					slidesOffsetAfter: 30,
				}
			}
		});
	};

	// Вешаем слушатель изменений
	breakpoint.addEventListener('change', handleResize);

	// Запускаем проверку при загрузке страницы
	handleResize();
}