import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '@core/services/employees.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Employee } from '@core/models/employee.model';
import { MyValidators } from '@utils/validators';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee;
  isDisabled: boolean = true;
  isEdit: boolean = false;
  form: FormGroup;

  validations = {
    names: [
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
      {
        type: 'letter_error',
        msg: 'Ingrese un nombre valido',
      },
    ],
    lastnames: [
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
      {
        type: 'letter_error',
        msg: 'Ingrese un apellido valido',
      },
    ],
    dui: [
      {
        type: 'required',
        msg: 'Este campo es requerido',
      },
      {
        type: 'minlength',
        msg: 'Debe ser de minimo 9 digitos',
      },
      {
        type: 'maxlength',
        msg: 'debe ser de un maximo de 9 digitos',
      },
      {
        type: 'number_error',
        msg: 'Solo puede ingresar numeros',
      },
    ],
    email: [
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
      {
        type: 'email_error',
        msg: 'Debe de escribir un email valido',
      },
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilderService: FormBuilder,
    private employeesService: EmployeesService,
    private authService: AuthService
  ) {
    this.form = this.formBuilder();
    this.employee = {};
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isDisabled = params['id'] ? true : false;
      if (params['id']) {
        this.getEmployee(params['id']);
        this.isEdit = true;
        const { names, lastnames, email, dui } = this.employee;
        this.form.setValue({ names, lastnames, email, dui });
        this.form.disable();
      }
    });
  }

  private formBuilder() {
    return this.formBuilderService.group({
      dui: [
        { value: '', disabled: false },

        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          MyValidators.onlyNumbers,
        ],
      ],
      names: [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          MyValidators.onlyLetters,
        ],
      ],
      lastnames: [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          MyValidators.onlyLetters,
        ],
      ],
      email: [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          MyValidators.trueEmail,
        ],
      ],
    });
  }

  edit() {
    if (this.isEdit) {
      this.isDisabled = !this.isDisabled;
      if (!this.isDisabled) {
        this.duiField.enable();
        this.namesField.enable();
        this.emailField.enable();
        this.lastnamesField.enable();
      } else {
        this.duiField.disable();
        this.namesField.disable();
        this.emailField.disable();
        this.lastnamesField.disable();
      }
    } else {
      this.router.navigate(['/admin']);
    }
  }

  goBack() {
    this.router.navigate(['/admin']);
  }

  getEmployee(dui: string) {
    const userDui = parseInt(dui);
    this.employeesService.getEmployeeById(userDui).subscribe((employee) => {
      this.employee = employee;
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.isEdit) {
      const uuid = uuidv4();
      const { dui, ...employee } = this.form.value;

      this.authService
        .createUser({
          uuid,
          dui,
          username: employee.email,
          password: '123456',
          role: 'employee',
        })
        .subscribe((data) => {});

      this.employeesService
        .createEmployees({ ...employee, uuid, dui: parseInt(dui) })
        .subscribe((employees) => {
          this.router.navigate(['/admin']);
        });
    } else {
      this.authService.updateUser(
        this.employee.dui as number,
        this.form.value.email,
        this.form.value.dui
      );

      this.employeesService
        .updateEmployee({
          ...this.employee,
          ...this.form.value,
        })
        .subscribe((employee) => {
          const { dui, names, email, lastnames } = employee;
          this.form.setValue({ dui, names, email, lastnames });
          this.isDisabled = true;
          this.form.disable();
        });
    }
  }

  get namesField(): AbstractControl {
    return this.form.get('names') as AbstractControl;
  }

  get lastnamesField(): AbstractControl {
    return this.form.get('lastnames') as AbstractControl;
  }

  get emailField(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get duiField(): AbstractControl {
    return this.form.get('dui') as AbstractControl;
  }
}
