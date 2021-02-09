const express = require("express");
const app = express();
const https = require('https');

const url = "https://v2.jokeapi.dev/joke/Any?type=single";
const apikey = "cGusdYvbs9cKWg5HWs6MFFp5dHgwtVtT";

app.get("/",(req,res)=>{
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(d)=>{
            const jokeData = JSON.parse(d);
            res.send(jokeData.joke);
        });
    });
});

app.listen(3000,()=>{
    console.log("Server is up on port 3000");
});