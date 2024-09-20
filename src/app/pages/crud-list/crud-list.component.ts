import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Profissional } from '../../models/profissionais';
import { AppMaterialModule } from '../../shared/app-materials.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-crud-list',
  standalone: true,
  imports: [
    AppMaterialModule,
    RouterLink,
    MatPaginator,
    MatTableModule
  ],
  templateUrl: './crud-list.component.html',
  styleUrl: './crud-list.component.scss'
})
export class CrudListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'specialty', 'crm', 'phone', 'status', 'actions'];
  dataSource = new MatTableDataSource([]);

  profissionais: Profissional[] = [{
    name:'Luis Claudio de Arruda',
    specialty: 'Pediatria',
    crm: '379287',
    phone: '81996762534',
    status: true,
    actions: true
  }];

  constructor() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
