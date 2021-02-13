const express = require("express");
const app = express();
const https = require('https');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set('view engine','ejs')

var url = "https://v2.jokeapi.dev/joke";
var joke = ""

app.get("/",(req,res)=>{
    res.render('index',{joke:joke});
});

app.post("/",(req,res)=>{
    url = "https://v2.jokeapi.dev/joke";
    const categoryData = (req.body);
    var categoryURL = "/";
    for(x in categoryData){
        if(categoryData[x]=='on'){
            categoryURL += x + ",";
        }
    }
    categoryURL = categoryURL.slice(0,categoryURL.length-1);
    if(categoryURL==''){
        url = url+"/Any?contains="+req.body.query;
    }
    else{
        url = url + categoryURL;
        if(req.body.query!=''){
            url = url + "?contains=" + req.body.query;
        }
    }
    console.log(url);
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(d)=>{
            const jokeData = JSON.parse(d);
            console.log(jokeData);

            if(jokeData.type == 'single'){
                res.send(jokeData.joke);
            }
            else if(jokeData.type == "twopart"){
                res.send(jokeData.setup+" "+jokeData.delivery);             
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