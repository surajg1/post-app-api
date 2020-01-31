const express = require("express");
const multer = require("multer");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/fileMulter');

const postController = require('../controller/posts')

router.post("", checkAuth, extractFile, postController.createPost);

router.put("/:id", checkAuth, extractFile, postController.updatePost)

router.get('', postController.getPost);

router.get("/:id", postController.getOnePost);

router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;
