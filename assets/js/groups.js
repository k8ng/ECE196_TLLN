setActivePage('nav_groups');

$('.ui.accordion')
  .accordion()
;

$('.ui.accordion').accordion({
  selector: {
    trigger: '.title .qus_label'
  }
});

$('.button')
  .popup()
;

$('.ui.button').click(function() {
	if ($(this).attr('id') == 'add-light-button') {
		$('#add-light-modal').modal('show');
	}
	else if ($(this).attr('id') == 'remove-light-button') {
		$('#remove-light-modal').modal('show');
	}
	else if ($(this).attr('id') == 'delete-group-button') {

	}
})