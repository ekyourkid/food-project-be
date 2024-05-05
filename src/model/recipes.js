const Pool = require("../config/db");

const getRecipeDetailModel = async (data) => {
    let { searchBy, search, sortBy, sort, limit, offset } = data;
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
    return new Promise((resolve, reject) =>
        Pool.query(
            `SELECT * FROM recipe ORDER BY created_at DESC`,
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
const getRecipeByAuthorModel = async (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(
            `SELECT recipe.id,recipe.title,recipe.ingredient,recipe.photo,recipe.created_at,recipe.updated_at,category.name as category, users.email as author FROM recipe JOIN category ON recipe.category_id=category_id JOIN users ON recipe.users_id=users.id WHERE recipe.id='${id}'`,
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

const getRecipeByIdModel = async (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(
            `SELECT recipes.id,recipes.title,recipes.ingredient,recipes.photo,recipes.created_at,recipes.updated_at,recipes.category_id,category.name as category,recipes.users_id, users.email as author FROM recipes JOIN category ON recipes.category_id=category_id JOIN users ON recipes.users_id=users.id WHERE recipes.id='${id}'`,
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

const createRecipeModel = async (data) => {
    let { id, title, ingredient, photo, users_id, category_id } = data;
    console.log(data);
    return new Promise((resolve, reject) =>
        Pool.query(
            `INSERT INTO recipe (id,title,ingredient,photo,created_at,users_id,category_id) VALUES ('${id}','${title}','${ingredient}','${photo}',NOW(),'${users_id}',${category_id});`,
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
    let { id, title, ingredient, photo, category_id } = data;
    console.log(data);
    return new Promise((resolve, reject) =>
        Pool.query(
            `UPDATE recipe SET updated_at=NOW(), title='${title}', ingredient='${ingredient}', photo='${photo}', category_id=${category_id} WHERE id='${id}'`,
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
    getRecipeByAuthorModel,
    createRecipeModel,
    updateRecipeModel,
    getRecipeDetailModel,
    getRecipeDetailCountModel,
    deleteRecipeModel,
};
