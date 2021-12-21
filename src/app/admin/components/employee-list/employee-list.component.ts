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
      dui: '123',
      names: 'Christian',
      lastnames: 'Guevara',
      email: 'Christian@email.com',
    },
    {
      dui: '123',
      names: 'Christian',
      lastnames: 'Guevara',
      email: 'Christian@email.com',
    },
    {
      dui: '123',
      names: 'Christian',
      lastnames: 'Guevara',
      email: 'Christian@email.com',
    },
    {
      dui: '123',
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
