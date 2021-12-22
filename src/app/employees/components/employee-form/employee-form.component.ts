import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MyValidators } from '@utils/validators';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  isDisabled: boolean = true;
  form: FormGroup;

  vaccineType = [
    { value: 'none', viewValue: 'Seleccion un tipo de vacuna' },
    { value: 'sputnik', viewValue: 'Sputnik' },
    { value: 'astrazeneca', viewValue: 'AstraZeneca' },
    { value: 'pfizer', viewValue: 'Pfizer' },
    { value: 'J&J', viewValue: 'Jhonson&Jhonson' },
  ];

  validations = {
    birthdate: [
      {
        type: 'required',
        msg: 'Este campo es requerido',
      },
    ],
    address: [
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
    dose: [
      {
        type: 'required',
        msg: 'Este campo es requerido',
      },
      {
        type: 'min',
        msg: 'Debe ser de minimo 1',
      },
      {
        type: 'max',
        msg: 'Debe ser de un maximo de 3',
      },
    ],
    telephone: [
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
    VaccineType: [
      {
        type: 'required',
        msg: 'Este campo es requerido',
      },
    ],
    vaccineDate: [
      {
        type: 'required',
        msg: 'Este campo es requerido',
      },
    ],
  };

  constructor(
    private router: Router,
    private formBuilderService: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder();
  }

  ngOnInit(): void {}

  private formBuilder() {
    return this.formBuilderService.group({
      birthdate: [{ value: '', disabled: true }, [Validators.required], []],
      address: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
        ],
      ],
      dose: [
        { value: 0, disabled: true },
        ,
        [Validators.required, Validators.min(1), Validators.max(3)],
      ],
      telephone: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
        ],
      ],
      vaccunation_status: [{ value: false, disabled: true }, []],
      VaccineType: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
        ],
      ],
      vaccineDate: [{ value: '', disabled: true }, [Validators.required], []],
    });
  }

  edit() {
    this.isDisabled = !this.isDisabled;
  }

  closeSession() {
    this.router.navigate(['/auth/login']);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Employee updated');
  }

  get birthdateField(): AbstractControl {
    return this.form.get('birthdate') as AbstractControl;
  }
  get addressField(): AbstractControl {
    return this.form.get('address') as AbstractControl;
  }
  get telephoneField(): AbstractControl {
    return this.form.get('telephone') as AbstractControl;
  }
  get vaccunationStatusField(): AbstractControl {
    return this.form.get('vaccunation_status') as AbstractControl;
  }
  get VaccineTypeField(): AbstractControl {
    return this.form.get('VaccineType') as AbstractControl;
  }
  get vaccineDateField(): AbstractControl {
    return this.form.get('vaccineDate') as AbstractControl;
  }
  get doseField(): AbstractControl {
    return this.form.get('dose') as AbstractControl;
  }
}
