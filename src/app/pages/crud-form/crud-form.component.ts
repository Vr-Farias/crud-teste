import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppMaterialModule } from '../../shared/app-materials.module';


@Component({
  selector: 'app-crud-form',
  standalone: true,
  imports: [
    RouterLink,
    AppMaterialModule
  ],
  templateUrl: './crud-form.component.html',
  styleUrl: './crud-form.component.scss'
})
export class CrudFormComponent implements OnInit{

   daysOfWeek = [
    { name: 'Segunda-feira' },
    { name: 'Terça-feira' },
    { name: 'Quarta-feira' },
    { name: 'Quinta-feira' },
    { name: 'Sexta-feira' },
    { name: 'Sábado' },
    { name: 'Domingo' },
  ];

  specialties = [
    { especialidade: 'Pediatria' },
    { especialidade: 'Ginecologia' },
    { especialidade: 'Obstetrícia' },
    { especialidade: 'Neonatologia' },
    { especialidade: 'Endocrinologia Pediátrica' },
    { especialidade: 'Nutrição Infantil' },
    { especialidade: 'Genética Pediátrica' },
    { especialidade: 'Alergologia Pediátrica' },
  ];



  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}


