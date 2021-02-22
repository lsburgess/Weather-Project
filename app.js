//This project illustrates the usage of Node, express, and Api Keys

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
  res.sendFile(__dirname + "/index.html");
  //res.send("Server is up an running.");
})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "d51d60d4d06514d4f6973992f1ae6500";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apiKey;

  https.get(url, function(response){
    console.log('StatusCode:',response.statusCode); //check if it works. 200 means it works

    response.on("data", function(data){

      const weatherData = JSON.parse(data);
      const location = weatherData.name;
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgurl = "http://openweathermap.org/img/wn/" +icon+"@2x.png";

      //send the dynamic data to the web page
      res.write("<h1>The weather is currently " + weatherDescription + "</h1>");
      res.write("<h1>The temparature in "+location+" is: "+temp+" degrees fahrenheit</h1>");
      res.write("<img src="+imgurl+">");
      res.send();

    })
  })

  console.log('post recieved');
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})



//A way to flatten the Json data. Make it into an object like so
// const object = {
//   name: "Lauren",
//   favoriteFood: "Soup"
// }
// console.log(JSON.stringify(object));
