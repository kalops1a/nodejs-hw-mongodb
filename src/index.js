const setupServer = require('./server');
const { initMongoConnection } = require('./db/initMongoConnection');
const { importContacts } = require('./controllers/contactsController'); 

const startApp = async () => {
  await initMongoConnection();

  await importContacts(); 

  setupServer();
};

startApp().catch(err => console.error(err));
