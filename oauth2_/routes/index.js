var express = require('express');
const oauth2Utils = require("../oauth2/OAuth2Utils");
const oauth2Settings = require("../oauth2/Settings");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '[第五組] OAuth 2.0 SSO(Single Sign On)應用程式習作' });
});

module.exports = router;
