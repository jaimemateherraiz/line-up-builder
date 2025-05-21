import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ContactoComponent } from './component/contacto/contacto.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'create', component: CreateComponent },
    { path: 'contacto', component: ContactoComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
