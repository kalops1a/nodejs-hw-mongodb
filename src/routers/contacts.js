const express = require('express');
const ctrl = require('../controllers/contactsController');
const ctrlWrapper = require('../utils/ctrlWrapper');
const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getContacts));
router.get('/:contactId', ctrlWrapper(ctrl.getContact));
router.post('/', ctrlWrapper(ctrl.createContact));
router.patch('/:contactId', ctrlWrapper(ctrl.updateContact));
router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));

module.exports = router;