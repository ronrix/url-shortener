
const Connection = require("../connection/mysql.connection");
const FormValidation = require("../modules/validation/Validation");
const bcryt = require("bcrypt");
const { resourceLimits } = require("worker_threads");
const { resolve } = require("path");
const salt = 10;

class AuthModel extends Connection {
	constructor() {
		super();
        this.FormValidation = new FormValidation();
	}
	
	async login(fields) {

		// add form validation here
		if(this.FormValidation.is_empty(fields)) {
			throw {msg: "Please fill up the fields", status: 400};
		}

		return new Promise(async (resolve, reject) => {
			await this.connection.execute(`
				SELECT *
				FROM users
				WHERE users.username = ? LIMIT 1`,
				[fields.username], async function(error, result, _) { 

					const user = result[0];
					if(error) {
						reject({ msg: "User not found", status: 404 });
					}

					const valid = await bcryt.compare(fields.password, user.password);
					if(valid) {
						resolve({ id: user.id, username: user.username });
					}

					reject({ msg: "Username or password is incorrect", status: 400 });
				});
		}) 
	}

	async register(fields) {

		// add form validation here
		if(this.FormValidation.is_empty(fields)) {
			throw {msg: "Please fill up the fields", status: 400};
		}
		if(!this.FormValidation.is_password_valid(fields.password)) {
			throw {msg: "Please make sure your password is 8 characters long", status: 400};
		}

		const hashed_password = await bcryt.hash(fields.password, salt);

		return new Promise(async (resolve, reject) => {
			await this.connection.execute(`
				INSERT INTO users(username, password) 
				VALUES(?, ?)`, 
				[fields.username, hashed_password], function(err, result, _) {
					if(err) {
						reject({msg: err, status: 400});
					}
					if(result.affectedRows) {
						resolve({ id: result.insertId, username: fields.username });
					}
				}
			);

		})
	}
}

module.exports = AuthModel;