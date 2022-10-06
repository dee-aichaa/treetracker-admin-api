import { Entity, model, property } from '@loopback/repository';

/* eslint-disable @typescript-eslint/no-empty-interface */

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'public', table: 'admin_user' },
  },
})
export class AdminUser extends Entity {
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
      columnName: 'user_name',
      dataType: 'character varying',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  userName: String;

  @property({
    type: String,
    required: true,
    length: 30,
    postgresql: {
      columnName: 'first_name',
      dataType: 'character varying',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  firstName: String;

  @property({
    type: String,
    required: true,
    length: 30,
    postgresql: {
      columnName: 'last_name',
      dataType: 'character varying',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  lastName: String;

  @property({
    type: String,
    length: 30,
    required: false,
    postgresql: {
      columnName: 'password_hash',
      dataType: 'character varying',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  passwordHash: String;

  @property({
    type: String,
    length: 30,
    required: false,
    postgresql: {
      columnName: 'salt',
      dataType: 'character varying',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  salt: String;

  @property({
    type: String,
    required: false,
    postgresql: {
      columnName: 'email',
      dataType: 'character varying',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  email?: String;

  @property({
    type: Boolean,
    required: true,
    postgresql: {
      columnName: 'active',
      dataType: 'boolean',
    },
  })
  active?: Boolean;

  @property({
    type: Boolean,
    required: true,
    postgresql: {
      columnName: 'enabled',
      dataType: 'boolean',
      nullable: 'YES',
    },
  })
  enabled?: Boolean;

  @property({
    type: String,
    required: true,
    postgresql: {
      columnName: 'created_at',
      dataType: 'timestamptz',
      nullable: 'NO',
    },
  })
  createdAt: String;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AdminUser>) {
    super(data);
  }
}

export interface AdminUserRelations {
  // describe navigational properties here
}

export type AdminUserWithRelations = AdminUser & AdminUserRelations;
