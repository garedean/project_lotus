var navExpanded = true,
    nextEventReady = true,
    initialPage = true;
	currentlySelectedLink = ''
    pinNavCheckbox = $('#pin-nav'),
    pinNav = true;

$(document).ready(function() {
    
    if(pinNav) {
        $('#pin-nav-v2').toggleClass('selected'); 
    }

    openCloseNav();
    updateDebugInfo();

    $('.nav-link').on('click', function() {

        initialPage = false;

        $(this).addClass('active'); 
        $('.nav-link').not(this).removeClass('active');           

        nextEventReady = true;
        updateDebugInfo();

        currentlySelectedLink = $(this).text();
    });

    $('#pin-nav').on('change', function() {      
            pinNav = !pinNav;        
    });

    $('#pin-nav-v2').on('click', function() {      
            pinNav = !pinNav;   
            $(this).toggleClass('selected');     
    });
    $('.nav-toggle-wrapper').on('click', function() {  
            navExpanded = !navExpanded;
            $('#nav-menu').toggleClass('collapsed');  
            $('header#top-bar').toggleClass('collapsed');  
    });
});

// Returns proximity to a 'target_element' so that user
// actions can be anticipated before reaching actual target
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
        if (!initialPage && distanceToTarget < 40 && nextEventReady && !pinNav) {
            nextEventReady = false;
            navExpanded = !navExpanded;
            $('#nav-menu').toggleClass('collapsed');
            $('header#top-bar').toggleClass('collapsed');
            $('#nav-menu').find('li:nth-child(n+2) a .title').fadeToggle(300);
        }
        if (!initialPage && distanceToTarget > 40) {
            nextEventReady = true;
        }
        updateDebugInfo()
        $distanceToTarget.text("Distance to nav: " + distanceToTarget);
    });
};

function updateDebugInfo() {
        $('.initial-page-load').html('Initial page load: ' + initialPage.toString().toUpperCase());
        $('.nav-menu-state').html('Nav-Menu Open? ' + navExpanded.toString().toUpperCase());
        $('.currently-selected-link').html('Current Page: ' + currentlySelectedLink);
        $('.next-event-ready').html('Next event ready: ' + nextEventReady.toString().toUpperCase());
}