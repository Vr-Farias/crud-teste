import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profissional } from './models/profissionais';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  private apiUrl = 'https://api.example.com/professionals';

  constructor(private http: HttpClient) { }

  saveProfessional(professional: Profissional): Observable<any> {
    return this.http.post(this.apiUrl, professional);
  }

  // Outros métodos para obter, atualizar e excluir profissionais
}
