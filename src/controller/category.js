const {
    getCategoryModel,
    getKategoriDetaiCountlModel,
    getKategoriDetailModel,
    createCategoryModel,
    getKategoriByIdModel,
    updateKategoriModel,
    deleteKategoriModel,
} = require("../model/category");

const CategoryController = {
    getCategory: async (req, res, next) => {
        try {
            let kategori = await getCategoryModel();
            let result = kategori.rows;
            return res.status(200).json({
                message: `Success get category controller`,
                data: result,
            });
        } catch (err) {
            console.log(err);
            return res
                .status(404)
                .json({ message: `Failed get category, in controller` });
        }
    },
    getKategoriById: async (req, res, next) => {
        try {
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: `params id invalid` });
            }
            let kategori = await getKategoriByIdModel(id);
            console.log("users controller");
            let result = kategori.rows;
            if (!result.length) {
                return res
                    .status(404)
                    .json({ message: `kategori not found or id ivalid` });
            }
            console.log(result);
            return res.status(200).json({
                message: `success get kategori by id controller`,
                data: result[0],
            });
        } catch (err) {
            console.log(err);
            return res
                .status(404)
                .json({ message: `failed get kategori by id, in controller` });
        }
    },
    getKategoriDetail: async (req, res, next) => {
        try {
            // check searchBy
            let searchBy;
            if (req.query.searchBy === "") {
                if (req.query.searchBy === "name") {
                    searchBy = req.query.searchBy;
                } else {
                    searchBy = "name";
                }
            } else {
                searchBy = "name";
            }

            // check sortBy
            let sortBy;
            if (req.query.sortBy === "") {
                if (
                    req.query.sortBy === "created_at" ||
                    req.query.sortBy === "updated_at"
                ) {
                    sortBy = req.query.sortBy;
                } else {
                    sortBy = "created_at";
                }
            } else {
                sortBy = "created_at";
            }

            // check sort
            let sort;
            if (req.query.sort === "") {
                if (req.query.sort === "ASC" || req.query.sort === "DESC") {
                    sort = req.query.sort;
                } else {
                    sort = "ASC";
                }
            } else {
                sort = "ASC";
            }

            let search = req.query.search || "";
            let limit = req.query.limit || 3;
            let offset = ((req.query.page || 1) - 1) * parseInt(limit);

            let data = { searchBy, search, sortBy, sort, limit, offset };

            let users = await getKategoriDetailModel(data);
            let count = await getKategoriDetaiCountlModel(data);
            let total = count.rowCount;
            let result = kategori.rows;
            let page_next;
            if (req.query.page == Math.round(total / parseInt(limit))) {
                page_next = 0;
            } else {
                page_next = parseInt(req.query.page) + 1;
            }
            let pagination = {
                page_total: Math.round(total / parseInt(limit)),
                page_prev: parseInt(req.query.page) + 1,
                page_next,
                total_data: total,
            };

            return res.status(200).json({
                message: `success get users detail`,
                data: result,
                pagination,
            });
        } catch (err) {
            console.log("get users detail error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed get users detail Controller" });
        }
    },
    createCategory: async (req, res, next) => {
        try {
            let { id } = req.params;
            let { name } = req.body;
            if (!name || name === "") {
                return res.json({ code: 404, message: "input invalid" });
            }
            if (!id || id === 0) {
                return res.json({ code: 404, message: "input invalid" });
            } else if (id) {
                id + 1;
            }

            let data = {
                id,
                name,
            };
            let result = await createCategoryModel(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success input data" });
            }
            return res
                .status(401)
                .json({ code: 401, message: `failed input data` });
        } catch (err) {
            console.log(err);
            return res
                .status(404)
                .json({ message: `failed create kategori in controller` });
        }
    },
    updateKategori: async (req, res, next) => {
        try {
            // check param & body
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: `params invalid` });
            }
            let { first_name, last_name, age, address } = req.body;

            // check users
            let kategori = await getKategoriByIdModel(id);
            let resultKategori = kategori.rows;
            if (!resultKategori.length) {
                return res
                    .status(404)
                    .json({ message: `kategori not found or id invalid` });
            }
            let newKategori = resultKategori[0];
            let data = {
                id,
                name: name || newKategori.name,
            };
            let result = await updateKategoriModel(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success kategori data" });
            }
            return res
                .status(401)
                .json({ code: 401, message: "failed kategori data" });
        } catch (err) {
            console.log(err);
            return res
                .status(404)
                .json({ message: `failed update kategori in controller` });
        }
    },
    deleteKategori: async (req, res, next) => {
        try {
            let id = req.params.id;
            let kategori = await deleteKategoriModel(id);
            let dataKategori = kategori.rows;
            if (!dataKategori) {
                return res
                    .status(404)
                    .json({ message: `kategori by id not found or id ivalid` });
            }
            return res
                .status(200)
                .json({ message: `delete kategori by id with ${id} success` });
        } catch (err) {
            console.log(err);
            return res.status(404).json({
                message: `delete kategori by id failed, in controller`,
            });
        }
    },
};

module.exports = CategoryController;
