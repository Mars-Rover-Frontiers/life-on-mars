let app = {};

$(document).ready(function () {

  // Define Core Variables
  app.apiKey = "o50slHLqJd3LnaWMAegD0nN5q83KIAw7CicARCKX";
  app.baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
  app.url = "";
  app.currentRover = "";
  app.currentCamera = "";
  app.currentSol = "";
  
  // Element Selectors
  app.formSection = $(".formSection");
  app.roverHeading = $("#roverName");
  app.cameraSelection = $("#camera");
  app.formSubmit = $("#roverButton");
  app.launchDate = $("#launchDate");
  app.landingDate = $("#landingDate");
  app.distanceCovered = $("#distanceCovered");
  app.status = $("#status");
  app.image = $("#image");
  app.enlargedImageWrapper = $("#enlargedImageWrapper");
  app.enlargedImage = $("#enlargedImage");
  app.closeImage = $("#closeImage");
  
  // Define Rover Objects
  app.curiosity = {
    element: $("#curiosityLink"),
    name: "curiosity",
    launchDate: "November 26th, 2011",
    landingDate: "August 6th, 2012",
    distanceCovered: "21.61 Kilometers",
    status: "Operational",
    cameras: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
  };
  app.spirit = {
    element: $("#spiritLink"),
    name: "spirit",
    launchDate: "June 10th, 2003",
    landingDate: "January 4th, 2004",
    distanceCovered: "7.73 Kilometers",
    status: "Last Contact (March 22nd, 2010)",
    cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
  };
  app.opportunity = {
    element: $("#oppurtunityLink"),
    name: "opportunity",
    launchDate: "July 7th, 2003",
    landingDate: "January 25th, 2004",
    distanceCovered: "45.16 Kilometers",
    status: "Last Contact (June 10, 2018)",
    cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
  };
  
  // Set Event Listeners
  app.curiosity.element.click(() => {
    app.loadRovers(app.curiosity);
  });
  app.spirit.element.click(() => {
    app.loadRovers(app.spirit);
  });
  app.opportunity.element.click(() => {
    app.loadRovers(app.opportunity);
  });
  
  app.formSubmit.click((e) => {
    e.preventDefault();
    app.currentSol = Math.floor(Math.random() * 1000) + 1;
    app.currentCamera = app.cameraSelection.val();
    app.makeRequest();
  });

  app.image.click((e) => {
    e.preventDefault();
    app.enlargedImageWrapper.show();
  });
  app.closeImage.click((e) => {
    e.preventDefault();
    app.enlargedImageWrapper.hide();
  });

  /*
  FUNCTION: loadRovers
  PARAM(S): rover-object
  DESC: Displays the form section, sets rover-object to current rover, 
  set's url based on rover-object, displays rover information on page
  */

  app.loadRovers = function (rover) {
    app.formSection.show();
    
    app.currentRover = rover.name;
    app.url = `${app.baseUrl}${app.currentRover}/photos`;

    app.roverHeading.text(`rover: ${rover.name}`);
    app.launchDate.text(rover.launchDate);
    app.landingDate.text(rover.landingDate);
    app.distanceCovered.text(rover.distanceCovered);
    app.status.text(rover.status); 
    app.cameraSelection.empty();

    rover.cameras.forEach((item) => {
      app.cameraSelection.append(`<option value=${item}>${item}</option>`);
    });

    $([document.documentElement, document.body]).animate(
      {
        scrollTop: app.formSection.offset().top,
      },
      1000
      );
  };
  
  
  /*
  FUNCTION: makeRequest
  PARAM(S): none
  DESC: Makes API call based on sol, camera and api-key variables,
  keep's making calls until an image is retrieved, and then set's image to DOM
  */
  app.makeRequest = function () {
    $.ajax({
      url: this.url,
      method: "GET",
      dataType: "json",
      data: {
        sol: app.currentSol,
        camera: app.currentCamera,
        api_key: app.apiKey,
      },
    })
      .then(function (data) {
        if (data.photos.length === 0) {
          console.log("Undefined, so making new request");
          app.currentSol = Math.floor(Math.random() * 1000) + 1;
          app.makeRequest();
          throw Error("EMPTY SOURCE, so we made a new call.");
        }
        app.image.css("background-image", `url(${data.photos[0].img_src})`);
        app.enlargedImage.attr("src", `${data.photos[0].img_src}`);
      })
      .catch(function () {
        // Do nothing!
      });
  };

  
});
