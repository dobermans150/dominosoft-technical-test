import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor() {}

  getAllEmployees(): Observable<Employee[]> {
    const employeesLocalStorage = localStorage.getItem('employees') as string;

    const employees = JSON.parse(employeesLocalStorage);

    const employeesObservable = new Observable((subscribe) => {
      if (!employees) {
        subscribe.error(
          throwError(() => {
            const error: any = new Error('Not employees found');

            return error;
          })
        );
        return;
      } else subscribe.next(employees);
    });
    return employeesObservable as Observable<Employee[]>;
  }

  getEmployeeById(dui: number): Observable<Employee> {
    const employees: Employee[] = JSON.parse(
      localStorage.getItem('employees') as string
    );

    const employee = employees
      ? employees.find((employee) => employee.dui === dui)
      : null;

    const employeeObservable = new Observable<Employee>((subscribe) => {
      if (!employee) {
        subscribe.error(
          throwError(() => {
            const error: any = new Error('Employee not found');
            return error;
          })
        );

        return;
      } else subscribe.next(employee);
    });

    return employeeObservable;
  }

  updateEmployee(newEmployee: Employee) {
    const employees: Employee[] = JSON.parse(
      localStorage.getItem('employees') as string
    );

    const newEmployees = employees.map((employee) =>
      employee.dui === newEmployee.dui ? newEmployee : employee
    );

    const employeesObservable = new Observable<Employee>((subscribe) => {
      if (!employees) {
        subscribe.error(
          throwError(() => {
            const error: any = new Error('Employees not found');

            return error;
          })
        );
        return;
      }

      localStorage.setItem('employees', JSON.stringify(newEmployees));
      subscribe.next(newEmployee);
    });

    return employeesObservable;
  }

  deleteEmployee(dui: number): Observable<Employee[]> {
    const employeesLocalStorage = localStorage.getItem('employees') as string;

    const employees: Employee[] = JSON.parse(employeesLocalStorage);

    if (!employees) {
    }

    const newEmployees = employees.filter((employee) => employee.dui !== dui);

    const employeesOptions = new Observable<Employee[]>((subscribe) => {
      if (!employees) {
        subscribe.error(
          throwError(() => {
            const error: any = new Error('users not found');

            return error;
          })
        );

        return;
      } else {
        subscribe.next(newEmployees);
        localStorage.setItem('employees', JSON.stringify(newEmployees));
      }
    });

    return employeesOptions;
  }

  createEmployees(employee: Employee): Observable<Employee> {
    const employees: Employee[] = localStorage.getItem('employees')
      ? JSON.parse(localStorage.getItem('employees') as string)
      : [];
    const newEmployees = [...employees, employee];

    const employeeObservable = new Observable<Employee>((subscribe) => {
      subscribe.next(employee);
      localStorage.setItem('employees', JSON.stringify(newEmployees));
    });

    return employeeObservable;
  }
}
