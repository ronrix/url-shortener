const ProfileModel = require("../models/profile.model");

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
}

module.exports = new ProfileController();