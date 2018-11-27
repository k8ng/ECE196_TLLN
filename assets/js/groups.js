setActivePage('nav_groups');

function selectLight(light_id) {
	var items = document.querySelector('inlist').children;

	for (i=1; i<items.length; i++) {
		items[i].classList.remove('active');
	}
	
	document.getElementById(light_id).classList.add('active');
}