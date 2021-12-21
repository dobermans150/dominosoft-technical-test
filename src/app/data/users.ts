import { User } from '../core/models/user.model';
export const users: User[] = [
  {
    uuid: 'b15095fc-c62a-4c5f-8855-62afcc9496cb',
    username: 'admin@admin.com',
    password: '123456',
    role: 'administrator',
  },
  {
    uuid: '3b0a9610-3543-45e3-b5db-82514100d082',
    username: 'correo@admin.com',
    password: '123456',
    role: 'administrator',
  },
  {
    uuid: 'c23c2998-59af-457b-b317-b3a1707481bd',
    dui: 565656565,
    username: 'correo@employee.com',
    password: '123456',
    role: 'employee',
  },
  {
    uuid: 'aaa1d7cf-8a14-4f50-9537-d368c28ce91e',
    dui: 54545454,
    username: 'correo@correo.com',
    password: '123456',
    role: 'employee',
  },
  {
    uuid: '46147c8a-163c-4168-abaa-d0c238c70997',
    dui: 121212121,
    username: 'test@correo.com',
    password: '123456',
    role: 'employee',
  },
];
