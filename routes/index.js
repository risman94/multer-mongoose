var express = require('express');
var router = express.Router();
var Image = require('./../models/image');
var multer = require('multer');
var Image = require('./../models/image');

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
	Image.find({Image}).then((images) => {
		res.render('index', {images: images});
	});
});

router.post('/', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.end('error request file');
		}
		var data = new Image({
			text: req.body.text,
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

router.get('/:id', (req, res) => {
	var id = req.params.id
	Image.findById(id).then((result) => {
		res.render('image', {text : result.text, image : result.image});
	}).catch((e) =>  res.send(e) );
});

router.delete('/:id', (req, res) => {
	Image.remove({_id: req.params.id}).then(() => {
		res.send({message: 'delete success'});
	}).catch((e) => {
		res.send(e);
	});
});

module.exports = router;
