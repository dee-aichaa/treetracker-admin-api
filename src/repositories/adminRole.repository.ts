import { DefaultCrudRepository } from '@loopback/repository';
import { AdminRole, AdminRoleRelations } from '../models';
import { TreetrackerDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class AdminRoleRepository extends DefaultCrudRepository<
  AdminRole,
  typeof AdminRole.prototype.id,
  AdminRoleRelations
> {
  constructor(
    @inject('datasources.treetracker') dataSource: TreetrackerDataSource,
  ) {
    super(AdminRole, dataSource);
  }
}
