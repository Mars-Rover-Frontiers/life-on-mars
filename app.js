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
 
app.apiKey = 'o50slHLqJd3LnaWMAegD0nN5q83KIAw7CicARCKX';

app.url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';


// Objects 
app.curiosity = {
    name: "curiosity",
    cameras: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM','MAHALI','MARDI','NAVCAM']  
};

app.spirit = {
    name: "spirit",
    cameras: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
};

app.opportunity = {
    name: "opportunity",
    cameras: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
};





