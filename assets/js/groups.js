setActivePage('nav_groups');

$('.ui.accordion')
  .accordion()
;

$('.ui.accordion').accordion({
  selector: {
    trigger: '.title .qus_label'
  }
});