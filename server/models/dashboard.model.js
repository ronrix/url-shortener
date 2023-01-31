const Connection = require("../connection/mysql.connection");
const FormValidation = require("../modules/validation/Validation");

class DashboardModel {
    constructor() {
        this.conn = Connection;
        this.formValidation = new FormValidation();
    }

    getUserInfo(user) {
        return new Promise(async (resolve, reject) => {
            await this.conn.connection.execute("SELECT username, img_path, email, is_google_auth FROM users WHERE id=?", [user.id], (err, result, _) => {
                if(err) {
                    reject({ msg: err, status: 500 });
                }
                resolve(result);
            });
        });
    }

    getUserCollections(user) {
        return new Promise(async (resolve, reject) => {
            await this.conn.connection.execute("SELECT * FROM collections WHERE user_id = ?", [user.id], (err, result, _) => {
                if(err) {
                    reject({ msg: err, status: 500 });
                }
                // check if user has collections
                resolve(result[0]);
            });
        })
    }

    saveCollection(fields, img_url, user, generated_short_string) {

        if(this.formValidation.is_empty(fields)) {
            throw { msg: "Please fill up all the fields" ,status: 404 };
        }

        return new Promise(async (resolve, reject) => {
            // check if the user already has a collection table
            const collection_found = await this.conn._exists("SELECT * FROM collections WHERE user_id = ?", [user.id]);
            if(collection_found) {
                // update the url_collections column 
                await this.conn.connection.execute(`
                    UPDATE collections c
                    JOIN (
                        SELECT JSON_LENGTH(JSON_EXTRACT(url_collections, "$")) AS max_id
                        FROM collections 
                        WHERE user_id = ?
                    ) t
                    ON c.user_id = ?
                    SET c.url_collections = JSON_ARRAY_APPEND(c.url_collections, '$',
                        JSON_OBJECT(
                            'id', max_id + 1, 
                            'name', ?,
                            'details', ?,
                            'img_url', ?,
                            'original_url', ?,
                            'short_url', ?,
                            'created_at', ?,
                            'updated_at', ?))
                    `, [user.id, user.id, fields.name, fields.details, img_url, fields.originalUrl, generated_short_string.string, new Date(), null], (err, result, _) => {
                        if(err) {
                            reject({msg: err, status: 500});
                        }

                        if(result.affectedRows) {
                            resolve({ msg: "Successfully saved the collection", status: 200 });
                        }
                        reject({ msg: "Failed to save the collection", status: 500 });
                    });
                return;
            }

            // insert new collection if user has no collections yet
            await this.conn.connection.execute(`
                    INSERT INTO collections(user_id, url_collections) 
                    VALUES (?, ?) `
                    , [user.id, `
                        [{\"id\": 1, 
                        \"name\": \"${fields.name}\", 
                        \"details\": \"${fields.details}\", 
                        \"img_url\": \"${img_url}\",
                        \"original_url\": \"${fields.originalUrl}\",
                        \"short_url\": \"${generated_short_string.string}\"}]
                    `],
                    (err, result, _) => {
                        if(err) {
                            reject({ msg: err, status: 200 });
                        }
                        if(result.affectedRows) {
                            resolve({ msg: "Successfully saved new collection", status: 200 });
                        }
                        reject({ msg: "Failed to save new collection", status: 500 });

            });

        });
    }
}

module.exports = DashboardModel;