const { User } = require("../models");
const generateAccessToken = require("../modules/functions/generateAccessToken");
const generateDefaultAvatar = require("../modules/functions/generateDefaultAvatar");
const bcrypt = require("bcrypt");

class AuthController {

	constructor() { }

	login = async (req, res) => {
		const fields = req.body;

		// get the user
		const user = await User.findOne({ where: { username: fields.username }});
		// check if there is a user found
		if(!user) {
			res.status(404).json({ msg: "No user found!", status: 404 });
			return;
		}
		// check password if user found
		const is_valid = await bcrypt.compare(fields.password, user.password);
		if(!is_valid) {
			res.status(404).json({ msg: "Username or password is incorrect", status: 404 });
			return;
		}
		// return success response
		const token = generateAccessToken({ user_id: user.id }, { expiresIn: '7d'});
		res.cookie("token", token, { httpOnly: true });
		res.cookie("c_user", user.id, { httpOnly: false });
		res.status(200).json({ msg: "Success", status: 200 });
	}

	register = async (req, res) => {
		const fields = req.body;

		// adding generated avatar
		const avatar = generateDefaultAvatar();
		fields["avatar"] = avatar;

		const password = await bcrypt.hash(fields.password, 10);
		try {
			const user = await User.create({ username: fields.username, email: fields.email, password, img_path: fields.avatar });
			const token = generateAccessToken({ user_id: user.id }, { expiresIn: '7d'});
			res.cookie("token", token, { httpOnly: true });
			res.cookie("c_user", user.id, { httpOnly: false });
			res.status(201).json({ msg: "success", status: 200 });
		} catch(err) {
			console.log(err.errors[0].message);
			res.status(500).json({ msg: err.errors[0].message, status: 500 });
		}
	}

	googleAuth = async (req, res) => {
		const fields = req.body;

		// check if user already exists
		try {
			const user = await User.findOne({ where: { email: fields.email }});
			if(!user) {
				console.log("no user found");
				// add the user to db
				const new_user = await User.create({ username: fields.username, email: fields.email, is_google_auth: true, password: fields.id, img_path: fields.picture });
				const token = generateAccessToken({ user_id: new_user.id }, { expiresIn: '7d'});
				res.cookie("token", token, { httpOnly: true });
				res.cookie("c_user", new_user.id, { httpOnly: false });
				res.status(201).json({ msg: "success", status: 200 });
			}
			// login the user if google account already exists in the db
			const token = generateAccessToken({ user_id: user.id }, { expiresIn: '7d'});
			res.cookie("token", token, { httpOnly: true });
			res.cookie("c_user", user.id, { httpOnly: false });
			res.status(200).json({ msg: "success", status: 200 });
		} catch(err) {
			console.log(err);
			res.status(500).json({ msg: err, status: 500 });
		}
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

	signOut = (req, res) => {
		res.clearCookie("token");
		res.clearCookie("c_user");
		res.status(200).json({ msg: "sign out", status: 200 });
	}

}

module.exports = new AuthController();