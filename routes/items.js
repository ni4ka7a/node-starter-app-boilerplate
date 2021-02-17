const express = require('express');
const { verifyUserToken } = require("../middleware/auth");
const router = express.Router();
const Item = require('../models/item.js');
const GenericManager = require('../managers/genericManager');

// TODO: add error handling
const itemManager = new GenericManager(Item);

async function getItems(req, res, next) {
    const items = await itemManager.getItems();
    res.status(200).send(items);
}

async function getItem(req, res, next) {
    const item = await itemManager.getItem(req.params.id);
    res.status(200).send(item);
}

async function updateItem(req, res, next) {
    const updated = await itemManager.updateItem(req.params.id, req.body);
    res.status(200).send(updated);
}

async function createItem(req, res, next) {
    const newItem = await itemManager.addItem(req.body);
    res.status(200).send(newItem);
}


router.get('/', getItems);
router.get('/:id', getItem);
router.put('/:id', updateItem);
router.post('/', createItem);

module.exports = router;
