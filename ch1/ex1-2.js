var clicks = 0;
document.addEventListener('click', function registerClicks(e) {

    if (clicks < 10) {
	if (e.clientX > window.innerWidth / 2) {
	    console.log(e.clientX, e.clientY);
	    clicks += 1;
	}
    } else {
	document.removeEventListener('click', registerClicks);
    }
});
