setActivePage('nav_indiv');

$('.ui.toggle').checkbox();

$('.ui.toggle').click(function() {
  if ($('.ui.toggle').checkbox('is checked')) {
    console.log('Toggle On');
  } else {
    console.log('Toggle Off');
  }
});
