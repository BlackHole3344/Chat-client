const express = require('express'); 
const yargs = require('yargs'); 
const {hideBin} = require('yargs/helpers'); 
const path = require('path'); 

const argv = yargs(hideBin(process.argv))
.option("client-port" , {
    alias : "c" , 
    type : 'number' , 
    description : "Port for the test client" , 
    default : 3000 
})
.option("server-port" , {
    alias : "s" , 
    type : 'number' , 
    description : "Port for the server" , 
    default : 4000  
})
.argv ; 


const clientPort = argv['client-port']; 
const serverPort = argv['server-port']; 

console.log("server is running at : " , serverPort);


const app = express() ; 

app.get("/" , (req , res) => {
    let html = require("fs").readFileSync(path.join(__dirname , "index.html") , "utf-8") ;
    html = html.replace(
        /const\s+serverPort\s*=\s*\d+\s*;/, 
        `const serverPort = ${serverPort};`
    );
    if(html.match(/const\s+serverPort\s*=\s*4000\s*;/)) {
        console.log("Warning: Server port replacement may have failed");
    }
    res.send(html);
}) 


app.listen(clientPort , () => {
    console.log(`Client running on port ${clientPort}`); 
    console.log(`Server running on port ${serverPort}`);
})
