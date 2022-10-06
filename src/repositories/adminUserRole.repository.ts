import { DefaultCrudRepository } from '@loopback/repository';
import { AdminUserRole, AdminUserRoleRelations } from '../models';
import { TreetrackerDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class AdminUserRoleRepository extends DefaultCrudRepository<
  AdminUserRole,
  typeof AdminUserRole.prototype.id,
  AdminUserRoleRelations
> {
  constructor(
    @inject('datasources.treetracker') dataSource: TreetrackerDataSource,
  ) {
    super(AdminUserRole, dataSource);
  }
}
