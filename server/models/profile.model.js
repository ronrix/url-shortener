const bcrypt = require("bcrypt");

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

    updatePassword(user, fields) {
        // input validations
        if(this.validation.is_empty(fields)) {
            throw { msg: "Please fill up the fields", status: 400 };
        }

        // validate email field
        if(!this.validation.is_password_valid(fields.new_password)) {
            throw { msg: "Password should be at least 8 characters long", status: 400 };
        }

        // check for the user's old password if correct
        // update the profile password query
        return new Promise((resolve, reject) => {
            this.conn.connection.execute("SELECT * FROM users WHERE id = ?", [user.id], async (err, result, _) => {
                if(err) {
                    return reject({ msg: err, status: 500 });
                }

                if(!result.length) {
                    return reject({ msg: "User not found", status: 404 });
                }

                const valid = await bcrypt.compare(fields.old_password, result[0].password);
                const hashed_new_password = await bcrypt.hash(fields.new_password, 10);
                if(valid) {
                    this.conn.connection.execute("UPDATE users SET password = ? WHERE id = ?", [hashed_new_password, user.id], (err, updateRes, __) => {
                        if(err) {
                            return reject({ msg: err, status: 500 });
                        }

                        if(updateRes.affectedRows) {
                            resolve({ msg: "Sucessfully updated the password", status: 200 });
                        }

                        reject({ msg: "Something went wrong updating your password", status: 500 });
                    });
                    return;
                }

                reject({ msg: "Password is not correct", status: 400 });
            });
        });
    }

    updateAvatar(image_path, userId) {
        return new Promise(async (resolve, reject) => {
            // check if the user already has a collection table
            const user_found = await this.conn._exists("SELECT * FROM users WHERE id = ?", [userId]);
            if(!user_found) {
                reject({ msg: "User does not exists", status: 404 });
            }

            // update the user table with the new avatar file path
            try {
                this.conn.connection.execute("UPDATE users SET img_path = ? WHERE id = ?", [image_path, userId], (err, result, _) => {
                    if(err) {
                    reject({ msg: err, status: 500 });
                    }
                    console.log(result);

                    // if success
                    if(result.affectedRows) {
                        resolve({ msg: "Image upload successfully", status: 200 });
                    }

                    reject({ msg: "Something went wrong upating the avatar", status: 500 });
                });
            } catch(err) {
                reject(err);
            }
        });
    }
}

module.exports = ProfileModel;