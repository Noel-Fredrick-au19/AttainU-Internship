console.log('Hello World!')

const express = require('express');
const mongoose = require('mongoose');
const bodyparser =require ('body-parser');

const appConfig = require('./config/config')

const routespath = require('./routes/videos');

const app=express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))


app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET,DELETE")

    next();
})


app.use('/user',routespath);



app.listen(appConfig.port,()=>{
    let db =mongoose.connect(appConfig.db.url,({useNewUrlParser:true}))
    console.log('port is running' + appConfig.port )
})

mongoose.connection.on('error',function(err) {
    if(err){
        console.log(err)
    }
})

mongoose.connection.on('open',function(err) {
    if(err){
        console.log(err)
    }else{
        console.log('connected successfully')
    }
})
