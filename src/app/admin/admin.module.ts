import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { EmployeeItemsComponent } from './components/employee-items/employee-items.component';


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeItemsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AdminModule { }
