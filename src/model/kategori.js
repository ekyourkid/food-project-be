const Pool = require("../config/db");

const getKategoriModel = async () => {
    console.log("model - get kategori model");
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM kategori`, (err, res) => {
            if (!err) {
                return resolve(res);
            } else {
                console.log(`error db -`, err);
                reject(err);
            }
        })
    );
};

const getKategoriByIdModel = async (id) => {
    console.log("model - get id kategori");
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM kategori WHERE id='${id}'`, (err, res) => {
            if (!err) {
                return resolve(res);
            } else {
                console.log(`error db -`, err);
                reject(err);
            }
        });
    });
};

const getKategoriDetailModel = async (data) => {
    console.log(`model - get users detail`);
    let { searchBy, search, sortBy, sort, limit, offset } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
            `SELECT * FROM kategori WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`,
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

const getKategoriDetaiCountlModel = async (data) => {
    console.log(`model - get kategori detail count`);
    let { searchBy, search } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
            `SELECT * FROM kategori WHERE ${searchBy} ILIKE '%${search}%'
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

const createKategoriModel = async (data) => {
    console.log("model - create kategori");
    let { id, name } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
            `INSERT INTO kategori (id,name ) VALUES('${id}', '${name}', NOW())`,
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

const updateKategoriModel = async (data) => {
    console.log(`model - update kategori`);
    let { id, name } = data;
    return new Promise((resolve, reject) => {
        Pool.query(
            `UPDATE kategori SET updated_at=NOW(), name='${name}' WHERE id='${id}'`,
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

const deleteKategoriModel = async (id) => {
    console.log(`model - delete id kategori`);
    return new Promise((resolve, reject) => {
        Pool.query(`DELETE FROM kategori WHERE id='${id}'`, (err, res) => {
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
    getKategoriModel,
    getKategoriByIdModel,
    getKategoriDetailModel,
    getKategoriDetaiCountlModel,
    createKategoriModel,
    updateKategoriModel,
    deleteKategoriModel,
};
