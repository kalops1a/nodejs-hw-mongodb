const fs = require('fs');
const path = require('path');
const Contact = require('../models/contactModel');
const { v4: uuidv4 } = require('uuid'); 

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

const importContacts = async () => {
  try {
    const filePath = path.join(__dirname, '../contacts.json'); 
    const data = fs.readFileSync(filePath);
    const contacts = JSON.parse(data);

    
    const contactsWithId = contacts.map(contact => ({
      ...contact,
      id: uuidv4(), 
      createdAt: new Date(contact.createdAt), 
      updatedAt: new Date(contact.updatedAt)  
    }));

    await Contact.insertMany(contactsWithId);
    console.log('Contacts imported successfully!');
  } catch (error) {
    console.error('Error importing contacts:', error.message);
  }
};

module.exports = { getContacts, getContact, importContacts };
