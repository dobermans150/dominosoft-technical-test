import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  isDisabled: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isDisabled = params['id'] ? true : false;
    });
  }

  edit() {
    this.isDisabled = !this.isDisabled;
  }

  goBack() {
    this.router.navigate(['/admin']);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Employee updated');
  }
}
