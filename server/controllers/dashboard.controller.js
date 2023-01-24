const DashboardModel = require("../models/dashboard.model");
const randomstring  = require("randomstring");

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

    generatShortString = (req, res) => {
        const user = req.user;

        /// generate short string t
        try {
            const randomString = randomstring.generate(10);
            console.log(randomString);
            res.status(200).json({ generatedUrl: randomString, status: 200 });
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: "Something went wrong generating short url", status: 500 });
        }
    }
}

module.exports = new DashboardController();