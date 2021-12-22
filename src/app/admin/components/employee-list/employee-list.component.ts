import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '@core/models/employee.model';
import { EmployeesService } from '@core/services/employees.service';
import { catchError } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private router: Router,
    private employeesService: EmployeesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeesService
      .getAllEmployees()
      .pipe(
        catchError((error) => {
          console.log(error);
          return [];
        })
      )
      .subscribe((employees) => {
        this.employees = employees;
      });
  }
  addEmployee() {
    this.router.navigate(['/admin/create']);
  }

  logOut() {
    this.authService.logOut().subscribe((data) => console.log(data));
  }

  deleteEmployee(dui: string) {
    const employeeDui = parseInt(dui);

    this.employeesService
      .deleteEmployee(employeeDui)
      .subscribe((employee) => {});
    this.getEmployees();
  }
}
