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
			
			const token = generateAccessToken(data, { expiresIn: '1day'});
			res.cookie("token", token, { httpOnly: true });
			res.status(200).json({ msg: "Successfully Login", status: 200 });

		}).catch(err => {
			res.status(err.status).json(err);
		});
	}

	register = (req, res) => {
		const fields = req.body;

		this.auth.register(fields).then(data => {

			const token = generateAccessToken(data, { expiresIn: '1day'});
			res.cookie("token", token, { httpOnly: true });
			res.status(200).json({ msg: "Successfully Registered", status: 200 });

		}).catch(err => {
			res.status(err.status).json(err);
		});
	}

	googleAuth = (req, res) => {
		const fields = req.body;

		this.auth.googleAuth(fields).then(data => {
			console.log(data);
			const token = generateAccessToken(data, { expiresIn: '1day'});
			res.cookie("token", token, { httpOnly: true });
			res.status(200).json({ msg: "Successful", status: 200});
		}).catch(err => {
			res.status(err.status).json(err);
		});
	}

	isAuthenticated = (req, res) => {
		const user = req.user;
		this.auth.isUserExist(user).then(exist => {
			console.log("exists: ", exist);
			if(exist) {
				res.status(200).json({ msg: "Authenticated", status: 200});
			}
			else {
				res.status(404).json({ msg: "User not found", status: 404 });
			}

		}).catch(err => {
			res.status(500).json(err);
		});
	}

}

module.exports = new AuthController();