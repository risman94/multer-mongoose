var express = require('express');
var router = express.Router();
var Image = require('./../models/image');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
	var data = new Image({
		text: req.body.text,
		image: req.body.image
	});
	data.save().then((result) => {
		res.send(result);
	});
});

module.exports = router;
