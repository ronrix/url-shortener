const DashboardModel = require("../dashboard.model");
const randomstring  = require("randomstring");
const path = require("path");
const fs = require("fs");
const { User, Collection } = require("../models");

const generateScreenshot = require("../modules/functions/generateScreenshot");
const { base_url } = require("../config");

class DashboardController {
    constructor() {
        this.dashboard = new DashboardModel();
    }

    index = async (req, res) => {
        const user = req.user;
        try {
            const user_data = await User.findOne({ attributes: ["username", "img_path", "email", "is_google_auth"], where: { id: user.user_id }});
            res.status(200).json({ ...user_data.dataValues, base_url, status: 200 });
        } catch(err) {
            console.log(err);
            res.status(500).json({ msg: err, status: 500 });
        }
    }

    getCollections = async (req, res) => {
        const user = req.user;

        try {
            const collections = await Collection.findOne({ where: { user_id: user.user_id }})
            res.status(200).json({ data: collections, base_url, status: 200 });
        } catch(err) {
            console.log(err);
            res.status(500).json({ msg: err, status: 500 });
        }
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
        const pathname = path.join(__dirname, "../", `images/${user.user_id}/`);

        // this img_url will be stored in DB
        const img_url = `/images/${user.user_id}/${generated_short_string.string}`;

        // genereate given website screenshot
        generateScreenshot(fields.originalUrl, pathname, generated_short_string.string)
        .then(async () => {

            try {
                // check if user already has a collection table
                const user_collections = await Collection.findOne({ where: { user_id: user.user_id }});
                if(user_collections) {
                    // create new variable to store url_collections and just append the new data to collection variable
                    // then update the table with this new data
                    const collections = user_collections.url_collections;
                    collections.push({ id: collections.length + 1, name: fields.name, details: fields.details, img_url, original_url: fields.originalUrl, short_url: generated_short_string.string, createdAt: new Date(), updatedAt: null });
                    await Collection.update({ url_collections: collections });
                    
                    res.status(200).json({ msg: "Successfully created new collection", status: 200 });
                    return;
                }

                // save the data to the table
                await Collection.create({ user_id: user.user_id, url_collections: [{ id: 1, name: fields.name, details: fields.details, img_url, original_url: fields.originalUrl, short_url: generated_short_string.string }] });

                res.status(200).json({ msg: "Successfully saved new collection", status: 200 });
            } catch(err) {
                console.log(err);

                // delete the image if saving collection fails
                fs.unlinkSync(pathname + domain_name + ".png");

                res.status(500).json({ msg: err, status: 500 });
            }

        })
        .catch(err => {
            console.log("Error gnenerating screenshot: ", err);
            res.status(500).json({ msg: err, status: 500 });
        })
    }
}

module.exports = new DashboardController();