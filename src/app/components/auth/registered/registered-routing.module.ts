import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisteredComponent } from './registered.component';

const routes: Routes = [{ path: '', component: RegisteredComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisteredRoutingModule { }
