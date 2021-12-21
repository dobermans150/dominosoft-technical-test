import { Component, OnInit } from '@angular/core';
import { users } from './data/users';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dominosoft-technical-test';

  ngOnInit(): void {
    localStorage.setItem('users', JSON.stringify(users));
  }
}
