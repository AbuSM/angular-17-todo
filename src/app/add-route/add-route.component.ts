import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatButtonModule } from '@angular/material/button';
import * as uuid from 'uuid';
import { Subscription } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { ApiService } from '../services/api.service';
import { IData } from '../../types';

@Component({
  selector: 'app-add-route',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    NgxMaterialTimepickerModule,
    CardComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-route.component.html',
  styleUrl: './add-route.component.css',
})
export class AddRouteComponent implements OnInit {
  subscription = new Subscription();
  minDate = new Date();
  todo = new FormGroup({
    title: new FormControl<string>('', [
      Validators.maxLength(10),
      Validators.required,
    ]),
    expiration_date: new FormControl<Date>(new Date(), Validators.required),
    expiration_time: new FormControl<string>(''),
  });
  constructor(
    private location: Location,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {}

  callingFunction() {
    console.log(this.todo.value);
    console.log(this.todo.get('title'));
  }

  handleBackButton() {
    this.location.back();
  }

  handleSubmit() {
    if (!this.todo.valid) {
      console.error('Form is invalid. Please fill out all required fields.');
      this.todo.markAllAsTouched();
      return;
    }
    const expiration_date = this.todo.get('expiration_date')!.value as Date;
    const expiration_time = this.todo.get('expiration_time')?.value;

    let expiration_date_time = new Date(expiration_date);

    if (expiration_time) {
      const [time, period] = expiration_time.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) {
        expiration_date_time.setHours(hours + 12, minutes);
      } else if (period === 'AM' && hours === 12) {
        expiration_date_time.setHours(0, minutes);
      } else {
        expiration_date_time.setHours(hours, minutes);
      }
    }
    if (expiration_date_time < new Date()) {
      const error = { errors: 'Expiration date cannot be in the past.' };
      this.todo.controls.expiration_time.setErrors(error);
      console.error('Expiration date cannot be in the past.');
      return;
    }

    const data = {
      title: this.todo.get('title')!.value,
      id: uuid.v4(),
      expiration_date: expiration_date_time,
      created_at: new Date(),
      isFavorite: false,
    } as IData;
    this.apiService.addNewTodo(data);
    this.router.navigate(['/list']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
