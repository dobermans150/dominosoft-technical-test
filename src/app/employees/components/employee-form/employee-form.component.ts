import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeesService } from '../../../core/services/employees.service';
import { User } from '../../../core/models/user.model';
import { Employee } from '../../../core/models/employee.model';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  isDisabled: boolean = true;
  user: User = {};
  employee: Employee = {};
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
    private authService: AuthService,
    private employeesService: EmployeesService
  ) {
    this.form = this.formBuilder();
    this.user = JSON.parse(localStorage.getItem('session') as string);
  }

  ngOnInit(): void {
    this.getData();

    this.vaccunationStatusField.valueChanges.subscribe((value) => {
      if (value === true && this.user) {
        this.doseField.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(3),
        ]);

        this.VaccineTypeField.setValidators([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
        ]);

        this.vaccineDateField.setValidators([Validators.required]);
        this.vaccineDateField.enable();
        this.VaccineTypeField.enable();
        this.doseField.enable();
      } else {
        this.doseField.setValidators([]);
        this.VaccineTypeField.setValidators([]);
        this.vaccineDateField.setValidators([]);

        this.vaccineDateField.disable();
        this.VaccineTypeField.disable();
        this.doseField.disable();

        this.vaccineDateField.setValue('');
        this.VaccineTypeField.setValue('');
        this.doseField.setValue('');
      }
    });
  }

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
      dose: [{ value: 0, disabled: true }, []],
      telephone: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
        ],
      ],
      vaccunation_status: [{ value: false, disabled: true }, []],
      VaccineType: [{ value: '', disabled: true }, []],
      vaccineDate: [{ value: '', disabled: true }, []],
    });
  }

  edit() {
    this.isDisabled = !this.isDisabled;
    if (!this.isDisabled) {
      this.form.enable();
    } else {
      this.form.disable();
      this.form.reset();
    }
  }

  closeSession() {
    this.router.navigate(['/auth/login']);
    this.authService.logOut().subscribe((data) => {});
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const birthdate = new Date(this.form.value.birthdate);
    const vaccineDate = new Date(this.form.value.vaccineDate);

    const birthdateString = `${
      birthdate.getMonth() + 1
    }/${birthdate.getDate()}/${birthdate.getFullYear()}`;

    const vaccineDateString = `${
      vaccineDate.getMonth() + 1
    }/${vaccineDate.getDate()}/${vaccineDate.getFullYear()}`;

    const newEmployees = {
      ...this.employee,
      birthdate: birthdateString,
      address: this.form.value.address,
      telephone: this.form.value.telephone,
      vaccunation_status: this.form.value.vaccunation_status,
      vaccunation_data: {
        type: this.form.value.VaccineType,
        date: vaccineDateString,
        dose: this.form.value.dose,
      },
    };

    this.employeesService.updateEmployee(newEmployees).subscribe((employee) => {
      this.form.disable();
      this.isDisabled = true;
    });
  }

  getData() {
    const id = this.user.dui || 0;

    this.employeesService
      .getEmployeeById(id)
      .pipe(
        catchError((error) => {
          console.log(error);
          return error;
        })
      )
      .subscribe((employee) => {
        const employeResponse = employee;
        this.employee = employeResponse as User;
        const {
          uuid,
          email,
          names,
          lastnames,
          vaccunation_data,
          ...employeeData
        } = this.employee;
        const formValues = {
          address: employeeData.address || '',
          telephone: employeeData.telephone || '',
          vaccunation_status: employeeData.vaccunation_status || false,
          birthdate: new Date(employeeData.birthdate || ''),
          VaccineType: this.employee.vaccunation_data?.type || '',
          dose: this.employee.vaccunation_data?.dose || '',
          vaccineDate: new Date(this.employee.vaccunation_data?.date || ''),
        };

        this.form.setValue(formValues);
      });
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
