const express = require("express");
require("dotenv").config();
const path = require('path');
const { reviewForm } = require("./controllers/reviewController");
// const cors = require("cors");
const app = express();

// Middlewares 

app.use(express.static(__dirname+"/public/"));
app.use(express.json());

let PORT = process.env.PORT;
let XApiKey = process.env.XApiKey;

app.get('/', (req,res) => {
    res.sendFile('index.html');
})

app.get('/quiz', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});


app.get('/about', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/topics', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'topics.html'));
});


app.post('/submit-review', reviewForm);


var category, difficulty, limit;

app.post("/select-quiz", (req,res) => {
    let data = req.body;
    console.log(data);
    
    if(!data){
        
        res.status(500).json({message:"Internal Sever Error"});
    }
    
    category = data.category;
    difficulty = data.difficulty;
    limit = data.limit;
    
    res.status(200).json({message:"Quiz Selected Succesffully"});


})

app.get('/get-questions', async(req,res)=> {

    // https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=docker&difficulty=Medium&limit=10&tags=cPanel,Kubernetes,Docker,HTML,JavaScript

    console.log("datas \n "+category, difficulty, limit);
    

    let url = `https://quizapi.io/api/v1/questions?category=${category}&difficulty=${difficulty}&limit=${limit}`;

    console.log(url);
    

    let response = await fetch(url,{
        headers: {
            "X-Api-Key": `${XApiKey}`
        }
    })

    let data = await response.json();

    // console.log("questions : ",data);
    
    const {error} = data;
    if(error){
       return res.status(400).json({error:error})
    }

    res.json(data);
    
})

app.listen(PORT, () =>{

    console.log(`server running on http://localhost:3000`);    

})