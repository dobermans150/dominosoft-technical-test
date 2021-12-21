import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '@core/models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [
    {
      uuid: '8c9bfa6f-bd70-498a-b832-346d92884f84',
      dui: 123,
      names: 'Christian',
      lastnames: 'Guevara',
      email: 'Christian@email.com',
    },
    {
      uuid: '8c9bfa6f-bd70-498a-b832-346d92884f84',
      dui: 1234,
      names: 'Christian',
      lastnames: 'Guevara',
      email: 'Christian@email.com',
    },
    {
      uuid: '8c9bfa6f-bd70-498a-b832-346d92884f84',
      dui: 4321,
      names: 'Christian',
      lastnames: 'Guevara',
      email: 'Christian@email.com',
    },
    {
      uuid: '8c9bfa6f-bd70-498a-b832-346d92884f84',
      dui: 555,
      names: 'Christian',
      lastnames: 'Guevara',
      email: 'Christian@email.com',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  addEmployee() {
    this.router.navigate(['/admin/create']);
  }
}
