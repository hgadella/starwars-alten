import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  error: string;

  get f() { return this.form.controls; }

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_check: ['', Validators.required]
    }, { validators: [this.checkPasswords] } );
  }

  checkPasswords(f: FormGroup) {
    const pass = f.get('password').value;
    const passCheck = f.get('password_check').value;
    const result = pass === passCheck ? null : { passwordMismatch : true};

    return result;
  }

  getFormValidationErrors(): any[] {
    const errors = [];
    Object.keys(this.form.errors).forEach(key => {
    if (this.form.errors[key] === false) {
        errors.push({
          error : key,
          value : this.form.errors[key]
        });
      }
    });
    return errors;
  }


  async onSubmit() {

    // stop here if form is invalid
    if (this.form.invalid) {
        this.error = 'There are some errors. Please, correct them and try again.';
        this.submitted = true;
        return;
    } else {
      this.error = null;
    }

    this.loading = true;
    this.submitted = true;

    const result = await this.userService.create(
      this.form.getRawValue()
    );

    if (result.success === true)
    {
      this.returnUrl = '/login';
      this.router.navigate([this.returnUrl]);
    } else {
      this.error = result.error.errmsg;
      this.loading = false;
    }
}
}
