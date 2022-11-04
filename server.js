//const { createServer } = require("http");

// server.js
const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" }); //especifica si es production o development
const handler = routes.getRequestHandler(app);


// Without express
const { createServer } = require("http");
app.prepare().then(() => {   
  createServer(handler).listen(3000, (err) => {  //to listen to a specific port
      if (err) throw err;
      console.log('Ready on localhost:3000');
  });    
});
