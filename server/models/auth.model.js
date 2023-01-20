
const Connection = require("../connection/mysql.connection");
const FormValidation = require("../modules/validation/Validation");

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

		return await this._query(`
			SELECT users.id, users.username
			FROM users
			WHERE users.username = ? AND users.password = ? LIMIT 1`, 
			fields
		);
	}
}

module.exports = AuthModel;