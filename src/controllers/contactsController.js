const Contact = require('../models/contactModel');

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ status: 200, message: 'Successfully found contacts!', data: contacts });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getContacts, getContact };
