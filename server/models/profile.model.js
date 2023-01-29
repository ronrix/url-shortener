const Connection = require("../connection/mysql.connection");
const FormValidation = require("../modules/validation/Validation");

class ProfileModel {
    constructor() {
        this.conn = Connection;
        this.validation = new FormValidation();
    }

    updateProfile(user, fields) {
        // input validations
        if(this.validation.is_empty(fields)) {
            throw { msg: "Please fill up the fields", status: 400 };
        }

        // validate email field
        if(!this.validation.is_email_valid(fields.email)) {
            throw { msg: "Email field should be a valid email", status: 400 };
        }

        // update the profile query
        return new Promise((resolve, reject) => {
            this.conn.connection.execute("UPDATE users SET username = ?, email = ? WHERE id = ?", [fields.username, fields.email, user.id], (err, result, _) =>{
                if(err) {
                    reject({ msg: err, status: 500 });
                }

                if(result.affectedRows) {
                    resolve({ msg: "Successfully updated the profile!", status: 200 });
                }

                reject({ msg: "Something went wrong udpating your profile", status: 500 });
            });
        });
    }
}

module.exports = ProfileModel;