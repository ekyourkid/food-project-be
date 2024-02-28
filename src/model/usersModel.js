const Pool = require("../config/db");

const getUsersModel = async () => {
    console.log("model - getUsersModel");
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM users`, (err, res) => {
            if (!err) {
                return resolve(res);
            } else {
                console.log(`error db -`, err);
                reject(err);
            }
        });
    });
};

module.exports = { getUsersModel };
