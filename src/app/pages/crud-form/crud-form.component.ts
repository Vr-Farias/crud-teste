import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AppMaterialModule } from '../../shared/app-materials.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RequestHandler } from 'express';

@Component({
  selector: 'app-crud-form',
  standalone: true,
  imports: [
    RouterLink,
    AppMaterialModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.scss'] // Corrigi de styleUrl para styleUrls
})
export class CrudFormComponent implements OnInit {
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

  professional = {
    name: '',
    specialty: '',
    crm: '',
    phone: '',
    email: '',
    hireDate: null,
    startTime: '',
    endTime: '',
    status: 'true',
    daysOfWeek: []
  };
  static getAllProfessionals: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>;


  constructor(private http: HttpClient, private router: Router) { } // Injete o HttpClient

  ngOnInit(): void {

  }

  onSave(): void {
    this.createProfessional(this.professional);
  }


  createProfessional(newProfessional: any) {
    this.http.post('/api/professionals', newProfessional).subscribe(response => {
      console.log('Profissional cadastrado com sucesso:', response);
      this.router.navigate(['/crud-list']);
        }, error => {
      console.error('Erro ao cadastrar profissional:', error);
    });
  }
}
