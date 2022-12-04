import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { Persona } from '../interface/persona.interface';
import { MaterialModule } from 'modules/material/material.module';
import { RouterModule } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(private readonly todoSvc: TodoService) {}

  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'genero',
    'telefono',
    'acciones',
  ];

  dataSource: Persona[] = this.todoSvc.personas;

  eliminarPersona(id: number) {
    this.todoSvc.eliminar(id);
    this.dataSource = this.todoSvc.personas;
    Swal.fire(
      'Eliminar',
      'Se elimino el registro de manera exitosa',
      'success'
    );
  }
}
