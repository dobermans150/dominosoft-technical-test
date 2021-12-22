import { Injectable } from '@angular/core';
import { User } from '@core/models/user.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  static login(email: string, password: string): Observable<User> {
    const usersLocalStorage = localStorage.getItem('users');

    const users: User[] = usersLocalStorage
      ? (JSON.parse(usersLocalStorage) as Array<User>)
      : ([] as Array<User>);

    const user = users.find(
      (user) => user.username === email && user.password === password
    );

    const userObservable: Observable<User> = new Observable((subscribe) => {
      if (!user) {
        subscribe.error(
          throwError(() => {
            const error: any = new Error('user or password is incorrect');

            return error;
          })
        );
      }

      if (!users) {
        subscribe.error(
          throwError(() => {
            const error: any = new Error('users not found');

            return error;
          })
        );
      }
      localStorage.setItem('session', JSON.stringify(user));
      subscribe.next(user);
    });

    return userObservable;
  }

  static getSession() {
    const session = JSON.parse(localStorage.getItem('session') as string);

    const sessionObservable = new Observable((subscribe) => {
      if (!session) {
        subscribe.error(
          throwError(() => {
            const error: any = new Error('session not found');

            return error;
          })
        );
        return;
      }

      subscribe.next(session);
    });
    return sessionObservable;
  }

  static logOut() {
    const user = JSON.parse(JSON.stringify(localStorage.getItem('session')));
    localStorage.removeItem('session');

    const userObservable = new Observable((subscribe) => {
      if (!user) {
        subscribe.error(
          throwError(() => {
            const error: any = new Error('user not found');

            return error;
          })
        );
      }

      subscribe.next(user);
    });

    return userObservable;
  }

  static createUser(user: User) {
    const users: User[] = JSON.parse(
      JSON.stringify(localStorage.getItem('users'))
    );

    const newUsers: User[] = [...users, user];

    const userObservable = new Observable((subscribe) => {
      localStorage.setItem('users', JSON.stringify(newUsers));
      subscribe.next(newUsers);
    });

    return userObservable;
  }

  static updateUser(
    dui: number,
    email: string,
    newDui: string
  ): Observable<User> {
    const users: User[] = JSON.parse(
      JSON.stringify(localStorage.getItem('users'))
    );

    const userData = users.find((user) => user.dui === dui) as User;
    const userUpdated = { ...userData, dui: newDui, email };

    const newUsers = users.map((user) =>
      user.dui === userData.dui ? userUpdated : user
    );

    const userObservable: Observable<User> = new Observable((subscribe) => {
      subscribe.next(userData);

      localStorage.setItem('users', JSON.stringify(newUsers));
    });

    return userObservable;
  }

  static deleteUser(dui: number) {
    const users: User[] = JSON.parse(
      JSON.stringify(localStorage.getItem('users'))
    );

    const newUsers: User[] = users.filter((user) => user.dui !== dui);

    const usersObservable = new Observable((subscribe) => {
      subscribe.next(newUsers);
      localStorage.setItem('users', JSON.stringify(newUsers));
    });

    return usersObservable;
  }
}
