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

const registerUsersModel = async (data) => {
    console.log(`model - register model users`);
    let { id, username, email, password, address, photo_profile } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
            `INSERT INTO users (id, username, email, password, address, created_at, photo_profile) VALUES('${id}','${username}','${email}','${password}','${address}',NOW(),'${photo_profile}')`,
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

const loginUserModel = async (email) => {
    console.log(`model - login model users`);
    return new Promise((resolve, reject) => {
        Pool.query(
            `SELECT * FROM users WHERE email='${email}' LIMIT 1`,
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
    let { id, username, email, password, address, photo_profile } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
            `UPDATE users SET updated_at=NOW(), username='${username}',email='${email}', password='${password}', address='${address}', photo_profile='${photo_profile}'  WHERE id='${id}'`,
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
    registerUsersModel,
    loginUserModel,
    updateUsersModel,
    deleteUserModel,
};
