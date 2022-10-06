import { Entity, model, property } from '@loopback/repository';

/* eslint-disable @typescript-eslint/no-empty-interface */

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'public', table: 'admin_user_role' },
  },
})
export class AdminUserRole extends Entity {
  @property({
    type: Number,
    required: true,
    scale: 0,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id: Number;

  @property({
    type: Number,
    required: false,
    jsonSchema: {
      nullable: true,
    },
    scale: 0,
    postgresql: {
      columnName: 'role_id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  roleId?: Number;

  @property({
    type: Number,
    required: false,
    jsonSchema: {
      nullable: true,
    },
    scale: 0,
    postgresql: {
      columnName: 'admin_user_id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  adminUserId?: Number;

  @property({
    type: Boolean,
    required: true,
    postgresql: {
      columnName: 'active',
      dataType: 'boolean',
    },
  })
  active?: Boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AdminUserRole>) {
    super(data);
  }
}

export interface AdminUserRoleRelations {
  // describe navigational properties here
}

export type AdminUserRoleWithRelations = AdminUserRole & AdminUserRoleRelations;
