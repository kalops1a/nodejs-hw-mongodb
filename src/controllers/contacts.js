const contactsService = require('../services/contacts');
const createError = require('http-errors');

const getAllContacts = async (req, res, next) => {
  const contacts = await contactsService.getAll();
  res.json({ status: 'success', data: contacts });
};

const getContactById = async (req, res, next) => {
  const contact = await contactsService.getById(req.params.contactId);
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  res.json({ status: 'success', data: contact });
};

const createContact = async (req, res, next) => {
  const newContact = await contactsService.create(req.body);
  res.status(201).json({ status: 'success', message: 'Successfully created a contact!', data: newContact });
};

const updateContact = async (req, res, next) => {
  const updatedContact = await contactsService.update(req.params.contactId, req.body);
  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }
  res.json({ status: 'success', message: 'Successfully patched a contact!', data: updatedContact });
};

const deleteContact = async (req, res, next) => {
  const result = await contactsService.delete(req.params.contactId);
  if (!result) {
    throw createError(404, 'Contact not found');
  }
  res.status(204).send();
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};