import { Employee } from '../core/models/employee.model';

export const employees: Employee[] = [
  {
    uuid: '238423f4-210c-4cf4-a5c5-260a873165bb',
    dui: 565656565,
    email: 'correo@employee.com',
    names: 'Carlos Jose',
    lastnames: 'Hernandez Navarro',
    birthdate: '12/21/1988',
    address: 'Avenida las palmas',
    telephone: '+55889885',
    vaccunation_status: true,
    vaccunation_data: {
      type: 'J&J',
      date: '08/21/2021',
      dose: 2,
    },
  },
  {
    uuid: 'd8dc6095-71f3-4f97-b019-87cfb87d65d8',
    dui: 54545454,
    names: 'Lili Luna',
    email: 'correo@correo.com',
    lastnames: 'Potter',
    birthdate: '12/21/1958',
    address: 'Calle de Gringots',
    telephone: '+01 999999',
    vaccunation_status: true,
    vaccunation_data: {
      type: 'pfizer',
      date: '09/11/2021',
      dose: 1,
    },
  },
  {
    uuid: '18a91fd5-3bfd-45f5-996f-691317ec315f',
    dui: 121212121,
    names: 'Maria Fernanda',
    lastnames: 'Osorio Rivas',
    email: 'test@correo.com',
    birthdate: '01/01/1998',
    address: 'Avenida las Madrid',
    telephone: '+01 999999',
    vaccunation_status: false,
    vaccunation_data: {},
  },
];
