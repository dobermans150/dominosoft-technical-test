import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '@core/models/employee.model';

@Component({
  selector: 'app-employee-items',
  templateUrl: './employee-items.component.html',
  styleUrls: ['./employee-items.component.css'],
})
export class EmployeeItemsComponent implements OnInit {
  @Input() employee: Employee = {} as Employee;
  @Output() deleteEmployee = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewDetail() {
    this.router.navigate([`/admin/${this.employee.dui}`]);
  }

  delete() {
    const dui = this.employee.dui?.toString() || '';
    this.deleteEmployee.emit(dui);
  }
}
