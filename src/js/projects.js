import $ from 'jquery';

$(function() {

  var projects = $('#projects .list .project-single .project-inner');

  projects.click(function(e) {
    var thisProject = $(this).closest('.project-single');
    console.log(thisProject);

    if (thisProject.hasClass('is-collapsed')) {
      $('.project-single').not(thisProject).removeClass('is-expanded').addClass('is-collapsed');
      thisProject.removeClass('is-collapsed').addClass('is-expanded');
    } else {
      thisProject.removeClass('is-expanded').addClass('is-collapsed');
    }
  })

})