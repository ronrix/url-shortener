module.exports = (sequelize, DataTypes) => {
    const Collection = sequelize.define("Collection", {
        user_id: DataTypes.INTEGER,
        url_collections: DataTypes.JSON
    });

    return Collection;
}