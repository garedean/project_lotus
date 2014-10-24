var navExpanded             = true,
    nextEventReady          = true,
    pinNav                  = true,
	currentlySelectedLink   = '',
    pinNavCheckbox          = $('#pin-nav'),
    keepNavClosed           = false,
    clientLookupExpanded    = false;

$(document).ready(function() {

    setNavigation();

    // Sidebar loads as pinned. No action unless user
    // manually opens or close the sidebar
    if(pinNav) {
        $('#nav-pin').toggleClass('selected'); 
    }

    // If pinNav is false, opens/closes sidebar when cursor
    // is within 50 pixels of the sidebar leading edge
    openCloseNav();

    // Clicking the client lookup icon causes the input
    // field to fade in, ready for user input
    $('.client-lookup-icon').on('click', function() {
        $('.client-lookup-wrapper input').fadeIn(100).focus();

        clientLookupExpanded = !clientLookupExpanded;
    });  

    // Clicking outside of a targeted element closes that element
    $(document).on('click', function(event) {
        
      // Client lookup field
      if (!$(event.target).closest('.client-lookup-wrapper').length) {
        $('.client-lookup').fadeOut(100);
      }
    });

    // Clicking on the cart icon causes the checkout panel to show/hide
    $('.cart-icon').on('click', function() {

        $('#cart-slider').toggleClass('expanded');
        $('#main-content').toggleClass('cart-expanded');     

        // keepNavClosed is true when the user closes the 
        // sidebar from an expanded state
        if(!keepNavClosed) {
            navExpanded = !navExpanded;

            $('#nav-menu').toggleClass('collapsed');
            $('#main-content').toggleClass('expanded');
            $('.collapsed .sub-links:visible').hide();

            $('.nav-toggle').toggleClass('fa-angle-left')
            .toggleClass('fa-angle-right');

            // Hides/collapses active sidebar menus going from open to closed
            // Shows/expands active sidebar menus going from closed to open
            if(!navExpanded) {
                $('.nav-link.has-sub.active').find('ul').hide();
            }
            else {
                $('.nav-link.has-sub.active').find('ul').show();
            }   

            //$('.collapsed .sub-links:visible').hide();
        }
       
    });
    
    // Controls vertical nav sidebar links and expanding submenus
    $('.nav-link').on('click', function() {

        $(this).addClass('active'); 

        if(navExpanded) {
            $('.nav-link.has-sub.active').find('ul').slideDown(300);
            $('.nav-link').not(this).find('ul').slideUp(300);
        }

        $('.nav-link').not(this).removeClass('active')
        .removeClass('expanded');   

        $('.nav-link').not(this).find('.sub-links')
        .find('li.active').removeClass('active');               

        nextEventReady = true; 
        currentlySelectedLink = $(this).text();

        if( $(this).hasClass('has-sub') ) {
            $(this).addClass('down-arrow');
        }
        $('.nav-link').not(this).removeClass('down-arrow');

        updateDebugInfo();
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
            navExpanded = !navExpanded;

            if( !$('#nav-menu').hasClass('collapsed')) {
                keepNavClosed = true;
            }
            else {
                keepNavClosed = false;
            }

            if($('#nav-menu').hasClass('collapsed') && $('#cart-slider').hasClass('expanded')) {
                $('#cart-slider').toggleClass('expanded');
                $('#main-content').toggleClass('cart-expanded');  
            }

            $('#nav-menu').toggleClass('collapsed');

            if(!navExpanded) {
                $('.nav-link.has-sub.active').find('ul').hide();
            }
            else {
                $('.nav-link.has-sub.active').find('ul').show();
            }          
            
            // Font awesome arrow orientation
            $(this).toggleClass('fa-angle-left')
            .toggleClass('fa-angle-right');
            
            // If a nav menu item is currently expanded, revealing
            // its submenu contents, hide it going from open to close
            $('.collapsed .sub-links:visible').hide();

            // Main content expands or collapses along with sidebar
            $('#main-content').toggleClass('expanded');        
    });
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
            navExpanded = !navExpanded;
            $('#nav-menu').toggleClass('collapsed');           

            $('.nav-toggle').toggleClass('fa-angle-left')
            .toggleClass('fa-angle-right');

            $('.nav-link.has-sub.active').find('ul').show();

            $('.collapsed .sub-links:visible').hide();
            $('#main-content').toggleClass('expanded')
        }

        if (distanceToTarget > 50) {
            nextEventReady = true;
        }
        updateDebugInfo();
        $distanceToTarget.text("Distance to nav: " + distanceToTarget);
    });
};

function updateDebugInfo() {     
        $('.nav-menu-state').html('Nav-Menu Open? ' + navExpanded.toString().toUpperCase());
        $('.currently-selected-link').html('Current Page: ' + currentlySelectedLink);
        $('.next-event-ready').html('Next event ready: ' + nextEventReady.toString().toUpperCase());
}

function setNavigation() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);

    $(".nav-link a").each(function () {
        var href = $(this).attr('href');
        if (path.substring(0, href.length) === href) {
            $(this).closest('.nav-link').addClass('active')
            .find('ul').show();                   
        }
    });
}