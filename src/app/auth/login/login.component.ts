import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { MyValidators } from '../../utils/validators';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  validations = {
    username: [
      {
        type: 'required',
        msg: 'Este campo es requerido',
      },
      {
        type: 'minlength',
        msg: 'Debe ser de minimo 6 caracteres',
      },
      {
        type: 'maxlength',
        msg: 'debe ser de un maximo de 24 caracteres',
      },
    ],
    password: [
      {
        type: 'required',
        msg: 'Este campo es requerido',
      },
      {
        type: 'minlength',
        msg: 'Debe ser de minimo 6 caracteres',
      },
      {
        type: 'maxlength',
        msg: 'debe ser de un maximo de 24 caracteres',
      },
    ],
  };

  constructor(
    private router: Router,
    private formBuilderService: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder();
  }

  ngOnInit(): void {}

  private formBuilder() {
    return this.formBuilderService.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          MyValidators.maxLengthText(24),
        ],
        [],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          MyValidators.maxLengthText(24),
        ],
      ],
    });
  }

  signIn(event: Event) {
    event.preventDefault();

    const { username, password } = this.form.value;

    this.authService
      .login(username, password)
      .pipe(
        catchError((error) => {
          this._snackBar.open('Usuario o contraseña incorrecta', 'cerrar');
          return error;
        })
      )
      .subscribe((response) => {
        const user: any = response;

        if (user.role === 'administrator') {
          this.router.navigate(['/admin']);
        }
      });
  }

  get userNameField(): AbstractControl {
    return this.form.get('username') as AbstractControl;
  }

  get passwordField(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }
}
