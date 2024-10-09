const express = require('express');
const cors = require('cors');
const pino = require('pino-http')();
const { initMongoConnection } = require('./db/initMongoConnection');

const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(pino);
  app.use(express.json());

  app.get('/contacts', require('./controllers/contactsController').getContacts);
  app.get('/contacts/:contactId', require('./controllers/contactsController').getContact);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
};

module.exports = setupServer;
