var navExpanded             = true,
    nextEventReady          = true,

    pinNav                  = true
	currentlySelectedLink   = ''
    pinNavCheckbox          = $('#pin-nav'); 

$(document).ready(function() {
    
    if(pinNav) {
        $('#nav-pin').toggleClass('selected'); 
    }

    openCloseNav();
    updateDebugInfo();

    $('.nav-link').on('click', function() {

        $(this).addClass('active'); 

        if(navExpanded) {
            $(this).find('ul').show();
            $('.nav-link').not(this).find('ul').hide();
        }

        $('.nav-link').not(this).removeClass('active')
        .removeClass('expanded');   

        $('.nav-link').not(this).find('.sub-links')
        .find('li.active').removeClass('active');               

        nextEventReady = true; 
        currentlySelectedLink = $(this).text();

        if( $(this).hasClass('has-sub') ) {
            $(this).addClass('expanded');
        }

        updateDebugInfo();
    });

    $('.sub-links').find('li').on('click', function() {

        $(this).addClass('active'); 

        $('.sub-links').find('li').not(this).removeClass('active');               

    });

    $('.nav-link').hover(
        function() {
            if(!navExpanded) {
                $(this).find('ul').show();
            }
        },
        function() {
            if(!navExpanded) {
                $(this).find('ul').hide();
            } 
        }
    );

    $('#nav-pin').on('click', function() {      
            pinNav = !pinNav;   
            $(this).toggleClass('selected'); 
            $('.nav-toggle').toggle();   
    });

    $('.nav-toggle').on('click', function() {  
            navExpanded = !navExpanded;
            $('#nav-menu').toggleClass('collapsed');  
            $(this).toggleClass('fa-angle-left')
            .toggleClass('fa-angle-right');
            $('.nav-link.has-sub.active').find('ul').show();
            $('.collapsed .sub-links:visible').hide();
            $('#main-content').toggleClass('expanded')
            
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
        updateDebugInfo()
        $distanceToTarget.text("Distance to nav: " + distanceToTarget);
    });
};

function updateDebugInfo() {     
        $('.nav-menu-state').html('Nav-Menu Open? ' + navExpanded.toString().toUpperCase());
        $('.currently-selected-link').html('Current Page: ' + currentlySelectedLink);
        $('.next-event-ready').html('Next event ready: ' + nextEventReady.toString().toUpperCase());
}