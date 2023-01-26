const DashboardModel = require("../models/dashboard.model");
const randomstring  = require("randomstring");
const path = require("path");
const fs = require("fs");

const generateScreenshot = require("../modules/functions/generateScreenshot");
const { base_url } = require("../config");

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
            res.status(200).json({ data, base_url, status: 200 });
        }).catch(err => res.status(err.status).json(err));
    }

    #generatShortString = () => {
        /// generate short string t
        let random_string = "";
        try {
             random_string = randomstring.generate(15);
        } catch(err) {
            console.log(err);
            return { msg: err, status: 500 };
        }
        return { string: random_string, status: 200 };
    }

    saveCollection = (req, res) => {
        const fields = req.body;
        const user = req.user;

        // generate a random url string
        const generated_short_string = this.#generatShortString();
        if(generated_short_string.status === 500) {
            // return an error message if the generating ramdom string failed
            res.json(generated_short_string.status).json({ msg: generated_short_string.msg, status: generated_short_string.status });
        }

        // get the domain name of the given website
        const url =  new URL(fields.originalUrl);
        const domain_name = url.hostname;
        const pathname = path.join(__dirname, "../", `images/${user.username}/`);

        // this img_url will be stored in DB
        const img_url = `/images/${user.username}/${generated_short_string.string}`;

        // genereate given website screenshot
        generateScreenshot(fields.originalUrl, pathname, generated_short_string.string)
        .then(() => {
            
            this.dashboard.saveCollection(fields, img_url, user, generated_short_string)
            .then(data => {
                console.log(data);
                res.status(200).json({ msg: "Successlly saved the collection", status: 200 });
            })
            .catch(err => {
                // delete the image if saving collection fails
                fs.unlinkSync(pathname + domain_name + ".png");

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