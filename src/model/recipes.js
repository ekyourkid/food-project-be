const Pool = require("../config/db");

const getRecipesModel = async () => {
    console.log("model - getRecipesModel");
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM recipe`, (err, res) => {
            if (!err) {
                return resolve(res);
            } else {
                console.log(`error db -`, err);
                reject(err);
            }
        });
    });
};

module.exports = { getRecipesModel };
