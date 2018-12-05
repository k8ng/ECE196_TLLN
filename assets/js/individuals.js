setActivePage('nav_indiv');

checkbox = $('.ui.toggle').checkbox();


// update the database when someone clicks a toggle checkbox
$('.ui.toggle').click(function() {
  // user toggles light on
  if ($(this).checkbox('is checked')) {

    // we don't want to reload the page whenever we post something so we use 
    // an asynchronous jQuery (ajax) to update the database form data
    
    // create the data
    var formData = {
      name: $(this).attr('name'),
      lightIsOn: true
    }


    // make post
    $.ajax({
      type: 'POST',
      url: '/set-lights',
      contentType: 'application/json',
      dataType: 'text',
      data: JSON.stringify(formData),
      success: function() {
      },
      error: function(e) {
      }
    });
    
  // user toggles light off
  } else {

    var formData = {
      name: $(this).attr('name'),
      lightIsOn: false
    }

    $.ajax({
      type: 'POST',
      url: '/set-lights',
      contentType: 'application/json',
      dataType: 'text',
      data: JSON.stringify(formData),
      success: function() {
      },
      error: function(e) {
      }
    });
  }
});

// Show popup when button is hovered over
$('.button').popup();

$('#add-light-button').click(function() {
  $('.ui.modal').modal('show');
});
