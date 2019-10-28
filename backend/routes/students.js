const express = require('express');

const Student = require('../models/students');

const router = express.Router();
console.log(router);

router.get("/:id", (req, res, next) => {
	console.log("Express Get Middilware Get one",req.params.id);
	let id = parseInt(req.params.id)
	Student.find({"id":id})
		.then(studentDetail => {
			if (!studentDetail) {
				res.status(404).json({
					message: "Student Details not found."
				})
			} else {
				console.log(studentDetail)
				res.status(200).json({
					message: "Student Details sent successfully",
					data: studentDetail
				});
			}
		});
});

router.get("/textsearch/:text", (req, res, next)=>{
	console.log("ewtryu")
    console.log(req.params.text)
	Student.find({"name": new RegExp(req.params.text, 'i')})
		.then(studentDetail => {
			if (!studentDetail) {
				res.status(404).json({
					message: "Student Details not found."
				})
			} else {
				console.log(studentDetail)
				res.status(200).json({
					message: "Student Details sent successfully",
					data: studentDetail
				});
			}
		});
})

router.get("", (req, res, next) => {
	Student.find()
		.then(studentDetails => {
			res.status(200).json({
				message: "Student Details sent successfully",
				data: studentDetails
			});
		});
});

module.exports = router;