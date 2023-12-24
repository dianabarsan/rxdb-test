import { RxDatabase } from 'rxdb';
import docs from '../data/data.json' assert { type: "json" };

const minify = (parent:any) => {
  let minify:any = {};
  const result = minify;
  while (parent) {
    Object.assign(minify, { _id: parent._id, parent: {} });
    console.log(minify);
    minify = minify.parent;
    parent = parent.parent;
  }
  return result;
}

export async function importData (db:RxDatabase<any, any>) {
  const contacts = [];
  const reports = [];
  for (const doc of docs as Array<{ type:string, parent:any, contact:any }>) {
    if (doc.type === 'data_record') {
      doc.contact = { _id: doc.contact._id, parent: minify(doc.contact.parent) };
      reports.push(doc);
    } else {
      doc.parent = minify(doc.parent);
      contacts.push(doc);
    }
  };

  await db.contacts.bulkInsert(contacts);
  await db.reports.bulkInsert(reports);
}
