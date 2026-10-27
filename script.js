const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
	const menuToggleLabel = menuToggle.querySelector('.menu-toggle-label');
	const closeMenu = () => {
		siteNav.classList.remove('open');
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Abrir menú');
		if (menuToggleLabel) menuToggleLabel.textContent = 'Explorar secciones';
	};

	menuToggle.addEventListener('click', () => {
		const isOpen = siteNav.classList.toggle('open');
		menuToggle.setAttribute('aria-expanded', String(isOpen));
		menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
		if (menuToggleLabel) menuToggleLabel.textContent = isOpen ? 'Cerrar menú' : 'Explorar secciones';
	});

	document.querySelectorAll('.site-nav a').forEach((link) => {
		link.addEventListener('click', closeMenu);
	});

	document.addEventListener('click', (event) => {
		if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && siteNav.classList.contains('open')) {
			closeMenu();
			menuToggle.focus();
		}
	});
}

document.querySelectorAll('main section[id]').forEach((section) => {
	if (section.id === 'inicio' || section.querySelector('.back-to-home')) return;

	const backLink = document.createElement('a');
	backLink.className = 'back-to-home';
	backLink.href = '#inicio';
	backLink.innerHTML = '<span aria-hidden="true">↑</span> Volver al inicio';
	section.append(backLink);
});

const filterButtons = document.querySelectorAll('.filter-button');
const resourceCards = document.querySelectorAll('.resource-card');

filterButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const selectedFilter = button.dataset.filter;
		filterButtons.forEach((item) => item.classList.toggle('active', item === button));
		resourceCards.forEach((card) => {
			const shouldShow = selectedFilter === 'all' || card.dataset.category === selectedFilter;
			card.hidden = !shouldShow;
		});
	});
});

if ('IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
	document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}
