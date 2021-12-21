import { Injectable } from '@angular/core';
import { Employee } from '@core/models/employee.model';
import { User } from '@core/models/user.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(email: string, password: string) {
    const usersLocalStorage = localStorage.getItem('users');

    const users: User[] = usersLocalStorage
      ? (JSON.parse(JSON.stringify(usersLocalStorage)) as Array<User>)
      : ([] as Array<User>);

    const user = users.find(
      (user) => user.username === email && user.password === password
    );

    if (!user) {
      return throwError(() => {
        const error: any = new Error('user or password is incorrect');
        error.describe = {
          status: 400,
          message: 'Invalid username or password',
        };

        return error;
      });
    }

    localStorage.setItem('session', JSON.stringify(user));

    return user as Observable<User>;
  }

  getSession() {
    const session = JSON.parse(JSON.stringify(localStorage.getItem('session')));

    if (!session) {
      return throwError(() => {
        const error: any = new Error('Not active session');
        error.describe = {
          status: 400,
          message: 'Session not found',
        };

        return error;
      });
    }

    return session as Observable<User>;
  }

  logOut() {
    const user = JSON.parse(JSON.stringify(localStorage.getItem('session')));
    localStorage.removeItem('session');

    if (!user) {
      return throwError(() => {
        const error: any = new Error('Not active session');
        error.describe = {
          status: 400,
          message: 'Session not found',
        };

        return error;
      });
    }

    return user as Observable<User>;
  }

  createUser(user: User) {
    const users: User[] = JSON.parse(
      JSON.stringify(localStorage.getItem('users'))
    );

    const newUsers: User[] = [...users, user];
    localStorage.setItem('users', JSON.stringify(newUsers));

    return user as Observable<User>;
  }
}
