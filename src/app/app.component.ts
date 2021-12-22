import { Component, OnInit } from '@angular/core';
import { employees } from '@data/employees';
import { users } from '@data/users';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dominosoft-technical-test';

  ngOnInit(): void {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(users));
    }

    if (!localStorage.getItem('employees')) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }
}
