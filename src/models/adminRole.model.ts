import { Entity, model, property } from '@loopback/repository';

/* eslint-disable @typescript-eslint/no-empty-interface */

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'public', table: 'admin_role' },
  },
})
export class AdminRole extends Entity {
  @property({
    type: Number,
    generated: true,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
    },
  })
  id: Number;

  @property({
    type: String,
    required: true,
    length: 30,
    postgresql: {
      columnName: 'role_name',
      dataType: 'character varying',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  rolename: String;

  @property({
    type: String,
    required: true,
    length: 30,
    postgresql: {
      columnName: 'description',
      dataType: 'character varying',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  description: String;

  @property({
    type: String,
    required: true,
    length: 30,
    postgresql: {
      columnName: 'policy',
      dataType: 'character varying',
      dataLength: 250,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  policy: String;

  @property({
    type: Boolean,
    required: true,
    postgresql: {
      columnName: 'active',
      dataType: 'boolean',
      nullable: 'YES',
    },
  })
  active?: Boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AdminRole>) {
    super(data);
  }
}

export interface AdminRoleRelations {
  // describe navigational properties here
}

export type AdminRoleWithRelations = AdminRole & AdminRoleRelations;
