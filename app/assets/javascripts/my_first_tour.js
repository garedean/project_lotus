// Define the tour!
  var tour = {
    id: "body",
    steps: [
      {
        target: "login-wrapper",
        title: "Welcome to Project Lotus!",
        content: "This project imagines what a future version of our core software might look\
                 like. This is a quick tour to show you around.",
        placement: "left",
        yOffset: "center",
        arrowOffset: 'center',
        delay: 300
      },
      {
        target: "login-wrapper",
        title: "Sign In, Simplified",
        content: "The page you're looking at was inspired by the \
                <a href='https://www.netflix.com/Login?locale=en-US&nextpage=http%3A%2F%2Fwww.netflix.com%2FYourAccount' target='_blank' class='external-link'>Netflix sign in page.</a>\
                Removing unnecessary content makes everything easier to process.<br><br>\
                Click 'Next' to sign in.",
        placement: "left",
        yOffset: "center",
        arrowOffset: 'center',
        multipage: true,
        onNext: function() {
          window.location = "http://localhost:3000/dashboard";
        }
      },
      {
        target: "top-bar",
        title: "Responsive design. So hot right now.",
        content: "Project Lotus is built on Bootstrap 3,\
                  allowing for responsive design from iPad landscape view \
                  and up. <br><br>Resize your browser window to check it out.",
        placement: "bottom",
        width: 350,
        xOffset: "center",
        arrowOffset: 'center',
        showPrevButton: false,
        delay: 500
      },
      {
        target: "nav-menu",
        title: "Think vertically",
        content: "A vertical nav menu offers some great benefits",
        placement: "right",
        yOffset: "center",
        arrowOffset: 'center',
      },
      {
        target: "nav-menu",
        title: "Everything fits better",
        content: "Links stack neatly on top of each other and take up consistent space.\
                 Related services are grouped together in submenus that slide in and out of \
                 view, simplifying user experience.",
        placement: "right",
        yOffset: "center",
        arrowOffset: 'center',
        width: 300
      },
      {
        target: "nav-menu",
        title: "The Sweet Spot",
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
        target: "nav-menu",
        title: "Intuitive workflows",
        content: "Left side navigation leads to more natural horizontal eye movements\
                  for end users as they scan the page for information.",
        placement: "right",
        yOffset: "center",
        arrowOffset: 'center',
      },
      {
        target: "business-tour-stop",
        title: "Peek-a-boo",
        content: "Related services are tucked away under a single menu link.<br><br> \
                <strong>Click</strong> on 'Appointments' above to see what's inside.",
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
        content: "Animations help people understand how things works at a deeper level. If they're implemented\
                  in a unique and playful way, they can add wonder and curiosity to an interaction.\
                  <br><br><strong>Click</strong> 'Next' to navigate to the 'SLO Location' page shown above.",
        placement: "bottom",
        yOffset: -10,
        xOffset: 3,
        arrowOffset: 70,
        multipage: true,
        onNext: function() {
          $(".nav-link.view-contents a[href='/slo'").click();
          window.location = "http://localhost:3000/slo";
        }
      },
      {
        target: "nav-toggle-button",
        title: "More screen size, you say?",
        content: "<strong>Click</strong> the arrow above to collapse the nav menu.",
        placement: "bottom",
        yOffset: -10,
        xOffset: -8,
        nextOnTargetClick: true,
        showNextButton: false
      },
      {
        target: "business-tour-stop",
        title: "Hover to View",
        content: "With the nav collapsed, hover over a menu item to see its submenu options appear.",
        placement: "top",
        yOffset: 3,
        xOffset: 3,
        arrowOffset: 1
      },
      {
        target: "glance-menu",
        title: "Upcoming Services",
        content: "With the 'upcoming services' widget, staff members can easily\
                  see who's coming in next simply by looking at the top of the list.",
        placement: "left", 
        yOffset: "center",
        arrowOffset: "center"
      },
      {
        target: "glance-schedule-tour-stop",
        content: "You can 'show' or 'hide' this widget with the toggle of a button. Feel\
                  free to give it a toggle.",
        placement: "left",
        yOffset: -10,
        arrowOffset: 1
      },
      {
        target: "checkout-btn",
        title: "Check, please",
        content: "The 'shopping cart' icon in the upper left of a screen is instantly\
                  recognizable to most users. Click on it to open up the checkout panel.",
        placement: "left",
        yOffset: 3,
        xOffset: 15,
        nextOnTargetClick: true,
        showNextButton: false,
        arrowOffset: 1
      },
      {
        target: "checkout-panel",
        content: "The checkout panel slides into view from any page your on, cutting\
                  down on page loads.",
        placement: "left",
        yOffset: "center",
        arrowOffset: "center",
        delay: 300
      },
      {
        target: "top-bar",
        title: "All done!",
        content: "Feel free to cruise around and click on things! You can also\
                  click the staff member's name in the upper right, then click 'Log Out' to\
                  restart the tour.",
        placement: "bottom",
        width: 350,
        xOffset: "center",
        arrowOffset: 'center',
        showPrevButton: false,
        delay: 500
      },

    ],
    showPrevButton: true
  };

  // Start the tour!
/*  hopscotch.startTour(tour);*/