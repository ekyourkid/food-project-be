const express = require("express");
const KategoriController = require("../controller/kategori");
const router = express.Router();

router.get("/", KategoriController.getKategori);
router.get("/detail", KategoriController.getKategoriDetail);
router.get("/:id", KategoriController.getKategoriById);
router.post("/", KategoriController.createKategori);
router.put("/:id", KategoriController.updateKategori);
router.delete("/:id", KategoriController.deleteKategori);
module.exports = router;
