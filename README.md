# Construccion del proyecto

El presente proyecto es una solucion a la prueba tecnica de Dominosoft, en el cual solamente se me acordo realizar el trabajo con el front.

Cabe resaltar que el presente trabajo es realizado con LocalStorage y observables.

## Types

Los tipos son sencillos, no hay tipados complejos en el proyecto, pueden ver un ejemplo a continuacion:

```bash
export interface Employee {
  uuid?: string;
  dui?: number;
  names?: string;
  lastnames?: string;
  email?: string;
  birthdate?: string;
  address?: string;
  telephone?: string;
  vaccunation_status?: boolean;
  vaccunation_data?: vaccunation_data;
}
```

## Servicios

Los servicios en cambio si con algo complejos, de echo van un poco mas alla, para ser solamente front, pero realmente son servicios sencillos en el cual se es necesario realizarlo, para poder trabajar con Observables, que es la magia de Angular en si.

Ejemplo: auth.service.ts

```bash
login(email: string, password: string): Observable<User> {
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
```

## Infrastructura

Dentro de la arquitectura del front, utilice para el ui Angular Material su version 13, para el maquetado css, para los ids unicos use uuidv4 y el gestor de paquetes de npm con node en su version 16.13.1 (LTS), no vi necesario ocupar JWT, ademas de que no era uno de los requerimientos de la prueba.

## Dinamic Imports

Durante los archivos de los componentes pueden ver que utilice los dinamic imports de TypeScript, debido a que es mas comod y rapido a la hora de desarrollar.

## Paradigma orientado a modulos

La aplicacion esta modularizada, esto por echos de comodidad a la hora de importar los paquetes y que las cargas no sean realmente pesadas al momneto de navegar dentro de la aplicacion, ademas se utiliza lazy Loading, para poder cargar los modulos con mas facilidad. Cada modulo tiene su propio routing.

```code
const routes: Routes = [
  {
    path: '',
    /* component:, */
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, LoginGuard],
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employees/employees.module').then((m) => m.EmployeesModule),
    canActivate: [AuthGuard, EmployeeGuard],
  },
];
```

## Pantallas y componentes.

La aplicacion realmente es sencilla, tiene pocos componentes y los que tiene son realizados con Angular Material y los formularios con Formularios Reactivos, cabe resaltar que para las validaciones algunas las tuve que realizar por mi propia cuenta debido a que no estan dentro del los validadores que trae por defecto Angular (se qe es parte del desafio).

## Estructura de archivos

La aplicacion al estar modularizada, se trabaja los archivos y directorios por los mismos modulos y entidades, no se maneja por componentes o demas, cabe resaltar que los servicios y modulos son una excepcion, para ser mas legible el proyecto y no abrirm as de 4 carpetas para poder entrar al archivo que contiene el servicio que se necesita en el momento.

## Conclusion

La verdad no tengo mas nada que añadir, fue un excelente reto, me gusto en muchos aspecto, pero daria como feedback el realizar futuras pruebas tecnicas en una version menor de Angular, debido a que el equipo de google que llaman "versiones estables" realmente no lo son hasta que la comunidad lo pruebe, es mi recomendacion para futuros proyectos, gracias por la oportunidad y espero que puedan revisar mi codigo. ¡Saludos!
