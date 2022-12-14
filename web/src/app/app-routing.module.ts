import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component';
import { LibraryManagerComponent } from './library-manager/library-manager.component';
import { PhotoComponent } from './photo/photo.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'library', component: LibraryManagerComponent },
  { path: 'library/:libraryId', component: LibraryComponent },
  { path: 'photo/:photoFileName', component: PhotoComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
