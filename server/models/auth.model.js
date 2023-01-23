
const Connection = require("../connection/mysql.connection");
const FormValidation = require("../modules/validation/Validation");
const bcryt = require("bcrypt");
const salt = 10;

class AuthModel {
	constructor() {
		this.conn = Connection;
        this.FormValidation = new FormValidation();
	}
	
	login(fields) {

		// add form validation here
		if(this.FormValidation.is_empty(fields)) {
			throw {msg: "Please fill up the fields", status: 400};
		}

		return new Promise(async (resolve, reject) => {
			await this.conn.connection.execute(`
				SELECT *
				FROM users
				WHERE users.username = ? LIMIT 1`,
				[fields.username], async function(error, result, _) { 

					const user = result[0];
					if(error) {
						reject({ msg: "Something went wrong", status: 409 });
						return;
					}

					// no result has found
					if(!result.length) {
						reject({ msg: "User not found!", status: 404 });
						return;
					}

					const valid = await bcryt.compare(fields.password, user.password);
					if(valid) {
						resolve({ id: user.id, username: user.username });
					}

					reject({ msg: "Username or password is incorrect", status: 401 });
				});
		}) 
	}

	async register(fields) {

		// add form validation here
		if(this.FormValidation.is_empty(fields)) {
			throw {msg: "Please fill up the fields", status: 409};
		}
		if(!this.FormValidation.is_password_valid(fields.password)) {
			throw {msg: "Please make sure your password is 8 characters long", status: 409};
		}

		const hashed_password = await bcryt.hash(fields.password, salt);

		// check if username is already used
		const user_found = await this.conn._exists("SELECT * FROM users WHERE users.username = ? LIMIT 1", [fields.username]);
		if(user_found) {
			throw { msg: "User already exists", status: 409 };
		}

		// create new user if user is valid
		return new Promise(async (resolve, reject) => {
			await this.conn.connection.execute(`
				INSERT INTO users(username, email, password) 
				VALUES(?, ?, ?)`, 
				[fields.username, fields.email, hashed_password], function(err, result, _) {
					if(err) {
						reject({msg: err, status: 500});
					}
					if(result.affectedRows) {
						resolve({ id: result.insertId, username: fields.username });
					}
				}
			);

		})
	}


	googleAuth(fields) {
		// check for user existency in DB
		return new Promise(async (resolve, reject) => {
			await this.conn.connection.execute("SELECT * FROM users WHERE users.email = ? LIMIT 1", [fields.email], async (err, selectResult, _) => {
				if(err) {
					reject({ msg: err, status: 500 });
				}

				if(!selectResult.length) { // if no user found

					// store the fields into array for query. setting the google id to password column
					const insert_fields = [fields.username, fields.email, fields.id, fields.picture];

					await this.conn.connection.execute("INSERT INTO users(username, email, password, img_path) VALUES(?, ?, ?, ?)", insert_fields, (err, insertResult, _) => {
						if(err) {
							reject({ msg: err, status: 500});
						}
						if(insertResult.affectedRows) {
							resolve({ id: insertResult.insertId, username: fields.username });
						}
					});


				} 
				// check if the password/id value from google credentials is correct
				else if(selectResult.length && selectResult[0].password === fields.id) {
					resolve({ id: selectResult[0].id, username: selectResult[0].username });
				}
				else { // create the user if no user found in DB
					reject({ msg: "Invalid credentials", status: 403 });
				}
			});
		});
	}

	async isUserExist(user) {
		const user_found = await this.conn._exists("SELECT id FROM users WHERE users.id = ?", [user.id]);
		if(user_found) {
			return true;
		}
		return false;
	}
}

module.exports = AuthModel;