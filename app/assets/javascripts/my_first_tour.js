// Define the tour!
  var tour = {
    id: "body",
    steps: [
      {
        target: "login-wrapper",
        title: "Welcome to Project Lotus!",
        content: "This demo reimagines what the next version of our core software UI <em>might</em> look like. This (super quick) tour will show you around.",
        placement: "left",
        yOffset: "center",
        arrowOffset: 'center',
        delay: 300
      },
      {
        target: "sign-in-tour-stop",
        content: "Click the'Sign In' button to get started.",
        placement: "left",
        yOffset: "center",
        arrowOffset: 'center',
        showNextButton: false,
        nextOnTargetClick: true,
        multipage: true
      },
      {
        target: "top-bar",
        title: "Responsive design. So hot right now.",
        content: "Project Lotus is built on the Bootstrap 3,\
                  allowing for responsive page layouts from iPad landscape view \
                  and up. This means the layout of the page changes to best fit\
                  your screen size. Resize your browser window to check it out.",
        placement: "bottom",
        width: 350,
        xOffset: "center",
        arrowOffset: 'center',
        delay: 1000
      },
      {
        target: "nav-menu",
        title: "Think vertically",
        content: "A vertical nav menu on the left side of the screen has a few benefits.",
        placement: "right",
        yOffset: "center",
        arrowOffset: 'center',
      },
      {
        target: "nav-menu",
        title: "1. Everything fits better",
        content: "Listing items vertically takes up less space. When you have\
                  more than a few options to choose from, the vertical menu really shines",
        placement: "right",
        yOffset: "center",
        arrowOffset: 'center',
      },
      {
        target: "nav-menu",
        title: "2. The sweet spot",
        content: "69% of a users focus (<em>i.e.</em> time) is spent\
                  on the left side of the screen. Putting the nav on\
                  the left side puts it squarely in this area of focus area",
        placement: "right",
        yOffset: "center",
        arrowOffset: 'center',
      },
      {
        target: "nav-menu",
        title: "3. Intuitive workflows",
        content: "Left-side navigation leads to 'left to right' workflows,\
                 a natural and familiar pattern to users in Western cultures. \
                 This layout could also be reversed for 'right to left' cultures.",
        placement: "right",
        yOffset: "center",
        arrowOffset: 'center',
      },
      {
        target: "business-tour-stop",
        title: "Tucked away",
        content: "Multiple related services can be tucked away under a single menu link. Click the 'Appointments' link above to see its contents.",
        placement: "bottom",
        yOffset: -5,
        xOffset: 3,
        arrowOffset: 1,
        showNextButton: false,
        nextOnTargetClick: true
      },
      {
        target: "business-tour-stop",
        title: "",
        delay: 200,
        content: "Click 'Next' to navigate to the 'SLO Location' page shown above.",
        placement: "bottom",
        yOffset: -10,
        xOffset: 3,
        arrowOffset: 70,
        multipage: true,
        onNext: function() {
          window.location = "slo"
        }
      },
      {
        target: "nav-toggle-button",
        title: "Collapsibility",
        content: "More screen size, you say? Click the arrow above to collapse the nav menu.",
        placement: "bottom",
        yOffset: -10,
        xOffset: -8,
        nextOnTargetClick: true,
        showNextButton: false
      },
      {
        target: "business-tour-stop",
        title: "Hover time",
        content: "With the nav collapsed, hover over a menu item to see its submenu options appear.",
        placement: "top",
        yOffset: 3,
        xOffset: 3,
        arrowOffset: 1
      },
      {
        target: "glance-menu",
        title: "Upcoming services widget",
        content: "The 'upcoming services' widget dynamically updates information\
                  on a set interval. Staff members can easily see who's coming in next\
                  simply by looking at the top of the widget.",
        placement: "left", 
        yOffset: "center",
        arrowOffset: "center"
      },
      {
        target: "glance-schedule-tour-stop",
        content: "You can 'show' or 'hide' this widget with the toggle of a button.",
        placement: "left",
        yOffset: -10,
        arrowOffset: 1
      },
      {
        target: "checkout-btn",
        title: "Check, please",
        content: "A 'shopping cart' icon in the upper left of a screen is instantly\
                  recognizable to most users. Click on it to open up the checkout panel",
        placement: "left",
        yOffset: 3,
        xOffset: 15,
        nextOnTargetClick: true,
        showNextButton: false,
        arrowOffset: 1
      },
      {
        target: "checkout-panel",
        title: "Slide in, slide out",
        content: "The checkout panel slides into view from any page your on, cutting\
                  down on page loads.",
        placement: "left",
        yOffset: "center",
        arrowOffset: "center",
        delay: 300
      },
      {
        target: "body",
        title: "All",
        content: "The checkout panel slides into view from any page your on. Goodbye time consuming page reloads.",
        placement: "left",
        yOffset: "center",
        arrowOffset: "center",
        delay: 300
      },
    ],
    showPrevButton: true
  };

  // Start the tour!
/*  hopscotch.startTour(tour);*/