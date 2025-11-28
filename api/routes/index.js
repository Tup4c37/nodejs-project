var express = require('express');
var router = express.Router();

const fs = require('fs');

// eslint-disable-next-line no-undef
let routes = fs.readdirSync(__dirname);

for(let route of routes){
  if(route.includes(".js") && route != "index.js"){
    router.use("/" + route.replace(".js",""), require("./" + route));
  }
}

// burada bütün routelar için app.js içinde use ile kullanmak yerine for döngüsü ile path oluşturulması sağlandı.

module.exports = router;
