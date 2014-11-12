var navClosed               = false,
    multiMenuClosed         = true,
    glanceMenuClosed        = true,
    nextEventReady          = true,
    pinNav                  = true,
    transitionSpeed         = 600,
    easingFunction          = 'easeOutQuart',
    currentlySelectedLink   = '',
    pageState               = '',
    pinNavCheckbox          = $('#pin-nav'),
    currentPageTitle        = 'Dashboard',
    staffNotes              = $('#staff-notes'),
    openSubmenuOnLoad       = false;

$(document).ready(function() {

    // Retrieve last page state from local storage
    pageState = localStorage.getItem('page-state');

    // If pageState, add the page state as a class to #main-content
    // If pageState is null, the page will open with nav menu open
    if(pageState) {
        $('#main-content').removeClass().addClass(pageState);

        // On page load, assign nav menu states
        if(pageState == 'nav-closed') {
            $('#nav-menu').addClass('collapsed');
            navClosed = true;
        }
    }

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

        // If nav is open and the item clicked on is not 
        // the currently open menu
        if(!navClosed && !$(this).hasClass('view-contents')) {

            collapseOpenSubmenus();

            if($(this).hasClass('has-sub')) { 

                // For menu item just clicked, slide menu items down
                $(this).addClass('view-contents').find('.sub-links').animate(
                    { marginTop: "0px" }, 
                    transitionSpeed, easingFunction
                );               
                

                // If nav link with sub is clicked, change left 
                // arrow to a down arrow
                if( $(this).hasClass('has-sub') ) {
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
    $('.nav-toggle').on('click', function() { 

        // Nav closed, open it
        if(navClosed) {
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
          
        if($(this).hasClass('schedule-tab')) {
            $('#multi-content-wrapper .schedule').addClass('active');
            $('#multi-content-wrapper .checkout').removeClass('active');
        }
        else {
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

    $('body, .collapse-panel-arrow').on('click', function() {
        if($('#checkout-wrapper').hasClass('animation-complete')) {

            $('#checkout-wrapper .backdrop').fadeOut(500, 'easeInCubic'); 

            $('#checkout-panel').animate({
                right: (-1 * $('#checkout-panel').width()).toString() + 'px'
            }, 500, 'easeInCubic', function() {
                $('#checkout-wrapper').removeClass('active animation-complete'); 
            });  
        }    
    });

    $('.glance-schedule-icon').on('click', function() {
        $('#main-content .content-frame-wrapper').toggleClass('glance-view-visible');
        $('.glance-schedule-icon').toggleClass('active');
    });

    // Prevent clicks originating in #checkout-panel from
    // reaching body element and closing the panel
    $('#checkout-panel').on('click', function(e) {
        e.stopPropagation();
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
            
            $('.nav-link.has-sub.active').addClass('view-contents down-arrow');              
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

function setNavMenu(orientation) {  
    var marginLeftVal;

    switch(orientation) {

        case 'nav-closed':
            marginLeftVal       = '50px';
            navClosed           = true; 
            collapseOpenSubmenus();

            break;

        case 'nav-open':
            marginLeftVal       = '240px';
            navClosed           = false;

            $('#nav-menu').removeClass('collapsed');
            expandOpenSubmenus();

            break;
    }

    $('#main-content').animate(
        {
            marginLeft:     marginLeftVal
        }, 

        transitionSpeed, easingFunction, function() {

            // Set orientation in local storage for use on page loads
            localStorage.setItem('page-state', orientation);

            // Before adding a new class to #main-content, 
            // remove the current class assignment
            $('#main-content').removeClass();

            // When the animation is comlete, add new class assignment to main content
            $('#main-content').addClass(orientation);

            // Runs *after* the animation is fully complete
            if(orientation == 'nav-closed') {
                $('#nav-menu').addClass('collapsed');
                setSubmenuStyles();
            }
        });

        // The sole purpose of changing the width of the nav menu and
        // not covering it up is to change the width of the section 
        // dividing lines
        $('#nav-menu').animate(
        {
            width: marginLeftVal
        }, transitionSpeed, easingFunction);

    // Runs when animation first starts
    if(orientation == 'nav-open'){
        setSubmenuStyles();
    }
}

function collapseOpenSubmenus() {

    var openMenu       = $('.nav-link.has-sub.view-contents'),
        activeMenu     = $('.nav-link.has-sub.active');

    // Slide other expanded menus up
    openMenu.find('ul').animate(
            {
                marginTop: 
                (-1 * openMenu.find('.sub-links').height()).toString() + "px"                        
            }, 
                transitionSpeed, easingFunction
        ).closest('.nav-link').removeClass('view-contents');

    // Slide other expanded menus up
    activeMenu.find('ul').animate(
            {
                marginTop: 
                (-1 * activeMenu.find('.sub-links').height()).toString() + "px"                        
            }, 
                transitionSpeed, easingFunction
        ).closest('.nav-link');
}

function expandOpenSubmenus() {

    setSubmenuStyles();

    $('.nav-link.has-sub.active').find('.sub-links').animate(
            {
                marginTop: '0px'                        
            }, 
                transitionSpeed, easingFunction
    );
}

function setSubmenuStyles() {
    //alert('setSubmenuStyles');

    var elements = $('.nav-link.has-sub .sub-links');

    // At page load, set negative top margins on all Nav menu
    // ul elements, hiding those menus until activated
    if(!navClosed) { 
        $.each(elements, function(i, o){
            $(o).css("margin-top", (-1 * $(this).height()).toString() + 'px');

            if($(this).closest('.nav-link').hasClass('view-contents')) {
                $(this).css("margin-top", '0px');
            }
        });
    }
    else {
        $.each(elements, function(i, o){
            $(o).css("margin-top", '0px');
        }); 
    }
}