import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { NewPostModule } from './components/posts/new-post/new-post.module';
import { PostComponent } from './components/posts/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';

// Firebase
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { ProfileModule } from './components/admin/profile/profile.module';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { EditPostModule } from './components/posts/edit-post/edit-post.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//import { TableComponent } from './shared/components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    PostComponent,
    ToolbarComponent,
    ModalComponent,
    ContainerAppComponent,
    EditPostComponent,
   
    
    //TableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AppRoutingModule,
    NewPostModule,
    MaterialModule,
    ReactiveFormsModule,
    ProfileModule,
    EditPostModule,
    
    HttpClientModule,

    FormsModule

  ],
  entryComponents:[ModalComponent],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
