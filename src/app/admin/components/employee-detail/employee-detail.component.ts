import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '@core/services/employees.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Employee } from '../../../core/models/employee.model';
import { MyValidators } from '../../../utils/validators';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;
  isDisabled: boolean = true;
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
    private employeesService: EmployeesService
  ) {
    this.form = this.formBuilder();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isDisabled = params['id'] ? true : false;
      if (params['id']) {
        this.getEmployee(params['id']);
      }
    });
  }

  private formBuilder() {
    return this.formBuilderService.group({
      dui: [
        { value: '', disabled: true },

        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          MyValidators.maxLengthText(9),
        ],
      ],
      names: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          MyValidators.maxLengthText(24),
        ],
      ],
      lastnames: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          MyValidators.maxLengthText(24),
        ],
      ],
      email: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          MyValidators.maxLengthText(24),
          MyValidators.trueEmail,
        ],
      ],
    });
  }

  edit() {
    if (this.employee) {
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
      console.log(employee);
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Employee updated');
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
