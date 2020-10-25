import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthenticationService) { }



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/ships'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/ships';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

  async onSubmit() {

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          this.submitted = true;
          return;
      }

      this.loading = true;
      this.submitted = true;

      const result = await this.authService.Login(this.f.username.value, this.f.password.value);

      if (result.success === true)
      {
        this.router.navigate([this.returnUrl]);
      } else {
        this.error = 'Could not log in';
        this.loading = false;
      }
  }

}
