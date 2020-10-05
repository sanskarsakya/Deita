import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// STORE
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../../../@store/app-store';

// RXJS
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authenticated$: Observable<boolean>;

  form = this.fb.group({
    username       : ['', Validators.required],
    password : ['', Validators.required],
  });

  get f() { return this.form.controls; }

  constructor(
    private appStore: Store<fromAppStore.AppState>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // SELECTORS
    this.authenticated$ = this.appStore.select(fromAppStore.getAuthenticated);

  }

  authenticate(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      console.log('authenticate', value);
      this.appStore.dispatch(fromAppStore.SetAuthenticated({payload: value}));
    }
  }

}
