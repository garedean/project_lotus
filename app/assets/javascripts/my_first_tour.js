// Define the tour!
  var tour = {
    id: "body",
    steps: [
      {
        target: "login-wrapper",
        title: "Welcome to Project Lotus!",
        content: "This project imagines what a future version of our core software might look\
                 like.<br><br>Once logged in, you can restart this tour by clicking\
                 the staff member's name in the upper right, then 'Log out.'",
        placement: "left",
        yOffset: "center",
        arrowOffset: 'center', 
        delay: 300
      },
      {
        target: "login-wrapper",
        title: "Sign In, simplified",
        content: "The page you're looking at was inspired by the \
                <a href='https://www.netflix.com/Login?locale=en-US&nextpage=http%3A%2F%2Fwww.netflix.com%2FYourAccount' target='_blank' class='external-link'>Netflix sign in page.</a>\
                <br><br>A dedicated sign in page means everything not related to 'signing in' can be removed, resulting\
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
        content: "Project Lotus is built on Bootstrap 3 and features response design: \
                 the page layout changes to best fit the user's screen size. \
                 <br><br>Resize your browser window to check it out.",
        placement: "bottom",
        width: 400,
        xOffset: "center",
        arrowOffset: 'center',
        showPrevButton: false,
        delay: 2250
      },
      {
        target: "nav-menu",
        title: "Think vertically",
        content: "A vertical nav menu offers some unique benefits to our users:<br><br>\
                  <ul><li>Links take up consistent space and stack neatly on top of each other.</li>\
                  <li>More links fit vertically than horizontally: goodbye, tabs-spilling-off-the-right-side-of-the-page.</li>\
                  <li>Submenus group related services, simplifying user experience.</li>",
        placement: "right",
        yOffset: "center",
        arrowOffset: 'center',
        width: 300
      },
      {
        target: "nav-menu",
        title: "Left side, best side",
        content: "<blockquote>Web users spend <a href='http://www.nngroup.com/articles/horizontal-attention-leans-left/'\
                  target='_blank' class='external-link'>69% of their time</a> viewing the left half of the page...\
                  Keep navigation all the way to the left. This is where people look to \
                  find a list of current options.</blockquote>\
                  <a href='https://en.wikipedia.org/wiki/Jakob_Nielsen_(usability_consultant)' \
                  target='_blank' class='external-link'>Jakob Neilsen, Ph.D.</a>\
                  <br><em>User Advocate and principal of the Nielsen Norman Group,\
                  a user experience consulting group</em>",
        placement: "right",
        width: 400,
        yOffset: "center",
        arrowOffset: 'center',
      },
      {
        target: "business-tour-stop",
        title: "Menus",
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
        content: "Animations, even something as simple as scrolling a menu into view, help people \
                  understand how software works at a deeper level. <br><br>If they're implemented\
                  in a unique and playful way, they can add wonder and curiosity to an interaction.",
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
        content: "This is what it looks like when you hover over a link when the nav menu is collapsed.",
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
        content: "With the 'Upcoming Services' widget, staff members can easily\
                  see what service is coming up next.<br><br> <strong>Click</strong>\
                  the arrow to the right to hide Upcoming Services.",
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
        content: "The 'shopping cart' icon and its placement in the upper right of a web page is instantly \
                  recognizable to most users, signifying <em>the location where transactions\
                  are completed.</em><br><br><strong>Click</strong> on the 'shopping cart' to open up the checkout panel.",
        placement: "left",
        yOffset: 3,
        xOffset: 15,
        nextOnTargetClick: true,
        showNextButton: false,
        arrowOffset: 1
      },
      {
        target: "checkout-panel",
        content: "The checkout panel slides in and out of view, reducing page loads.",
        placement: "left",
        yOffset: "center",
        arrowOffset: "center",
        delay: 200
      },
      {
        target: "top-bar",
        title: "All done!",
        content: "Feel free to cruise around and click on things! If you'd like to restart\
                  the tour, click the staff member's name (Alyx Vance) in the upper right, \
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
