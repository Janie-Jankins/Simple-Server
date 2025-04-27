const {server} = require('./requests');
const {createFile} = require('./file-manager')

createFile();

server.listen(3000,() => {
    console.log("Server is running");
    
})