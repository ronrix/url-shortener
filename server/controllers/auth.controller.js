const AuthModel = require("../models/auth.model");
const generateAccessToken = require("../modules/functions/generateAccessToken");

class AuthController {

	constructor() {
		// instance of models
		this.auth = new AuthModel();
	}

	login = (req, res) => {
		const fields = req.body;

		this.auth.login(fields).then(data => {
			
			const token = generateAccessToken(data, { expiresIn: '1min'});
			res.cookie("token", token);
			res.json({ status: 200, msg: "Successfully Login" });

		}).catch(err => {
			res.json({ status: 404, msg: err });
		});
	}

	register = (req, res) => {
		const fields = req.body;

		this.auth.login(fields).then(data => {

			const token = generateAccessToken(data, { expiresIn: '1min'});
			res.cookie("token", token);
			res.json({ status: 200, msg: "Successfully Registered" });

		}).catch(err => {
			res.json({ status: 404, msg: err });
		});
	}

}

module.exports = new AuthController();