import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor() {}

  getAllEmployees(): Observable<Employee[]> {
    const employees = JSON.parse(
      JSON.stringify(localStorage.getItem('employees'))
    );

    if (!employees) {
      return throwError(() => {
        const error: any = new Error('Not employees');
        error.describe = {
          status: 400,
          message: 'Not Employees',
        };

        return error;
      });
    }

    return employees as Observable<Employee[]>;
  }

  getEmployeeById(dui: number): Observable<Employee> {
    const employees: Employee[] = JSON.parse(
      JSON.stringify(localStorage.getItem('employees'))
    );

    const employee = employees
      ? employees.find((employee) => employee.dui === dui)
      : null;

    if (!employee) {
      return throwError(() => {
        const error: any = new Error('Employee not found');
        error.describe = {
          status: 400,
          message: 'Employee not found',
        };

        return error;
      });
    }

    return employee as Observable<Employee>;
  }

  updateEmployee(newEmployee: Employee) {
    const employees: Employee[] = JSON.parse(
      JSON.stringify(localStorage.getItem('employees'))
    );

    if (!employees) {
      return throwError(() => {
        const error: any = new Error('Not employees to update');
        error.describe = {
          status: 400,
          message: 'Not employees to update',
        };

        return error;
      });
    }

    const newEmployees = employees.map((employee) =>
      employee.dui === newEmployee.dui ? newEmployee : employee
    ) as unknown;

    localStorage.setItem('employees', JSON.stringify(newEmployees));

    return newEmployees as Observable<Employee[]>;
  }

  deleteEmployee(dui: number): Observable<Employee[]> {
    const employees: Employee[] = JSON.parse(
      JSON.stringify(localStorage.getItem('employees'))
    );

    if (!employees) {
      return throwError(() => {
        const error: any = new Error('Not employees to delete');
        error.describe = {
          status: 400,
          message: 'Not employees to delete',
        };

        return error;
      });
    }

    const newEmployees = (
      employees ? employees.filter((employee) => employee.dui === dui) : null
    ) as unknown;

    localStorage.setItem('employees', JSON.stringify(newEmployees));

    return newEmployees as Observable<Employee[]>;
  }

  createEmployees(employee: Employee): Observable<Employee> {
    const employees: Employee[] = localStorage.getItem('employees')
      ? JSON.parse(JSON.stringify(localStorage.getItem('employees')))
      : [];
    const newEmployees = [...employees, employee];
    localStorage.setItem('employees', JSON.stringify(newEmployees));

    return employee as Observable<Employee>;
  }
}
