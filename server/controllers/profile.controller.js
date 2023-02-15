const fs = require("fs");
const path = require("path");

const { User } = require("../models");
const bcrypt = require("bcrypt");
const generateDefaultAvatar = require("../modules/functions/generateDefaultAvatar");

class ProfileController {
    constructor() {}

    edit = async (req, res) => {
        const user = req.user;
        const fields = req.body;
        
        try {
           await User.update({ username: fields.username, email: fields.email }, { where: { id: user.user_id }});
            res.status(200).json({ msg: "success", status: 200 });
        } catch(err) {
            res.status(500).json({ msg: err, status: 500 });
        }
    }

    updatePassword = async (req, res) => {
        const user = req.user;
        const fields = req.body;

        try {
            // check if the old password is correct
            const user_data = await User.findOne({ where: { id: user.user_id } });
            // return error message if suddenly the user doesn't exists
            if(!user) {
                res.status(404).json({ msg: "User not found!", status: 404 });
            }

            // check if old password is correct before change it with new password
            const is_valid = await bcrypt.compare(fields.old_password, user_data.dataValues.password);
            if(is_valid) {
                // update password
                const hashed_password = await bcrypt.hash(fields.new_password, 10);
                await User.update({ password: hashed_password }, { where: { id: user.user_id } });
                res.status(200).json({ msg: "success", status: 200 });
            }
        } catch(err) {
            console.log(err);
            res.status(500).json({ msg: err, status: 500 });
        }
    }

    avatar = (req, res) => {
        const user = req.user;
        const avatar = req.file.buffer;

        // creating an image path with the user's folder
        const dest = path.join(__dirname, "../images/", String(user.user_id));
        fs.writeFile(dest + "/" + req.file.originalname, avatar, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ msg: err, status: 500 });
            }

            // update the user's table and add the file path of the user's avatar
            const image_path = "/images/" + user.user_id + "/avatar.jpeg";

            try {
                await User.update({ img_path: image_path }, { where: { id: user.user_id }});
                // return the response to the client
                res.status(200).json({ msg: "success", status: 200 });
            } catch(err) {
                console.log(err);
                res.status(500).json({ msg: err, status: 200 });
            }

        });
    }

    setAvatarBackToDefault = async (req, res) => {
        const user = req.user;

        try {
            // adding generated avatar
            const avatar = generateDefaultAvatar();
            await User.update({ img_path: avatar }, { where: { id: user.user_id }});
            res.status(200).json({ msg: "success", status: 200 });
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: err, status: 500 });
        }
    }
}

module.exports = new ProfileController();