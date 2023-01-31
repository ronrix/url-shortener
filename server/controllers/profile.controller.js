const ProfileModel = require("../models/profile.model");
const fs = require("fs");
const path = require("path");
const { base_url } = require("../config");

class ProfileController {
    constructor() {
        this.profile = new ProfileModel();
    }

    edit = (req, res) => {
        const user = req.user;
        const fields = req.body;

        this.profile.updateProfile(user, fields).then(response => {
            console.log(response);
            res.status(200).json(response);
        }).catch(err => {
            console.log(err);
            res.status(err.status).json(err);
        });
    }

    updatePassword = (req, res) => {
        const user = req.user;
        const fields = req.body;

        this.profile.updatePassword(user, fields) .then(response => {
            console.log(response);
            res.status(200).json(response);
        }).catch(err => {
            console.log(err)
            res.status(err.status).json(err);
        })
    }

    avatar = (req, res) => {
        const user = req.user;
        const avatar = req.file.buffer;

        // creating an image path with the user's folder
        const dest = path.join(__dirname, "../images/", user.username);
        fs.writeFile(dest + "/" + req.file.originalname, avatar, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ msg: err, status: 500 });
            }

            // update the user's table and add the file path of the user's avatar
            const image_path = "/images/" + user.username + "/avatar.jpeg";
            this.profile.updateAvatar(image_path, user.id)
            .then(data => {
                // return the response to the client
                res.status(200).json({...data, avatar: image_path, base_url });
            })
            .catch(err => {
                res.status(500).json({ msg: err, status: 200 });
            });

        });
    }
}

module.exports = new ProfileController();