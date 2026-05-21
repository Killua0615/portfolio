const menuHamburger = document.querySelector(".burger-menu");
const navList = document.querySelector(".nav-list");

if (menuHamburger) {
	menuHamburger.addEventListener('click', () => {
		navList.classList.toggle('mobile-menu');

		if (navList.classList.contains('mobile-menu')) {
			menuHamburger.src = "images/close_icon.png";
			document.body.style.overflow = "hidden";
		}
		else {
			menuHamburger.src = "images/burger_menu_icon.png";
			document.body.style.overflow = "auto";
		}
	});
}

function OpenableDiv(titleTag) {
	this.title = document.getElementById(titleTag);
	this.div = document.getElementById(titleTag + "-div");
	this.open = false;

	if (!this.title || !this.div) return;

	this.title.addEventListener('click', () => {
		if (this.open) {
			this.div.style.display = "none";
			this.title.innerHTML = "→ " + this.title.innerHTML.substring(2);
			this.open = false;
		}
		else {
			this.div.style.display = "block";
			this.title.innerHTML = "↓ " + this.title.innerHTML.substring(2);
			this.open = true;
		}
	});
}

// Engineering page projects
if (document.querySelector('title').innerHTML === 'Natsumi Teshima - Engineering') {
	new OpenableDiv("transcendence");
	new OpenableDiv("king-queen");
	new OpenableDiv("trading-cup");
	new OpenableDiv("paymentmap");
	new OpenableDiv("judge-sheet");
	new OpenableDiv("ig-analytics");
	new OpenableDiv("bbb");
	new OpenableDiv("blank-shop");
	new OpenableDiv("portfolio");
	new OpenableDiv("ft-irc");
	new OpenableDiv("cub3d");
	new OpenableDiv("minishell");
	new OpenableDiv("philosophers");
	new OpenableDiv("so-long");
	new OpenableDiv("push-swap");
}

// Marketing page projects
if (document.querySelector('title').innerHTML === 'Natsumi Teshima - Marketing &amp; Branding') {
	new OpenableDiv("ig-marketing");
	new OpenableDiv("client-branding");
	new OpenableDiv("boku-watashi");
	new OpenableDiv("skyland");
	new OpenableDiv("codegym");
	new OpenableDiv("mulk");
	new OpenableDiv("blank-brand");
	new OpenableDiv("bars");
}

// Footer
const footerYear = document.getElementById('footer--year');
if (footerYear) footerYear.textContent = new Date().getFullYear();
