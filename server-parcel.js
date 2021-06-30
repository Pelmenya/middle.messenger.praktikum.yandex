const express = require("express"); 
const PORT = 4000; 
 
const app = express(); 
 
app.use(express.static(`${__dirname}/static`)); 
 
app.listen(PORT); 