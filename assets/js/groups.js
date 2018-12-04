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
	if ($(this).attr('id') == 'add-group-button') {
		$('#add-group-modal').modal('show');
	}
	else if ($(this).attr('id') == 'add-lights-button') {
		$('#add-lights-modal').modal('show');
	}
	else if ($(this).attr('id') == 'remove-lights-button') {
		$('#remove-lights-modal').modal('show');
	}
	else if ($(this).attr('id') == 'delete-group-button') {

	}
});
