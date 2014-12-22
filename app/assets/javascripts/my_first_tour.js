// Define the tour!
  var tour = {
    id: "body",
    steps: [
      {
        target: "login-wrapper",
        title: "Hey there!",
        content: "Welcome to Project Lotus! This project imagines what a future version of our core software might look\
                 like.",
        placement: "left",
        yOffset: "center",
        arrowOffset: 'center', 
        delay: 300
      },
      {
        target: "login-wrapper",
        title: "Sign In, simplified",
        content: "A dedicated sign in page means everything not related to 'signing in' can be removed, resulting\
                in a more zen-like experience.<br><br>\
                Click 'Next' to sign in.",
        placement: "left",
        yOffset: "center",
        arrowOffset: 'center',
        multipage: true,
        onNext: function() {
          window.location = "http://projectlotus.herokuapp.com/dashboard";
        }
      },
      {
        target: "top-bar",
        title: "Responsive design. So hot right now.",
        content: "Project Lotus is built on Bootstrap 3 and features response design, meaning \
                 the page layout changes to best fit the user's screen size. \
                 <br><br>Resize your browser window to check it out.",
        placement: "bottom",
        width: 350,
        xOffset: "center",
        arrowOffset: 'center',
        showPrevButton: false,
        delay: 2250
      },
      {
        target: "nav-menu",
        title: "Think vertically",
        content: "A vertical nav menu offers some unique benefits:<br><br>\
                  <ul> \
                  <li>User experience is simplified by grouping related items in submenus.</li>\
                  <li>More links show 'above the fold' compared to our current horizontal nav menu.</li>\
                  <li>Placement on the far left puts navigation in a natural focal area where users spend \
                  <a href='http://www.nngroup.com/articles/horizontal-attention-leans-left/'\
                  target='_blank' class='external-link'>69% of their time.</a></li>\
                  </ul>",
        placement: "right",
        width: 350,
        yOffset: "center",
        arrowOffset: 'center',
      },
      {
        target: "business-tour-stop",
        title: "Submenus",
        content: "<strong>Click</strong> on the 'Appointments' link above to see what's nested under it.",
        placement: "bottom",
        yOffset: -5,
        xOffset: 3,
        arrowOffset: 1,
        showNextButton: false,
        nextOnTargetClick: true
      },
      {
        target: "business-tour-stop",
        title: "Peek-a-boo",
        delay: 200,
        content: "Animations help users understand how software works at a deeper level. \
                 <br><br>If they're implemented in a unique and playful way, they can add \
                 joy and wonder to a user's experience.",
        placement: "bottom",
        yOffset: -10,
        xOffset: 3,
        arrowOffset: 70
      },
      {
        target: "nav-toggle-button",
        title: "More screen size, you say?",
        content: "<strong>Click</strong> the arrow above to collapse the nav menu.",
        placement: "bottom",
        yOffset: -10,
        xOffset: -8,
        nextOnTargetClick: true,
        showNextButton: false,
        onNext: function() {
          $('.nav-link').find('.appointments.sub-links').delay(200).fadeIn();
          $('#business-tour-stop .menu-link').css("background-color", "#D0D5D7");
        }
      },
      {
        target: "business-tour-stop",
        title: "Hover-ability",
        content: "This is what it looks like when a user hovers over a link with the nav menu collapsed.",
        placement: "top",
        yOffset: 3,
        xOffset: 3,
        arrowOffset: 1,
        onNext: function() {
          $('#business-tour-stop .menu-link').css("background-color", "initial");
          $('.nav-link').find('.appointments.sub-links').fadeOut();
        }
      },
      {
        target: "nav-toggle-button",
        title: "Megatron, transform!",
        content: "<strong>Click</strong> on the 'menu icon' to the left to expand the nav menu.",
        placement: "right",
        yOffset: 5,
        xOffset: -5,
        arrowOffset: 1,
        nextOnTargetClick: true,
        showNextButton: false
      },
      {
        target: "glance-menu",
        title: "Upcoming Services",
        content: "The 'Upcoming Services' widget allows staff to quickly and easily see \
                  what client is coming in next.",
        placement: "left", 
        yOffset: "center",
        arrowOffset: "center",
      },
      {
        target: "glance-menu",
        content: "<strong>Click</strong> the arrow to the right to collapse the 'Upcoming Services' widget.",
        placement: "left", 
        yOffset: "center",
        arrowOffset: "center",
        nextOnTargetClick: true,
        showNextButton: false
      },
      {
        target: "glance-menu",
        content: "<strong>Click</strong> again to open it back up.",
        placement: "left", 
        yOffset: "center",
        arrowOffset: "center",
        nextOnTargetClick: true,
        showNextButton: false
      },
      {
        target: "checkout-btn",
        title: "Check, please!",
        content: "The 'shopping cart' icon in the upper right is instantly recognizable to \
                  most users.<br><br><strong>Click</strong> on it to open up the checkout panel.",
        placement: "left",
        yOffset: 3,
        xOffset: 15,
        nextOnTargetClick: true,
        showNextButton: false,
        arrowOffset: 1
      },
      {
        target: "checkout-panel",
        content: "The checkout panel slides in and out view, reducing page loads.<br><br>\
                  In a completed state, this panel would display sections to lookup a client, \
                  add items to the cart, choose a payment method, and complete a transaction.",
        placement: "left",
        yOffset: "center",
        arrowOffset: "center",
        nextOnTargetClick: false,
        showNextButton: true,
        delay: 200
      },
      {
        target: "top-bar",
        title: "All done!",
        content: "To restart the tour, click the staff member's name (Alyx Vance) in the upper right, \
                  then click 'Log Out'.",
        placement: "bottom",
        width: 350,
        xOffset: "center",
        arrowOffset: 'center',
        showPrevButton: false,
        delay: 300
      },
    ],
    showPrevButton: true,
    onEnd: function() {
          tourCompleted = true;
          location.reload();
    }
  };
