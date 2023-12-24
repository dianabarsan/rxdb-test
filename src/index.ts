import { createRxDatabase, RxDatabase } from 'rxdb';
// import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';

import { contactSchema, reportSchema, DatabaseCollections } from './types.js';
import { importData } from './import-data.js';
import contacts_by_parent from './queries/contacts_by_parent.js';

// global window

const setupDb = async ():Promise<RxDatabase<any, any>> => {
  const database = await createRxDatabase<DatabaseCollections>({
    name: 'medic',
    // storage: getRxStorageDexie(),
    storage: getRxStorageMemory(),
  });
  await database.addCollections({
    //@ts-ignore
    contacts: { schema: contactSchema },
    //@ts-ignore
    reports: { schema: reportSchema }
  });

  return database;
};

(async () => {
  const database:DatabaseCollections = await setupDb();
  console.log('importing data');
  await importData(database);
  console.log('imported data');

  // @ts-ignore
  window.database = database;

  const queries = {
    contacts_by_parent: contacts_by_parent
  };
  // @ts-ignore
  window.queries = queries;

  console.log(await contacts_by_parent(database, ['38e7c2f5-2c80-5822-84eb-2930fa65baea', 'a1e164af-8bd0-5e90-8ca4-a134b097078d'], 'clinic'));
  console.log(await contacts_by_parent(database, ['38e7c2f5-2c80-5822-84eb-2930fa65baea', 'a1e164af-8bd0-5e90-8ca4-a134b097078d', 'c1aec399-720c-5aed-8fa7-95fcffae5edd'], 'person'));

  console.log(await database.contacts.find({ selector: {
    '$and': [
      // @ts-ignore
      { type: 'clinic' },
      // @ts-ignore
      { 'parent._id': { '$in': ["38e7c2f5-2c80-5822-84eb-2930fa65baea", "a1e164af-8bd0-5e90-8ca4-a134b097078d"] } }
    ] } }).exec());

  // @ts-ignore
  const contacts = await database.contacts.find({ selector: { patient_id: '80012' } as ContactDocType }).exec();
  // @ts-ignore
  console.log(await database.reports.find({ selector: { 'fields.patient_uuid': '9925008f-9c5c-5603-8550-40f609bd61e14' }}).exec());

  // @ts-ignore
  addEventListener("unload", () => database.destroy());
})();
