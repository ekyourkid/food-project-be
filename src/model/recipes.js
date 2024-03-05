const Pool = require("../config/db");

const getRecipeDetailModel = async (data) => {
    let { searchBy, search, sortBy, sort, limit, offset } = data;
    console.log("model - getRecipeDetailModel");
    return new Promise((resolve, reject) =>
        Pool.query(
            `SELECT * FROM recipe WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`,
            (err, res) => {
                if (!err) {
                    return resolve(res);
                } else {
                    console.log(`error db -`, err);
                    reject(err);
                }
            }
        )
    );
};
const getRecipeDetailCountModel = async (data) => {
    let { searchBy, search } = data;
    console.log("model - getRecipeDetailCountModel");
    return new Promise((resolve, reject) =>
        Pool.query(
            `SELECT * FROM recipe WHERE ${searchBy} ILIKE '%${search}%'`,
            (err, res) => {
                if (!err) {
                    return resolve(res);
                } else {
                    console.log(`error db -`, err);
                    reject(err);
                }
            }
        )
    );
};
const getRecipeModel = async () => {
    console.log("model - getrecipeModel");
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipe`, (err, res) => {
            if (!err) {
                return resolve(res);
            } else {
                console.log(`error db -`, err);
                reject(err);
            }
        })
    );
};
const getRecipeByIdModel = async (id) => {
    console.log("model - getRecipeByIdModel");
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipe WHERE id='${id}'`, (err, res) => {
            if (!err) {
                return resolve(res);
            } else {
                console.log(`error db -`, err);
                reject(err);
            }
        })
    );
};

const createRecipeModel = async (data) => {
    console.log("model - createRecipe");
    let { id, title, ingredient, photo } = data;
    console.log(data);
    return new Promise((resolve, reject) =>
        Pool.query(
            `INSERT INTO recipe (id,title,ingredient,photo,created_at) VALUES ('${id}','${title}','${ingredient}','${photo}',NOW());`,
            (err, res) => {
                if (!err) {
                    return resolve(res);
                } else {
                    console.log(`error db -`, err);
                    reject(err);
                }
            }
        )
    );
};

const updateRecipeModel = async (data) => {
    console.log("model - updateRecipe");
    let { id, title, ingredient, photo } = data;
    console.log(data);
    return new Promise((resolve, reject) =>
        Pool.query(
            `UPDATE recipe SET updated_at=NOW(), title='${title}', ingredient='${ingredient}', photo='${photo}' WHERE id='${id}'`,
            (err, res) => {
                if (!err) {
                    return resolve(res);
                } else {
                    console.log(`error db -`, err);
                    reject(err);
                }
            }
        )
    );
};

const deleteRecipeModel = async (id) => {
    console.log(`model - delete id recipe`);
    return new Promise((resolve, reject) => {
        Pool.query(`DELETE FROM recipe WHERE id='${id}'`, (err, res) => {
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
    getRecipeModel,
    getRecipeByIdModel,
    createRecipeModel,
    updateRecipeModel,
    getRecipeDetailModel,
    getRecipeDetailCountModel,
    deleteRecipeModel,
};
