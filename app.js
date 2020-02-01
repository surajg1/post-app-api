const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const path = require("path");
const app = express();

// mongodb+srv://surajgholap:'s'@cluster0-kmd7r.mongodb.net/posts

mongoose.connect('mongodb+srv://surajgholap:srj@9604@cluster0-kmd7r.mongodb.net/posts', {useNewUrlParser: true})
            .then(()=>{
                console.log("DataBase connectd");
            }).catch(()=>{
                console.log("Connection Fails");
            });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({entended : false}));
app.use("/images",express.static(path.join("backend-node/images")));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        );
    next();
}); 
// var posts;
 
app.use("/api/posts",postsRoutes);
app.use("/api/user", userRoutes);
module.exports = app;
