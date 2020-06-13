let app = {};

$(document).ready(function () {
  app.apiKey = "o50slHLqJd3LnaWMAegD0nN5q83KIAw7CicARCKX";

  app.baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

  app.url = "";

  // url

  app.formSection = $(".formSection");

  app.roverHeading = $("#roverName");

  app.cameraSelection = $("#camera");

  app.formSubmit = $("#roverButton");

  app.image = $("#image");

  app.launchDate = $("#launchDate");
  app.landingDate = $("#landingDate");
  app.distanceCovered = $("#distanceCovered");
  app.status = $("#status");

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
        console.log(data);
        app.image.attr("src", data.photos[0].img_src);
      })
      .catch(function () {
        console.log("Error: Something went wrong with the API request");
      });
  };

  app.currentRover = "";

  app.currentCamera = "";

  app.currentSol = "";

  // Objects
  app.curiosity = {
    element: $("#curiosityLink"),
    name: "curiosity",
    launchDate: "November 26th, 2011",
    landingDate: "August 6th, 2012",
    distanceCovered: "21.61 Kilometers",
    status: "Operational",
    cameras: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHALI", "MARDI", "NAVCAM"],
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

  app.loadRovers = function (rover) {
    app.formSection.show();

    app.currentRover = rover.name;
    app.roverHeading.text(`rover: ${rover.name}`);
    app.launchDate.text(rover.launchDate);
    app.landingDate.text(rover.landingDate);
    app.distanceCovered.text(rover.distanceCovered);
    app.status.text(rover.status);

    app.cameraSelection.empty();
    app.url = `${app.baseUrl}${app.currentRover}/photos`;
    console.log(app.url);
    rover.cameras.forEach((item) => {
      app.cameraSelection.append(`<option value=${item}>${item}</option>`);
    });
  };

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
});
