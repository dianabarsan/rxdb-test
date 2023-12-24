export const contactSchema = {
  version: 0,
  primaryKey: '_id',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      maxLength: 100 // <- the primary key must have set maxLength
    },
    type: {
      type: 'string',
      maxLength: 20,
    },
    contact_type: {
      type: 'string',
      maxLength: 20,
    },
    patient_id: {
      type: 'string',
      maxLength: 20,
    },
    name: { type: 'string' },
    date_of_birth: { type: 'string' },
    phone: { type: 'string' },
    sex: { type: 'string' },
    reported_date: { type: 'string' },
    parent: {
      type: 'object',
      properties: {
        _id: { type: 'string', maxLength: 20, },
        parent: {
          type: 'object',
          properties: {
            _id: { type: 'string', maxLength: 20, },
            parent: {
              type: 'object',
              properties: {
                _id: { type: 'string', maxLength: 20, },
                parent: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string', maxLength: 20, },
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  required: ['_id', 'name', 'type', 'reported_date'],
  indexes: ['patient_id', 'type', 'contact_type', 'parent._id', 'parent.parent._id', 'parent.parent.parent._id'],
};

export const reportSchema = {
  version: 0,
  primaryKey: '_id',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      maxLength: 100 // <- the primary key must have set maxLength
    },
    type: { type: 'string' },
    form: { type: 'string', maxLength: 20, },
    reported_date: { type: 'number' },
    contact: {
      type: 'object',
      properties: {
        _id: { type: 'string', maxLength: 20, },
      }
    },
    fields: {
      type: 'object',
      properties: {
        patient_uuid: { type: 'string', maxLength: 20, },
        patient_name: { type: 'string' },
      }
    }
  },
  required: ['_id', 'form', 'reported_date'],
  indexes: ['fields.patient_uuid', 'form', 'contact._id'],
}
