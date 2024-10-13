const Contact = require('../models/contactModel'); 

const getContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};


const updateContactService = async (contactId, data) => {
  return Contact.findByIdAndUpdate(contactId, data, { new: true });
};


const deleteContactService = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};

module.exports = {
  getContacts,
  getContactById,
  updateContactService, 
  deleteContactService, 
};
