import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '@core/models/employee.model';

@Component({
  selector: 'app-employee-items',
  templateUrl: './employee-items.component.html',
  styleUrls: ['./employee-items.component.css'],
})
export class EmployeeItemsComponent implements OnInit {
  @Input() employee: Employee = {};

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewDetail() {
    this.router.navigate([`/admin/${this.employee.dui}`]);
  }
}
