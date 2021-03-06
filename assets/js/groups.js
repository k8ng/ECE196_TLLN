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

$('.ui.checkbox').checkbox();

$('.group.ui.toggle').click(function() {
  
  // get list of all toggle checkboxes
  checkboxes = $('.my.ui.toggle');
  console.log(checkboxes);
  
  // filter out everything except the ones that are part of this group
  checkboxes = checkboxes.filter(checkbox => $(checkboxes[checkbox]).attr('id') == $(this).attr('name'));
  
  console.log(checkboxes);
  // toggle group is on
  if ($(this).checkbox('is checked')) {
    console.log('Toggle On');
    console.log(checkboxes.length);
    for (i = 0; i < checkboxes.length; i++) {
      if (!$(checkboxes[i]).checkbox('is checked')) {
        console.log('checking');
        console.log($(checkboxes[i]).checkbox('is checked'));
        $(checkboxes[i]).click();
        console.log($(checkboxes[i]).checkbox('is checked'));
      }
    }
  } else {
  // toggle group is off
    console.log('Toggle Off');
    for (i = 0; i < checkboxes.length; i++) {
      if ($(checkboxes[i]).checkbox('is checked')) {
        $(checkboxes[i]).click();
      }
    }
  }
});

// update the database when someone clicks a toggle checkbox
$('.my.ui.toggle').click(function(e) {
  console.log('clicked');
  console.log($(this).checkbox('is checked'));
  // user toggles light on
  if ($(this).checkbox('is checked')) {
    console.log('Toggle On');

    // we don't want to reload the page whenever we post something so we use
    // an asynchronous jQuery (ajax) to update the database form data

    // create the data
    var formData = {
      name: $(this).attr('name'),
      lightIsOn: true
    }

    console.log(JSON.stringify(formData));

    // make post
    $.ajax({
      type: 'POST',
      url: '/set-lights',
      contentType: 'application/json',
      dataType: 'text',
      data: JSON.stringify(formData),
      success: function() {
        console.log('Successfully posted');
      },
      error: function(e) {
        console.log('Error: ', e);
      }
    });

  // user toggles light off
  } else {
    console.log('Toggle Off');

    var formData = {
      name: $(this).attr('name'),
      lightIsOn: false
    }

    console.log(formData);

    $.ajax({
      type: 'POST',
      url: '/set-lights',
      contentType: 'application/json',
      dataType: 'text',
      data: JSON.stringify(formData),
      success: function() {
        console.log('Successfully posted');
      },
      error: function(e) {
        console.log("Error: ", e);
      }
    });
  }
});

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

function toggleGroup() {
  $('.ui.toggle').checkbox();
}
