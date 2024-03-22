const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const mongoose  = require("mongoose");

const teacherrouter= require('./routers/teacherrouter');
const childrouter = require('./routers/childrouter');
const classrouter= require('./routers/classrouter');
const server = express();
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
//server.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // Customized logging format


// Middleware to log request details frist mw
server.use((request, response, next) => {
    console.log(request.url, request.method);
    next();
  });
  

/***********************uses routers as end point;************/
server.use(express.json());
server.use(childrouter);
server.use(teacherrouter);
server.use(classrouter);



//Not Found mw
server.use((request,response)=>{
    response.status(404).json({data:"Not Found"});
});



// Error MW
server.use((error, request, response, next) => {
    response.status(500).json({ data: `Error MW ${error}` });
  });
  
