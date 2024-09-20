import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppMaterialModule } from '../../shared/app-materials.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProfessionalGet } from '../../models/professionals.model';

@Component({
  selector: 'app-crud-list',
  standalone: true,
  imports: [
    AppMaterialModule,
    RouterLink,
    MatPaginator,
    MatTableModule,
    HttpClientModule
  ],
  templateUrl: './crud-list.component.html',
  styleUrls: ['./crud-list.component.scss']
})


export class CrudListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'specialty', 'crm', 'phone', 'status', 'actions'];
  dataSource = new MatTableDataSource<ProfessionalGet>([]);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProfessionals();
  }

  getProfessionals() {
    const apiUrl = '/assets/professionals.json';
    this.http.get<ProfessionalGet[]>(apiUrl).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
