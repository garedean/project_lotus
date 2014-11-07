var navClosed               = false,
    multiMenuClosed         = true,
    glanceMenuClosed        = true,
    nextEventReady          = true,
    pinNav                  = true,
    expandSpeed             = 400,
    collapseSpeed           = 400,
    easingFunction          = 'easeOutCirc',
    currentlySelectedLink   = '',
    pageState               = '',
    pinNavCheckbox          = $('#pin-nav'),
    currentPageTitle        = 'Dashboard',
    openSubmenuOnLoad       = false;

$(document).ready(function() {

    // Retrieve last page state from local storage. If first page load, 
    // value is null: page will open with default 'nav open' layout
    pageState = localStorage.getItem('page-state');

    if(pageState) {
        // Set newly loaded page to the previous panel layout
        $('#main-content').removeClass().addClass(pageState);

        // On page load, assign nav  menu collapsed class
        if(pageState == 'left' || pageState == 'maximized') {
            $('#nav-menu').addClass('collapsed');
            navClosed = true;
        }
    }

    // Set nav menu link states and highlighting
    setNavigation();

    var staffNotes = $('#staff-notes');

    // Dashboard: when user clicks out of staff notes, set localstorage variable
    staffNotes.blur(function() {
        localStorage.setItem('staff-notes', this.innerHTML);
    });
    // Dashboard: when the page loads
    if(localStorage.getItem('staff-notes')) {
        staffNotes.html(localStorage.getItem('staff-notes'));
    }

    // Sidebar loads as pinned. No action unless user
    // manually opens or close the sidebar
    if(pinNav) {
        $('#nav-pin').toggleClass('selected'); 
    }

    $('#staff-name-wrapper').click('click', function() {
        $(this).find('.dropdown').toggle();
    });

    // Clicking on the cart icon causes nav 
    // and cart panels to show or hide 
    $('.multi-menu-icon-wrapper').on('click', function() {

        // Nav shown, cart closed
        if(!navClosed && multiMenuClosed) {
            slideMainContent('left');
            navClosed = true;
        }
        // Nav shown, cart shown
        else if(!navClosed && !multiMenuClosed) {
            slideMainContent('right');
            navClosed = false;
        }
        // Nav closed, cart closed
        else if(navClosed && multiMenuClosed) {
            slideMainContent('left');
            navClosed = true;
        }
         // Nav closed, cart open
        else if(navClosed && !multiMenuClosed) {
            if(keepNavClosed) {
                slideMainContent('maximized');
                navClosed = true;
            }
            else {
                slideMainContent('right');
                navClosed = false;      
            }
        }
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

        $('.nav-link.has-sub').removeClass('down-arrow');

     });

    $('.page-title').text(currentPageTitle);

    $('.nav-link').on('click', function() {      

        if($(this).hasClass('has-sub')) {
            $(this).addClass('open');

            if(!navClosed) {
                $('.nav-link.has-sub').not(this).removeClass('open')
                    .find('ul').slideUp({duration:collapseSpeed, 
                        easing:easingFunction});

                $(this).find('ul').slideDown({duration:expandSpeed, 
                    easing:easingFunction});
            }

            // If nav link with sub is clicked, change left 
            // arrow to a down arrow
            if( $(this).hasClass('has-sub') ) {
                $(this).addClass('down-arrow');
            }
        }
        else {
            if(!navClosed) {
                 $('.nav-link.has-sub.open').removeClass('open')
                    .find('ul').slideUp({duration:collapseSpeed, 
                        easing:easingFunction});
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
    $('.nav-toggle').on('click', function() { 

        // Nav shown, glance menu closed
        if(!navClosed && glanceMenuClosed) {
            alert('1');
            slideMainContent('maximized');
        }
        // Nav shown, glance menu shown
        else if(!navClosed && !glanceMenuClosed) {
            alert('2');
            slideMainContent('left');
        }
        // Nav closed, glance menu closed
        else if(navClosed && multiMenuClosed) {
            alert('3');
            slideMainContent('right');
        }
         // Nav closed, glance menu open
        else if(navClosed && !multiMenuClosed) {
            alert('4');
            slideMainContent('middle');
        }
    });

    $('#multi-tabs li').on('click', function() {
        $('#multi-tabs li').not(this).removeClass('selected');
        $(this).addClass('selected');
          
        if($(this).hasClass('schedule-tab')) {
            $('#multi-content-wrapper .schedule').addClass('active');
            $('#multi-content-wrapper .checkout').removeClass('active');
        }
        else {
            $('#multi-content-wrapper .checkout').addClass('active');
            $('#multi-content-wrapper .schedule').removeClass('active');
        }
    });

    $('.glance-menu-icon-wrapper, #glance-menu .close').on('click', function() {
        if(glanceMenuClosed) {
            slideMainContent('middle');
        }
        else {
            slideMainContent('right');
        }  
        glanceMenuClosed = !glanceMenuClosed;      
    });

    $('.checkout-icon').on('click', function() {
        $('#checkout-wrapper').addClass('active');  
        $('#checkout-wrapper .backdrop').fadeIn(600);    
        $('#checkout-panel').animate({
            right: 0
        }, 650, 'easeOutExpo', function() {
            $('#checkout-wrapper').addClass('animation-complete');  
        }); 
    });

    $('body').on('click', function() {
        if($('#checkout-wrapper').hasClass('animation-complete')) {
            $('#checkout-wrapper .backdrop').fadeOut(600); 

            $('#checkout-panel').animate({
                right: '-30%'
            }, 300, 'easeInCubic', function() {
                $('#checkout-wrapper').removeClass('active animation-complete'); 
            });  
        }    
    });

    // If pinNav is false, opens/closes sidebar when cursor
    // is within 50 pixels of the sidebar leading edge
    openCloseNav();
});

// Calculates x-axis distance to the #nav-menu sidebar. When the cursor
// gets within 50 pixels of the sidebar right-side, the navbar opens or 
// closes. The goal is to anticipate the user's action
function openCloseNav() {
    var mX, mY, distanceToTarget,
        $distanceToTarget = $('.menu-debugging .distance-from-target'),
        $element = $('#nav-menu');

    function calculatedistanceToTarget(elem, mouseX) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width())), 2)));
    }

    $(document).mousemove(function(e) {
        mX = e.pageX;

        distanceToTarget = calculatedistanceToTarget($element, mX);
        if (distanceToTarget < 50 && nextEventReady && !pinNav) {
            nextEventReady = false;
            navClosed = !navClosed;
            $('#nav-menu').toggleClass('collapsed');           

            $('.nav-toggle').toggleClass('fa-angle-left')
            .toggleClass('fa-angle-right');

            $('.nav-link.has-sub.active').find('ul').show();

            $('.collapsed .sub-links:visible').hide();
            $('#main-content').toggleClass('expanded');
        }

        if (distanceToTarget > 50) {
            nextEventReady = true;
        }

        $distanceToTarget.text("Distance to nav: " + distanceToTarget);
        
        updateDebugInfo();
    });
};

function setNavigation() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);

    $(".nav-link a").each(function () {
        var href = $(this).attr('href');
        if (path.substring(0, href.length) === href) {
            $(this).closest('li').addClass('active');
            $(this).closest(".nav-link").addClass('active');

            // If a nav submenu is currently visible when a submenu link is
            // clicked, open it when the page reloads
            if($(this).closest(".nav-link").hasClass('has-sub') && !navClosed) {
                $(this).closest('ul.sub-links').show();
            }  
            
            $('.nav-link.has-sub.active').addClass('open down-arrow');              
        }
    });

    if(navClosed && openSubmenuOnLoad) {
        $('#nav-menu.collapsed .nav-link.active .sub-links').addClass('hover');     
    }
}

function updateDebugInfo() {     
        $('.nav-menu-state').html('Nav-Menu Open? ' + navClosed.toString().toUpperCase());
        $('.currently-selected-link').html('Current Page: ' + currentlySelectedLink);
        $('.next-event-ready').html('Next event ready: ' + nextEventReady.toString().toUpperCase());
}

function slideMainContent(orientation) {  
    var marginLeftVal, 
        marginRightVal,
        orientationClass;

    switch(orientation) {

        case 'left':
            orientationClass    = 'shift-left';
            marginLeftVal       = '50px';
            marginRightVal      = '220px';
            navClosed           = true;    

            multiMenuIconDirection('right');
            collapseNavMenus();

            break;

        case 'right':
            orientationClass    = 'shift-right';
            marginLeftVal       = '240px';
            marginRightVal      = '0';
            navClosed           = false;

            $('#nav-menu').removeClass('collapsed');
            multiMenuIconDirection('left');
            expandNavMenus();

            break;

        case 'middle':
            orientationClass    = 'middle';
            marginLeftVal       = '240px';
            marginRightVal      = '220px';
            navClosed           = false;

            $('#nav-menu').removeClass('collapsed');
            multiMenuIconDirection('left');
            expandNavMenus();

            break;

            case 'maximized':
            orientationClass    = 'maximized';
            marginLeftVal       = '50px';
            marginRightVal      = '0px';
            navClosed           = true;    

            multiMenuIconDirection('right');
            collapseNavMenus();

            break;
    }

    $('#main-content').animate(
        {
            marginLeft:     marginLeftVal,
            marginRight:    marginRightVal
        }, 

        expandSpeed, easingFunction, function() {

            // Set orientation in local storage for use on page loads
            localStorage.setItem('page-state', orientationClass);

            // Before adding a new class to #main-content, 
            // remove the current class assignment
            $('#main-content').removeClass();

            // When the animation is comlete, add new class assignment to main content
            $('#main-content').addClass(orientationClass);

            if(orientation == 'left' || orientation == 'maximized') {
                $('#nav-menu').addClass('collapsed');
            }
        });
}

function multiMenuIconDirection(direction) {

    $('.multi-menu-icon-wrapper i').removeClass();

    switch(direction) {

        case 'left':
            $('.multi-menu-icon-wrapper i').addClass('fa fa-angle-left fa-2x');
            break;
        case 'right':
            $('.multi-menu-icon-wrapper i').addClass('fa fa-angle-right fa-2x');
            break;
    }
}

function collapseNavMenus() {
    $('#nav-menu .nav-link.has-sub.open').find('ul').slideUp(
        {duration:collapseSpeed, easing:easingFunction});
}

function expandNavMenus() {
    $('#nav-menu .nav-link.has-sub.open').find('ul').slideDown(
        {duration:expandSpeed, easing:easingFunction});
/*    $('#nav-menu .nav-link.has-sub.active').find('ul').slideDown(
        {duration:expandSpeed, easing:easingFunction});*/
}

