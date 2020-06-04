let express = require("express");
let router = express.Router();
let ComprensionLectoraController = require("../../controllers/comprensionLectora");
let authenticateJWT = require("../../services/auth/authenticateJWT");

router.get("/", authenticateJWT, ComprensionLectoraController.getNivel);

module.exports = router;
