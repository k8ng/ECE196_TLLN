setActivePage('nav_indiv');

checkbox = $('.ui.toggle').checkbox();

console.log(checkbox);

$('.ui.toggle').click(function() {
  if ($(this).checkbox('is checked')) {
    console.log('Toggle On');
  } else {
    console.log('Toggle Off');
  }
});
