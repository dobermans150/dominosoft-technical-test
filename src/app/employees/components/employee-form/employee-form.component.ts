import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  isDisabled: boolean = true;
  vaccineType = [
    { value: 'none', viewValue: 'Seleccion un tipo de vacuna' },
    { value: 'sputnik', viewValue: 'Sputnik' },
    { value: 'astrazeneca', viewValue: 'AstraZeneca' },
    { value: 'pfizer', viewValue: 'Pfizer' },
    { value: 'J&J', viewValue: 'Jhonson&Jhonson' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

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
}
