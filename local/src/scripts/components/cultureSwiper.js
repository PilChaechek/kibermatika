export default async function cultureSwiper() {

	const container = document.getElementById('culture-swiper');

	// Если блока нет на странице
	if (!container) return;

	const initCultureSwiper = async () => {
		const { default: Swiper } = await import('swiper');

		const pathSwiper = new Swiper(container, {
			slidesPerView: 1.1,
			spaceBetween: 12,
			grabCursor: true,
			slidesOffsetBefore: 12,
			slidesOffsetAfter: 12,
			breakpoints: {
				400: {
					slidesPerView: 1.2,
					spaceBetween: 8,
					slidesOffsetBefore: 16,
					slidesOffsetAfter: 16,
				},
				744: {

					slidesPerView: 1.8,
					spaceBetween: 16,
					slidesOffsetBefore: 16,
					slidesOffsetAfter: 16,
				},
				992: {
					slidesPerView: 2.1,
					spaceBetween: 30,
					slidesOffsetBefore: 30,
					slidesOffsetAfter: 30,
				}
			}
		});
	};

	await initCultureSwiper();
}