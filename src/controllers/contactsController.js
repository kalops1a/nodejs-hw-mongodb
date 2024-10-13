const fs = require('fs');
const path = require('path');
const Contact = require('../models/contactModel');
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');


const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(createError(500, 'Internal server error')); 
  }
};


const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw createError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error); 
  }
};


const createContact = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    const newContact = new Contact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });
    await newContact.save();

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(createError(500, 'Internal server error'));
  }
};


const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updateData = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};


const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(204).send(); 
  } catch (error) {
    next(error);
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
      updatedAt: new Date(contact.updatedAt),
    }));

    await Contact.insertMany(contactsWithId);
    console.log('Contacts imported successfully!');
  } catch (error) {
    console.error('Error importing contacts:', error.message);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact, 
  updateContact, 
  deleteContact, 
  importContacts,
};
