const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
	const menuToggleLabel = menuToggle.querySelector('.menu-toggle-label');
	const closeMenu = () => {
		siteNav.classList.remove('open');
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Abrir menú');
		if (menuToggleLabel) menuToggleLabel.textContent = 'Menú';
	};

	menuToggle.addEventListener('click', () => {
		const isOpen = siteNav.classList.toggle('open');
		menuToggle.setAttribute('aria-expanded', String(isOpen));
		menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
		if (menuToggleLabel) menuToggleLabel.textContent = isOpen ? 'Cerrar menú' : 'Menú';
	});

	document.querySelectorAll('.site-nav a').forEach((link) => {
		link.addEventListener('click', closeMenu);
	});

	document.addEventListener('click', (event) => {
		if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > 760 && siteNav.classList.contains('open')) closeMenu();
	}, { passive: true });

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

const instrumentImages = {
	'Trompeta': 'https://images.unsplash.com/photo-1558098329-a11cff621064?auto=format&fit=crop&w=500&q=80',
	'Barítono': 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=500&q=80',
	'Trombón': 'https://images.unsplash.com/photo-1568057377115-fb5ba1c80e3b?auto=format&fit=crop&w=500&q=80',
	'Melófono': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=500&q=80',
	'Tuba': 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80',
	'Corno francés': 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=500&q=80',
	'Tambor': 'https://images.unsplash.com/photo-1519683384668-2c9b7b5a6a4b?auto=format&fit=crop&w=500&q=80',
	'Bombo': 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=500&q=80',
	'Platillo': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=500&q=80',
	'Multitenor': 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=500&q=80',
	'Lira': 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=500&q=80',
	'Atabal': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=500&q=80',
	'Saxofón': 'https://images.unsplash.com/photo-1558098329-a11cff621064?auto=format&fit=crop&w=500&q=80',
	'Saxofón tenor': 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=500&q=80',
	'Saxofón barítono': 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=500&q=80',
	'Clarinete': 'https://images.unsplash.com/photo-1568057377115-fb5ba1c80e3b?auto=format&fit=crop&w=500&q=80',
	'Flauta': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=500&q=80',
	'Pícolo': 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=500&q=80'
};
document.querySelectorAll('.family-list a').forEach((link) => {
	const name = link.querySelector('strong')?.textContent.trim();
	if (!name || !instrumentImages[name]) return;
	const image = document.createElement('img');
	image.className = 'instrument-thumb'; image.src = instrumentImages[name]; image.alt = name;
	link.prepend(image);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener('click', () => {
		const target = document.querySelector(link.getAttribute('href'));
		if (!target) return;
		target.classList.add('section-arrival');
		window.setTimeout(() => target.classList.remove('section-arrival'), 950);
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
