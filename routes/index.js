const express = require('express');
const { verifyUserToken, IsAdmin, IsUser } = require("../middleware/auth");
const router = express.Router();

function getUserEvents() {
    return [];
}

function getAdminEvents() {
    return [];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// TODO: test and fix those endpoints
// Auth user only
router.get('/events', getUserEvents);

// Auth Admin only
router.get('/special', verifyUserToken, IsAdmin, getAdminEvents);

module.exports = router;
