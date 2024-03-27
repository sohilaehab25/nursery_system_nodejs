const express = require("express");
// const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const mongoose  = require("mongoose");
require('dotenv').config();
const teacherrouter= require('./routers/teacherrouter');
const childrouter = require('./routers/childrouter');
const classrouter= require('./routers/classrouter');
const loginRoute = require('./routers/authuntication')
const authenticationmw = require("./midelware/authenticationmw");
const server = express();

  //image variable for string the path and name of image 
  const storage = multer.diskStorage({
    destination:(req, file,cb)=>{
      //the path of images folder
      cb(null,path.join(__dirname, "images"))
    },
  //change file name to originalnamed date
    filename:(req,file,cb)=>{cb(null, new Date().toLocaleDateString().replace(/\//g,"-") + "-"+ file.originalname)}
  })
  //filtration the type of image jpg,jpeg, png onley
  
const fileFilter = (req,file,cb)=>{
  if(file.mimetype =="image/jpg"||
  file.mimetype == "image/jpeg"||
  file.mimetype == "image/png")
  cb(null,true)
  else
  cb(null, false)
}

//portnumber
const port = process.env.PORT || 8080;

//connect to databse
mongoose
.connect("mongodb://127.0.0.1:27017/nurserysystem")
.then(() => {
  console.log("DB Connected....");
  server.listen(port, () => {
    console.log("I am listening..........", port);
  });
})
.catch((error) => {
  console.log("DB Problem ..." + error);
});

// Using cors
const corsOptions = {
    origin: 'http://localhost:8080',
};


/****************************stracture */
server.use(cors(corsOptions)); // Use cors middleware with specified options
// Using Morgan 
server.use(morgan('tiny')); // Log requests with the 'tiny' format

// Middleware to log request details frist mw
server.use((request, response, next) => {
    console.log(request.url, request.method);
    next();
  });


/***********************uses routers as end point;************/
//to make the image appear in ui 
server.use("/images", express.static(path.join(__dirname, "images")))
//barsing data of image single("name of image") 
server.use(multer({storage,fileFilter}).single("Image"))

server.use(express.json());

//login layer
server.use(loginRoute);
//authuntication mw
// server.use(authenticationmw);
 server.use(teacherrouter);
 server.use(classrouter);
server.use(childrouter);


//Not Found mw
server.use((request,response)=>{
    response.status(404).json({data:"Not Found"});
});



// Error MW
server.use((error, request, response, next) => {
    response.status(500).json({ data: `Error MW ${error}` });
  });
  
