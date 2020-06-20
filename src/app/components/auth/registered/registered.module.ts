import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisteredRoutingModule } from './registered-routing.module';
import { RegisteredComponent } from './registered.component';
import {MaterialModule} from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [RegisteredComponent],
  imports: [
    CommonModule,
    RegisteredRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class RegisteredModule { }
