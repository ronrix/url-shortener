const DashboardModel = require("../models/dashboard.model");
const randomstring  = require("randomstring");
const path = require("path");

const generateScreenshot = require("../modules/functions/generateScreenshot");

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

    saveCollection = (req, res) => {
        const fields = req.body;
        const user = req.user;

        // get the domain name of the given website
        const url =  new URL(fields.originalUrl);
        const domain_name = url.hostname;
        const pathname = path.join(__dirname, "../", `images/${user.username}/`);

        // this img_url will be stored in DB
        const img_url = `/images/${user.username}/domain_name`;

        // genereate given website screenshot
        generateScreenshot(fields.originalUrl, pathname, domain_name)
        .then(() => {
            
            this.dashboard.saveCollection(fields, img_url+ domain_name, user)
            .then(data => {
                console.log(data);
                res.status(200).json({ msg: "Successlly saved the collection", status: 200 });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ msg: err, status: 500 });
            });

        })
        .catch(err => {
            console.log("Error gnenerating screenshot: ", err);
            res.status(500).json({ msg: err, status: 500 });
        })
    }
}

module.exports = new DashboardController();