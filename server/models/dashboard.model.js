const Connection = require("../connection/mysql.connection");

class DashboardModel {
    constructor() {
        this.conn = Connection;
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
}

module.exports = DashboardModel;