/*
router.js

This file creates and exports the application's routes to the
main app file.
*/


//Instantiate Router..
const router = require('express').Router(),
        User = require('../models/users');


//Home page..
router.get('/', function(req, res) {
  res.render('<%= bootstrapTmplt %>');
});

//About page..
// router.get('/about', function(req, res) {
//   res.render('about');
// });


module.exports = router;
