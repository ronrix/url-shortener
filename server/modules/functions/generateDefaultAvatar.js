const avatars = ["avatar-1.png", 'avatar-2.jpg'];

function generateDefaultAvatar() {
    const id = Math.floor(Math.random() * avatars.length);
    return "/images/default/" + avatars[id];
}

module.exports = generateDefaultAvatar;