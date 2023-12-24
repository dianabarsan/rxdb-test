import { DatabaseCollections, ContactDocType } from '../types.js';

export default async function (database:DatabaseCollections, parentId:string|Array<string>, type?:string) {
  let selector: any;
  if (type) {
    selector = {
      '$and': [
        { 'parent._id': { '$in': Array.isArray(parentId) ? parentId : [parentId] } },
        { '$or': [ { type }, { contact_type: type } ] }
      ],
    };
  } else {
    selector = { 'parent._id': { '$in': Array.isArray(parentId) ? parentId : [parentId] } };
  }

  const st = Date.now();
  const contacts = await database.contacts.find({ selector: selector as ContactDocType }).exec();
  console.log('query', 'contacts_by_parent', selector, Date.now() - st);
  return contacts;
};
