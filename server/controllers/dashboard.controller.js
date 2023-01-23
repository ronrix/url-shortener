const DashboardModel = require("../models/dashboard.model");

class DashboardController {
    constructor() {
        this.dashboard = new DashboardModel();
    }

    index = (req, res) => {
        const user = req.user;
        this.dashboard.getUserInfo(user).then(data => {
            res.status(200).json({ data, status: 200});
        }).catch(err => {
            res.status(err.status).json(err);
        });
    }

    getCollections = (req, res) => {
        const user = req.user;
        this.dashboard.getUserCollections(user).then(data => {
            console.log(data);
            res.status(200).json({ data, status: 200 });
        }).catch(err => res.status(err.status).json(err));
    }
}

module.exports = new DashboardController();