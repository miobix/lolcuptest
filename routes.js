const routes = require("next-routes")(); //second set of parenthesis means this returns a function

routes
  .add("/campaigns/new", "/campaigns/new")   //poner ANTES del link general
  .add("/campaigns/:address", "/campaigns/show") //ojo con la sintaxis del link
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new");

module.exports = routes;
