import $ from 'jquery';

console.log('bundle js loaded');

$(function() {

  $('.magic-button').css({height: '100%'});

  function menuClose() {
    $('ul.menu-list li').animate({
      maxHeight: '0px'
    }, {
    duration: 500, 
    complete: function() {
      $('ul.menu-list .magic-button').removeClass('unarrow').addClass('arrow');
    }
    });
  }

  $(document).click(function(e) {
    if ($(e.target).hasClass('arrow')) {
      menuOpen(false);
    }
  })

  function menuOpen(top) {
    console.log('open');
    $('ul.menu-list li').animate({
      maxHeight: '200px'
    }, {
      duration: 500,
      complete: function() {
      }
    });
    $('div.magic-button').removeClass('arrow').addClass('unarrow');

    // $(document).click(function(e) {
    //   if (e.target.id === 'menu' || $(e.target).closest('#menu').length) {
    //     return;
    //   } else if (top) {
    //     return;
    //   }
    //   menuClose();
    // })
  }

  $('ul li a[href^="#"]').on('click', function(event) {
    var hash = '#' + $(this).attr('href').split('#')[1];
    var element = $(hash);
    if (element.length) {
      event.preventDefault();
      var top = element.offset().top;
      $('html, body').animate({scrollTop: top}, 500);   
    }

    menuClose();
  });

  var currentScroll = 0;

  $(window).scroll(function() {
    var newScroll = $(window).scrollTop();
    var windowHeight = $(window).height(); 
    var menuThreshold = windowHeight * .5;   

    if (newScroll >= (windowHeight)) {
      $('ul.menu-list').addClass('scrolled');
    }

    if (newScroll < (windowHeight)) {
      $('ul.menu-list').removeClass('scrolled');
    }

    if (currentScroll < menuThreshold && newScroll >= menuThreshold) {
      menuClose();
    }

    if (currentScroll > menuThreshold && newScroll < menuThreshold) {
      menuOpen(true);
    }

    currentScroll = newScroll;
  })

})