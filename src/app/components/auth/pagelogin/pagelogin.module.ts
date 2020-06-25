import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageloginRoutingModule } from './pagelogin-routing.module';
import { PageloginComponent } from './pagelogin.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageloginComponent],
  imports: [
    CommonModule,
    PageloginRoutingModule,

    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PageloginModule { }
