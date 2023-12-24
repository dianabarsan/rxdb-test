import { RxCollection, RxJsonSchema, toTypedRxJsonSchema, ExtractDocumentTypeFromTypedRxJsonSchema } from 'rxdb';

import { contactSchema as contactSchemaLiteral, reportSchema as reportSchemaLiteral } from './schema.js';

const contactSchemaTyped = toTypedRxJsonSchema(contactSchemaLiteral);
const reportSchemaTyped = toTypedRxJsonSchema(reportSchemaLiteral);
export type ContactDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof contactSchemaTyped>;
export type ReportDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof reportSchemaTyped>;
export const contactSchema: RxJsonSchema<ContactDocType> = contactSchemaLiteral;
export const reportSchema: RxJsonSchema<ReportDocType> = reportSchemaLiteral;

export type ContactCollectionMethods = {};
export type ContactDocMethods = {};
export type ContactCollection = RxCollection<ContactDocType, ContactDocMethods, ContactCollectionMethods>;

export type ReportCollectionMethods = {};
export type ReportDocMethods = {};
export type ReportCollection = RxCollection<ReportDocType, ReportDocMethods, ReportCollectionMethods>;

export type DatabaseCollections = {
  contacts: ContactCollection,
  reports: ReportCollection,
};
