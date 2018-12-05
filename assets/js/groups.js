setActivePage('nav_groups');

// settings for the accordian
$('.ui.accordion')
  .accordion()
;

$('.ui.accordion').accordion({
  selector: {
    trigger: '.title .qus_label'
  }
});

// settings to make popup open on hover
$('.button')
  .popup()
;

// button click functionality
$('.ui.button').click(function() {
	if ($(this).attr('id') == 'add-group-button') {
		$('#add-group-modal').modal('show');
	}
  
  // clicked on an add light button
	else if ($(this).attr('id') == 'add-lights-button') {
    // make database request to get the name of the group and the lights
    // inside of the group
    $.get('/get-group', { groupID: $(this).attr('name') }, function(theGroup) {

      // empty out our modal since we need to construct it based on the group
      // we selected
      $('#add-lights-fields').empty();

      // add the group name
      $('#add-lights-fields').append('<label>'+ theGroup.name +'</label>');
      $('#add-lights-form').prepend('<div class=\'field\'> <input type=\'text\' name=\'groupID\' value=\'' + theGroup._id + '\' hidden> </div>');

      // now construct the lights
      // make database call to lights to get list of all the lights
      $.get('/get-lights', function(lights) {
        var existingLights = theGroup.lights;

        // filter all the lights for the ones not already in this group
        lights = lights.filter(light => !(existingLights.includes(light._id)));
        
        // for each light remaining, construct a new checkbox
        lights.forEach( function(light,i) {
          // construct the HTML
          var appendHTML = '<div class=\'field\'>';
          appendHTML += '<div class=\'ui checkbox\'>';
          appendHTML += '<input type=\'checkbox\' name=\'selection[' + light._id + ']\'>';
          appendHTML += '<label>' + light.name + '</label>';
          appendHTML += '</div>';
          appendHTML += '</div>';

          // append it to the modal
          $('#add-lights-fields').append(appendHTML);
        });
      });
    });

    // finally display the modal
		$('#add-lights-modal').modal('show');
	}

  // clicked on a remove light button
	else if ($(this).attr('id') == 'remove-lights-button') {
    // make database request to get the name of the group and the lights
    // inside of the group
    $.get('/get-group', { groupID: $(this).attr('name') }, function(theGroup) {
      // empty out our modal since we need to construct it based on the group
      // we selected
      $('#remove-lights-fields').empty();

      // add the group name
      $('#remove-lights-fields').append('<label>'+ theGroup.name +'</label>');
      $('#remove-lights-form').prepend('<div class=\'field\'> <input type=\'text\' name=\'groupID\' value=\'' + theGroup._id + '\' hidden> </div>');

      $.get('/get-lights', function(lights) {
        var existingLights = theGroup.lights;

        // filter all the lights for the ones not already in this group
        lights = lights.filter(light => existingLights.includes(light._id));
        
        // for each light remaining, construct a new checkbox
        lights.forEach( function(light,i) {
          // construct the HTML
          var appendHTML = '<div class=\'field\'>';
          appendHTML += '<div class=\'ui checkbox\'>';
          appendHTML += '<input type=\'checkbox\' name=\'selection[' + light._id + ']\'>';
          appendHTML += '<label>' + light.name + '</label>';
          appendHTML += '</div>';
          appendHTML += '</div>';

          // append it to the modal
          $('#remove-lights-fields').append(appendHTML);
        });
      });
    });

    // final display the modal
		$('#remove-lights-modal').modal('show');
	}

  // clicked on a delete group button
	else if ($(this).attr('id') == 'delete-group-button') {

	}
});
