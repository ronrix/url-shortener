const Connection = require("../connection/mysql.connection");
const FormValidation = require("../modules/validation/Validation");

class DashboardModel {
    constructor() {
        this.conn = Connection;
        this.formValidation = new FormValidation();
    }

    getUserInfo(user) {
        return new Promise(async (resolve, reject) => {
            await this.conn.connection.execute("SELECT username, img_path FROM users WHERE id=?", [user.id], (err, result, _) => {
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

    saveCollection(fields, img_url, user) {
        console.log(user);

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
                    `, [user.id, user.id, fields.name, fields.details, img_url, fields.originalUrl, fields.shortUrl, new Date(), null], (err, result, _) => {
                        if(err) {
                            reject({msg: err, status: 500});
                        }

                        console.log(result);
                    });
                return;
            }

            // insert new collection if user has no collections yet

        });
    }
}

module.exports = DashboardModel;