/* 

Variables

currentRover = '';

........................
api key  
o50slHLqJd3LnaWMAegD0nN5q83KIAw7CicARCKX


in app 


when user clicks on nav link, show element
onclick section.show()

scrolls down to the section
section.animate



*/
let app = {};

$(document).ready(function () {
  app.apiKey = "o50slHLqJd3LnaWMAegD0nN5q83KIAw7CicARCKX";

  app.baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

  app.url = "";

  // url

  app.formSection = $(".formSection");

  app.roverHeading = $("#roverName");

  app.cameraSelection = $("#camera");

  app.solSelection = $("#sol");

  app.formSubmit = $("#roverButton");

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
      .then(function () {
        console.log("Success: We got an image!");
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
    cameras: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHALI", "MARDI", "NAVCAM"],
  };

  app.spirit = {
    element: $("#spiritLink"),
    name: "spirit",
    cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
  };

  app.opportunity = {
    element: $("#oppurtunityLink"),
    name: "opportunity",
    cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
  };

  app.loadRovers = function (rover) {
    app.formSection.show();
    app.currentRover = rover.name;
    app.roverHeading.text(`rover: ${rover.name}`);
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
    app.currentSol = app.solSelection.value;
    app.currentCamera = app.cameraSelection.value;
    app.makeRequest();
  });
});
