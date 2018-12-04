setActivePage('nav_indiv');

checkbox = $('.ui.toggle').checkbox();

console.log(checkbox);

// update the database when someone clicks a toggle checkbox
$('.ui.toggle').click(function() {
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
      dataType: 'json',
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

    $.ajax({
      type: 'POST',
      url: '/set-lights',
      contentType: 'application/json',
      dataType: 'json',
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

// Show popup when button is hovered over
$('.button').popup();

$('.ui.button').click(function() {
  $('.ui.modal').modal('show');
});
