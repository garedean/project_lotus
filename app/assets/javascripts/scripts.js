var navClosed               = false,
    cartClosed              = true,
    nextEventReady          = true,
    pinNav                  = true,
    keepNavClosed           = false,
    clientLookupExpanded    = false,
    sectionTransitionSpeed  = 100,
    currentlySelectedLink   = '',
    pageState               = '',
    pinNavCheckbox          = $('#pin-nav'),
    currentPageTitle        = 'Dashboard';

$(document).ready(function() {

    // Retrieve last page state from local storage. If first page load, 
    // value is null: page will open with default 'nav open' layout
    pageState = localStorage.getItem('page-state');

    if(pageState) {
        // Set newly loaded page to the previous panel layout
        $('#main-content').removeClass().addClass(pageState);
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

    // Clicking on the cart icon causes nav 
    // and cart panels to show or hide 
    $('.cart-icon').on('click', function() {

        // Nav shown, cart closed
        if(!navClosed && cartClosed) {
            slideMainContentLeft();
            navClosed = true;
        }
        // Nav shown, cart shown
        else if(!navClosed && !cartClosed) {
            slideMainContentRight();
            navClosed = false;
        }
        // Nav closed, cart closed
        else if(navClosed && cartClosed) {
            slideMainContentLeft();
            navClosed = true;
        }
         // Nav closed, cart open
        else if(navClosed && !cartClosed) {
            if(keepNavClosed) {
                maximizeMainContent();
                navClosed = false;
            }
            else {
                slideMainContentRight();
                navClosed = false;            
            }
        }
    });

    $('.nav-link a').on('click', function() {

        // Page title changes instaneously on user click
        $('.page-title').text(
            currentPageTitle = $(this).data('display-title')
        );

        // Local storage sets page user was one before refresh
        //localStorage.setItem('page-state', $('#main-content').attr('class'));
    });

    $('.page-title').text(currentPageTitle);
    
    // Controls vertical nav sidebar links and expanding submenus
    $('.nav-link').on('click', function() {

        // .nav-link li gets 'active' class 
        $(this).addClass('active');

        if(!navClosed) {
            $('.nav-link.has-sub.active').find('ul').slideDown(300);
            $('.nav-link').not(this).find('ul').slideUp(300);
        }

        // Clicking on a different nav link removes all active
        // classes from that element or submenu li element
        $('.nav-link').not(this).removeClass('active')
        .find('.sub-links li.active').removeClass('active');               

        // If nav link with sub is clicked, change left 
        // arrow to a down arrow
        if( $(this).hasClass('has-sub') ) {
            $(this).addClass('down-arrow');
        }

        // Change sub down arrow back to left arrow when user
        // clicks a different link
        $('.nav-link').not(this).removeClass('down-arrow');

        //nextEventReady = true; 
        //currentlySelectedLink = $(this).text();
        //updateDebugInfo();
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

        // Nav shown, cart closed
        if(!navClosed && cartClosed) {
            maximizeMainContent();
            keepNavClosed = true;
        }
        // Nav shown, cart shown
        else if(!navClosed && !cartClosed) {
            slideMainContentLeft();
            keepNavClosed = true;
        }
        // Nav closed, cart closed
        else if(navClosed && cartClosed) {
            slideMainContentRight();
            keepNavClosed = false;
        }
         // Nav closed, cart open
        else if(navClosed && !cartClosed) {
            slideMainContentRight();
            keepNavClosed = false;
        }

        localStorage.setItem('page-state', $('#main-content').attr('class'));
        navClosed = !navClosed;

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
            $(this).closest(".nav-link").addClass('active')

            if(navClosed) {
                $(this).closest(".nav-link").find('ul').show();  
            }                 
        }
    });

    /*// If nav-menu is closed, retain closed state on page load
    if(navClosed) {
        $('#nav-menu').addClass('collapsed');
        $('#main-content').toggleClass('expanded');
        $('#nav-menu .nav-toggle').removeClass('fa-angle-left')
            .addClass('fa-angle-right');
    }*/
}

function updateDebugInfo() {     
        $('.nav-menu-state').html('Nav-Menu Open? ' + navClosed.toString().toUpperCase());
        $('.currently-selected-link').html('Current Page: ' + currentlySelectedLink);
        $('.next-event-ready').html('Next event ready: ' + nextEventReady.toString().toUpperCase());
}

function toggleNavMenu(thisObj) {
    navClosed = !navClosed;

    // Nav shown, cart closed
    if(!navClosed && cartClosed) {
        alert('1');
        maximizeMainContent;
        keepNavClosed = true;
    }
    // Nav shown, cart shown
    else if(!navClosed && !cartClosed) {
        alert('2');
        slideMainContentLeft;
        keepNavClosed = true;
    }
    // Nav closed, cart closed
    else if(navClosed && cartClosed) {
        alert('3');
        slideMainContentRight;
        keepNavClosed = false;
    }
     // Nav closed, cart open
    else if(navClosed && !cartClosed) {
        alert('4');
        slideMainContentRight;
        keepNavClosed = false;
    }


    /*// Nav menu pushes cart closed to maximize 
    // main content area
    if($('#nav-menu').hasClass('collapsed') && 
       $('#cart-slider').hasClass('expanded')) {
            $('#cart-slider').toggleClass('expanded');
            $('#main-content').toggleClass('cart-expanded');  
    }

    // Nav menu expands/collapses
    $('#nav-menu').toggleClass('collapsed');

    // Main content expands/collapses
    $('#main-content').toggleClass('expanded');

    // If the nav menu shows an expanded menu, collapse the menu
    // going from expanded to collapsed. Expand the menu if the state
    // is going from collapsed to expanded
    if(!navClosed) {
        $('.nav-link.has-sub.active').find('ul').hide();
    }
    else {
        $('.nav-link.has-sub.active').find('ul').show();
    }          
    
    // Nav expanded, nav-toggle arrow points left
    // Nav eollapsed, nav-arrow points right
    thisObj.toggleClass('fa-angle-left')
    .toggleClass('fa-angle-right');
    
    // If a nav menu item is currently expanded, revealing
    // its submenu contents, hide it going from open to close
    $('.collapsed .sub-links:visible').hide();*/
}


function slideMainContentLeft() {      
    $('#main-content').animate({
        marginLeft: '50px',
        marginRight: '400px'
    }, sectionTransitionSpeed, function() {
        cartClosed  = false;
        navClosed   = true;

        $(this).removeClass()
            .addClass('shift-left');

        localStorage.setItem('page-state', 'shift-left');
    });
}

function slideMainContentRight() {
    $('#main-content').animate({
        marginLeft: '240px',
        marginRight: '0'
    }, sectionTransitionSpeed, function() {
        cartClosed  = true;
        navClosed   = false;

        $(this).removeClass()
            .addClass('shift-right');
        localStorage.setItem('page-state', 'shift-right');
    });   
}

function maximizeMainContent() {
    $('#main-content').animate({
        marginLeft: '50px',
        marginRight: '0'
    }, sectionTransitionSpeed, function() {
        cartClosed  = true;
        navClosed   = true;

        $(this).removeClass()
            .addClass('maximized');

        localStorage.setItem('page-state', 'maximized');
    });   
}