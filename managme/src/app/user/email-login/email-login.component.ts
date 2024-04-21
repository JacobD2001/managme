import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrl: './email-login.component.scss',
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;
  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;
  serverMessage: string = '';

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {
    this.form = this.fb.group({});
  }

  //shouldn't form controls be in constructor?
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', []],
    });
  }

  changeType(val: any) {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password?.value === this.passwordConfirm?.value;
    }
  }

  async onSubmit() {
    this.loading = true;
    const email = this.email?.value;

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(
          email,
          this.password?.value
        );
      }
      if (this.isSignup) {
        await this.afAuth.createUserWithEmailAndPassword(
          email,
          this.password?.value
        );
      }
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email';
      }
    } catch (error) {
      if (typeof error === 'string') this.serverMessage = error;
    }

    this.loading = false;
  }
}
