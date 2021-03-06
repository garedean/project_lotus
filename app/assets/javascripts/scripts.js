var navClosed = false,
  multiMenuClosed = true,
  glanceMenuClosed = true,
  nextEventReady = true,
  pinNav = true,
  transitionSpeed = 700,
  easingFunction = 'easeOutQuart',
  currentlySelectedLink = '',
  pageState = '',
  pinNavCheckbox = $('#pin-nav'),
  currentPageTitle = 'Dashboard',
  staffNotes = $('#staff-notes'),
  openSubmenuOnLoad = false;

$(document).ready(function() {

  initiateNavToggle();

  // Set nav menu active link states, page titles
  setNavigation();

  // Nav submenus must be moved out of view on page load using
  // negative top-margins. Also controls active submenus showing
  // as open/closed when page loads or nav toggle is used
  setSubmenuStyles();

  // Dashboard: when user clicks out of staff notes, set localstorage variable
  staffNotes.blur(function() {
    localStorage.setItem('staff-notes', this.innerHTML);
  });
  // Dashboard: when the page loads
  if (localStorage.getItem('staff-notes')) {
    staffNotes.html(localStorage.getItem('staff-notes'));
  }

  // Sidebar loads as pinned. No action unless user
  // manually opens or close the sidebar
  if (pinNav) {
    $('#nav-pin').toggleClass('selected');
  }

  $('#staff-name-wrapper').click('click', function(e) {
    e.stopPropagation();
    $(this).find('.dropdown').toggle();
  });

  $('#nav-menu.collapsed .sub-links a').on('click', function() {
    openSubmenuOnLoad = true;
  });

  $('#nav-menu.collapsed .nav-link.active .sub-links').on('mouseleave', function() {
    $(this).removeClass('hover');
    openSubmenuOnLoad = false;
  });

  $('.nav-link a').on('click', function() {

    // Page title changes instaneously on user click
    $('.page-title').text(
      currentPageTitle = $(this).data('display-title')
    );

    $('.nav-link.active').removeClass('active');
    $(this).closest('.nav-link').addClass('active');
  });

  $('a.logout-link').click(function() {
    hopscotch.endTour([true]);
    localStorage.removeItem('page-state');
  });

  $('.page-title').text(currentPageTitle);


  $('.nav-link').on('click', function() {

    // If nav is open and the item clicked on is not
    // the currently open menu
    if (!navClosed && !$(this).hasClass('view-contents')) {

      if ($(this).hasClass('has-sub')) {
        collapseOpenSubmenus();
      }

      if ($(this).hasClass('has-sub')) {

        // For menu item just clicked, slide menu items down
        $(this).addClass('view-contents').find('.sub-links').animate({
            marginTop: "0px"
          },
          transitionSpeed, easingFunction
        );

        // If nav link with sub is clicked, change left
        // arrow to a down arrow
        if ($(this).hasClass('has-sub')) {
          $(this).addClass('down-arrow');
        }
      }
    }
  });

  // Clicking on a sublink item assigns it an 'active' class
  $('.sub-links').find('li').on('click', function() {

    $(this).addClass('active');

    $('.sub-links').find('li').not(this).removeClass('active');

  });

  // Sidebar enters 'auto open/close' mode
  $('#nav-pin').on('click', function() {
    pinNav = !pinNav;
    $(this).toggleClass('selected');
    $('.nav-toggle').toggle();
  });

  // Sidebar open + close functionality
  $('.material-design-hamburger').on('click', function() {

    // Nav closed, open it
    if (navClosed) {
      setNavMenu('nav-open');
    }
    // Nav open, close it
    else {
      setNavMenu('nav-closed');
    }
  });

  $('#multi-tabs li').on('click', function() {
    $('#multi-tabs li').not(this).removeClass('selected');
    $(this).addClass('selected');

    if ($(this).hasClass('schedule-tab')) {
      $('#multi-content-wrapper .schedule').addClass('active');
      $('#multi-content-wrapper .checkout').removeClass('active');
    } else {
      $('#multi-content-wrapper .checkout').addClass('active');
      $('#multi-content-wrapper .schedule').removeClass('active');
    }
  });

  $('.checkout-icon').on('click', function() {
    $('#checkout-wrapper').addClass('active');
    $('#checkout-wrapper .backdrop').fadeIn(700, 'easeOutExpo');
    $('#checkout-panel').animate({
      right: 0
    }, 700, 'easeOutExpo', function() {
      $('#checkout-wrapper').addClass('animation-complete');
    });
  });

  $('body, .collapse-panel-arrow').on('click', function(e) {
    if ($('#checkout-wrapper').hasClass('animation-complete')) {

      $('#checkout-wrapper .backdrop').fadeOut(500, 'easeInCubic');

      $('#checkout-panel').animate({
        right: (-1 * $('#checkout-panel').width()).toString() + 'px'
      }, 500, 'easeInCubic', function() {
        $('#checkout-wrapper').removeClass('active animation-complete');
      });
    }

    $('#staff-name-wrapper .dropdown').hide();
  });

  $('#nav-menu .sub-links').hover(function() {
    if (navClosed) {
      $(this).closest('.nav-link').not('.active')
        .find('.menu-link').toggleClass('hover');
    }
  });

  $('.glance-schedule-icon, .glance-view-toggle').on('click', function() {
    $('#main-content .content-frame-wrapper').toggleClass('glance-view-visible');
    $('#glance-menu').toggleClass('open');
    //$('.glance-schedule-icon').toggleClass('active');
  });

  // Prevent clicks originating in #checkout-panel from
  // reaching body element and closing the panel
  $('#checkout-panel').on('click', function(e) {
    e.stopPropagation();
  });

  // The load class is used to prevent CSS animations
  // from firing on page load
  setTimeout(function() {
    $('body').removeClass("load");
  }, 400);
});

function setNavigation() {
  var path = window.location.pathname;
  path = path.replace(/\/$/, "");
  path = decodeURIComponent(path);

  $(".nav-link a").each(function() {
    var href = $(this).attr('href');
    if (path.substring(0, href.length) === href) {
      $(this).closest('li').addClass('active');
      $(this).closest(".nav-link").addClass('active');

      // If a nav submenu is currently visible when a submenu link is
      // clicked, open it when the page reloads
      if ($(this).closest(".nav-link").hasClass('has-sub') && !navClosed) {
        $(this).closest('ul.sub-links').show();
      }

      if (navClosed) {
        $('.nav-link.has-sub.active').addClass('down-arrow');
      } else {
        $('.nav-link.has-sub.active').addClass('view-contents down-arrow');
      }
    }
  });

  if (navClosed && openSubmenuOnLoad) {
    $('#nav-menu.collapsed .nav-link.has-sub.active .sub-links').addClass('hover');
  }
}

function updateDebugInfo() {
  $('.nav-menu-state').html('Nav-Menu Open? ' + navClosed.toString().toUpperCase());
  $('.currently-selected-link').html('Current Page: ' + currentlySelectedLink);
  $('.next-event-ready').html('Next event ready: ' + nextEventReady.toString().toUpperCase());
}

function setNavMenu(orientation) {
  var marginLeftVal;

  switch (orientation) {

    case 'nav-closed':
      marginLeftVal = '50px';
      navClosed = true;
      collapseOpenSubmenus();

      break;

    case 'nav-open':
      marginLeftVal = '240px';
      navClosed = false;

      $('#nav-menu').removeClass('collapsed');
      expandOpenSubmenus();

      break;
  }

  $('#main-content').animate({
      marginLeft: marginLeftVal
    },

    transitionSpeed, easingFunction,
    function() {

      // Set orientation in local storage for use on page loads
      localStorage.setItem('page-state', orientation);

      // Before adding a new class to #main-content,
      // remove the current class assignment
      $('#main-content').removeClass();

      // When the animation is comlete, add new class assignment to main content
      $('#main-content').addClass(orientation);

      // Runs *after* the animation is fully complete
      if (orientation == 'nav-closed') {
        $('#nav-menu').addClass('collapsed');
        setSubmenuStyles();
      } else {
        $('.nav-link.has-sub.active').addClass('view-contents down-arrow');
      }
    });

  // The purpose of changing the width of the nav menu and
  // not covering it up is to change the width of the section
  // dividing lines and retain left and right margin
  $('#nav-menu').animate({
    width: marginLeftVal
  }, transitionSpeed, easingFunction);

  // Runs when animation first starts
  if (orientation == 'nav-open') {
    setSubmenuStyles();
  }
}

function collapseOpenSubmenus() {

  var openMenu = $('.nav-link.has-sub.view-contents');

  // Slide other expanded menus up
  openMenu.find('ul').animate({
      marginTop: (-1 * openMenu.find('.sub-links').height()).toString() + "px"
    },
    transitionSpeed, easingFunction
  ).closest('.nav-link').removeClass('view-contents down-arrow');
}

function expandOpenSubmenus() {

  setSubmenuStyles();

  $('.nav-link.has-sub.active').find('.sub-links').animate({
      marginTop: '0px'
    },
    transitionSpeed, easingFunction
  );
}

function setSubmenuStyles() {

  var elements = $('.nav-link.has-sub .sub-links');

  // At page load, set negative top margins on all Nav menu
  // ul elements, hiding those menus until activated
  if (!navClosed) {
    $.each(elements, function(i, o) {
      $(o).css("margin-top", (-1 * $(this).height()).toString() + 'px');
    });

    $('.nav-link.view-contents').find('.sub-links').css("margin-top", '0px');
  } else {
    $.each(elements, function(i, o) {
      $(o).css("margin-top", '0px');
    });
  }
}

function initiateNavToggle() {
  'use strict';

  var icon = $('.material-design-hamburger__icon');

  icon.on('click', function() {

    var child = icon.children();

    if (!navClosed) {
      child.removeClass('material-design-hamburger__icon--to-arrow');
      child.addClass('material-design-hamburger__icon--from-arrow');
    } else {
      child.removeClass('material-design-hamburger__icon--from-arrow');
      child.addClass('material-design-hamburger__icon--to-arrow');
    }
  });
}
