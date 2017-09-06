var express = require('express');
var router = express.Router();
var Image = require('./../models/image');
var multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

var upload = multer({storage: storage}).single('myimage');

// var upload = multer({dest: 'uploads/'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.end('error request file');
		}
		var data = new Image({
			text: "text",
			image: req.file.originalname
		});
		data.save().then((result) => {
			res.send(result);
		});
		console.log(req.file);
		res.end('upload file success');
		console.log('success');
	});
});

module.exports = router;
