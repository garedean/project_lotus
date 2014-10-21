var navExpanded             = true,
    nextEventReady          = true,
    pinNav                  = true,
	currentlySelectedLink   = '',
    pinNavCheckbox          = $('#pin-nav'),
    keepNavDocked           = false,
    clientLookupExpanded    = false;

$(document).ready(function() {
    
    // Default sidebar upon load is set to 'pinned'
    if(pinNav) {
        $('#nav-pin').toggleClass('selected'); 
    }

    // Initiate method that determines whether the cursor
    // is withing 50 pixels of the sidebar menu, and if so,
    // opens or closes sidebar. Action only when pinNav = false
    openCloseNav();
    updateDebugInfo();

    $('#staff-name, #staff-initials').on('click', function() {
        //alert($(this).closest('.brand-tile').find('.dropdown').length);
        $(this).closest('.brand-tile').find('.dropdown').show();
        //alert($(this).closest('.brand-tile').find('.dropdown').length);
    });  

    // Clicking the client lookup icon causes lookup
    // field to fade in
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
      // Staff member dropdown
      if (!$(event.target).closest('#staff-name, #staff-initials').length &&
          !$(event.target).closest('.brand-tile .dropdown').length) {
            $('.brand-tile .dropdown').hide();
      }
    });

    // Clicking in the header when the lookup is closed
    // causes it to open
/*    $('header').on('click', function(event) {
        if(!clientLookupExpanded && !$(event.target).closest('.cart-icon').length) {
            $('.client-lookup-wrapper input').fadeIn(100);
            clientLookupExpanded = !clientLookupExpanded;
        }
    });*/

    $('.cart-icon').on('click', function() {

        $('#cart-slider').toggleClass('expanded');
        $('#main-content').toggleClass('cart-expanded');     

        if(!keepNavDocked) {
            $('#nav-menu').toggleClass('collapsed');
            $('.collapsed .sub-links:visible').hide();
            $('#main-content').toggleClass('expanded');

            $('.nav-toggle').toggleClass('fa-angle-left')
            .toggleClass('fa-angle-right');

            if(!navExpanded) {
                $('.nav-link.has-sub.active').find('ul').hide();
            }
            if(navExpanded) {
                $('.nav-link.has-sub.active').find('ul').show();
            }   

            $('.collapsed .sub-links:visible').hide();
        }
       
    });

    $('.nav-link').on('click', function() {

        $(this).addClass('active'); 

        if(navExpanded) {
            $('.nav-link.has-sub.active').find('ul').slideDown(90);
            $('.nav-link').not(this).find('ul').slideUp(90);
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

    $('.sub-links').find('li').on('click', function() {

        $(this).addClass('active'); 

        $('.sub-links').find('li').not(this).removeClass('active');               

    });

    $('#nav-pin').on('click', function() {      
            pinNav = !pinNav;   
            $(this).toggleClass('selected'); 
            $('.nav-toggle').toggle();   
    });

    $('.nav-toggle').on('click', function() {  
            navExpanded = !navExpanded;
            keepNavDocked = !keepNavDocked;

            if($('#nav-menu').hasClass('collapsed') && $('#cart-slider').hasClass('expanded')) {
                $('#cart-slider').toggleClass('expanded');
                $('#main-content').toggleClass('cart-expanded');  
                //$('#body-wrapper').toggleClass('cart-open');
            }

            $('#nav-menu').toggleClass('collapsed');

            if(!navExpanded) {
                $('.nav-link.has-sub.active').find('ul').hide();
            }
            if(navExpanded) {
                $('.nav-link.has-sub.active').find('ul').show();
            }          
             
            $(this).toggleClass('fa-angle-left')
            .toggleClass('fa-angle-right');
            
            $('.collapsed .sub-links:visible').hide();
            $('#main-content').toggleClass('expanded');
            $('#lower-wrapper').toggleClass('nav-collapsed');            
    });
});

// Calculates x-axis distance to the #nav-menu sidebar. When the cursor
// gets within 50 pixels of the sidebar right-side, the navbar opens or 
// closes. Purpose: anticipate desired action for ease of use 
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