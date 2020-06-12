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

app.url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';

app.formSection = $('.formSection'); 

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
    console.log(rovers.name);
    console.log(rovers.cameras);

    
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



