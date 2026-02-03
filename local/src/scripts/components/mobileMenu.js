export default function menuToggle() {
	const buttons = document.querySelectorAll('.js-menu-toggle');
	const body = document.body;

	buttons.forEach(btn => {
		btn.addEventListener('click', () => {
			body.classList.toggle('show-mobile-nav');
		});
	});
}