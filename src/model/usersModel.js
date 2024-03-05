const Pool = require("../config/db");

const getUsersDetailModel = async (data) => {
    console.log(`model - get users detail`);
    let { searchBy, search, sortBy, sort, limit, offset } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
            `SELECT * FROM users WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`,
            (err, res) => {
                if (!err) {
                    return resolve(res);
                } else {
                    console.log(`error db -`, err);
                    reject(err);
                }
            }
        );
    });
};

const getUsersDetaiCountlModel = async (data) => {
    console.log(`model - get users detail count`);
    let { searchBy, search } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
            `SELECT * FROM users WHERE ${searchBy} ILIKE '%${search}%'
        `,
            (err, res) => {
                if (!err) {
                    return resolve(res);
                } else {
                    console.log(`error db -`, err);
                    reject(err);
                }
            }
        );
    });
};

const getUsersModel = async () => {
    console.log("model - get users");
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

const getUsersByIdModel = async (id) => {
    console.log("model - get id users");
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM users WHERE id='${id}'`, (err, res) => {
            if (!err) {
                return resolve(res);
            } else {
                console.log(`error db -`, err);
                reject(err);
            }
        });
    });
};

const createUsersModel = async (data) => {
    console.log("model - create users");
    let { id, first_name, last_name, age, address } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
            `INSERT INTO users (id,first_name,last_name,age,address,created_at ) VALUES('${id}', '${first_name}', '${last_name}', '${age}','${address}', NOW())`,
            (err, res) => {
                if (!err) {
                    return resolve(res);
                } else {
                    console.log(`error db -`, err);
                    reject(err);
                }
            }
        );
    });
};

const updateUsersModel = async (data) => {
    console.log(`model - update user`);
    let { id, first_name, last_name, age, address } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
            `UPDATE users SET updated_at=NOW(), first_name='${first_name}',last_name='${last_name}', age='${age}', address='${address}' WHERE id='${id}'`,
            (err, res) => {
                if (!err) {
                    return resolve(res);
                } else {
                    console.log(`error db -`, err);
                    reject(err);
                }
            }
        );
    });
};

const deleteUserModel = async (id) => {
    console.log(`model - delete id users`);
    return new Promise((resolve, reject) => {
        Pool.query(`DELETE FROM users WHERE id='${id}'`, (err, res) => {
            if (!err) {
                return resolve(res);
            } else {
                console.log(`error db - `, err);
                reject(err);
            }
        });
    });
};

module.exports = {
    getUsersModel,
    getUsersByIdModel,
    getUsersDetailModel,
    getUsersDetaiCountlModel,
    createUsersModel,
    updateUsersModel,
    deleteUserModel,
};
