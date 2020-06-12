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

 
app.apiKey = 'o50slHLqJd3LnaWMAegD0nN5q83KIAw7CicARCKX';

app.url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=FHAZ&api_key=o50slHLqJd3LnaWMAegD0nN5q83KIAw7CicARCKX';

app.formSection = $('.formSection'); 

app.roverHeading = $('#roverName');

app.cameraSelection = $('#camera');

app.makeRequest = function() {
    console.log(this.url);
    $.ajax({
        url: this.url,
        method: 'GET',
        dataType: 'json'
      }).then(function() {
        console.log('It worked!');
      }).catch(function() {
          console.log('problem');
      });
};


// Objects 
app.curiosity = {
    element: $('#curiosityLink'),
    name: "curiosity",
    cameras: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM','MAHALI','MARDI','NAVCAM']  
};

app.spirit = {
    element: $('#spiritLink'),
    name: "spirit",
    cameras: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
};

app.opportunity = {
    element: $('#oppurtunityLink'),
    name: "opportunity",
    cameras: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
};


app.loadRovers = function(rovers) {
    app.formSection.show();
    app.roverHeading.text(`rover: ${rovers.name}`);    
    app.cameraSelection.empty();
    rovers.cameras.forEach(item => {
        app.cameraSelection.append(`<option value=${item}>${item}</option>`);
    }); 
    app.makeRequest();
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

app.currentRover = '';

app.currentCamera = '';

app.currentDate = '';

});



