const express = require("express");
const app = express();
const https = require('https');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const url = "https://v2.jokeapi.dev/joke/Any?type=single";
const apikey = "cGusdYvbs9cKWg5HWs6MFFp5dHgwtVtT";

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
    //https.get(url,(response)=>{
    //    console.log(response.statusCode);
    //    response.on("data",(d)=>{
    //        const jokeData = JSON.parse(d);
    //        res.send(jokeData.joke);
    //    });
    //});
});

app.post("/",(req,res)=>{
    const queryURL = url + "&contains=" + req.body.query;
    console.log(queryURL);
    https.get(queryURL,(response)=>{
        console.log(response.statusCode);
        response.on("data",(d)=>{
            const jokeData = JSON.parse(d);
            console.log(jokeData);

            if(jokeData.type == 'single'){
                res.send(jokeData.joke);
            }
            else if(jokeData.type == "twopart"){
                res.send(jokeData.setup);
                res.send(jokeData.delivery);               
            }

            else if(jokeData.error == true){
                res.send(jokeData.message);
            }
        });
    });

});

app.listen(3000,()=>{
    console.log("Server is up on port 3000");
});