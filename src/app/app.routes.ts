import { getAllProfessionals } from './controller/professional.controller';
import { RouterModule, Routes } from '@angular/router';
import { CrudListComponent } from './pages/crud-list/crud-list.component';
import { CrudFormComponent } from './pages/crud-form/crud-form.component';
import { NgModule } from '@angular/core';
import { Router } from 'express';
import express, { Request, Response } from 'express';



const router: Router = express.Router();

export const routes: Routes = [
    { path: 'crud-list', component: CrudListComponent },
    { path: 'crud-form', component: CrudFormComponent },
    { path: 'crud-form/:id', component: CrudFormComponent },
    { path: '', redirectTo: '/crud-list', pathMatch: 'full' },
    { path: '**', redirectTo: '/crud-list'}
];

router.get('/', (req:Request, res:Response) => {
  res.status(200)
})
.get("/", CrudFormComponent.getAllProfessionals)


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingMOdule{}
