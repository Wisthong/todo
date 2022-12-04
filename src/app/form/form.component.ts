import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'modules/material/material.module';
import { TodoService } from '../services/todo.service';
import { Persona } from '../interface/persona.interface';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export default class FormComponent implements OnInit {
  people!: Persona;

  optionsButton = {
    name: 'Guardar',
    class: 'accent',
  };

  miFormulario = this.fb.nonNullable.group({
    id: [0, [Validators.required]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    fecha_nacimiento: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private todoSvc: TodoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      if (this.todoSvc.obtenerPersona(id).length > 0) {
        this.optionsButton = {
          name: 'Modificar',
          class: 'warn',
        };
        this.people = this.todoSvc.obtenerPersona(id)[0];
        this.miFormulario.patchValue({
          apellido: this.people.apellido,
          fecha_nacimiento: this.people.fecha_nacimiento,
          genero: this.people.genero,
          nombre: this.people.nombre,
          telefono: this.people.telefono,
          id: this.people.id,
        });
      }
    });
  }

  onSave() {
    if (this.optionsButton.name === 'Modificar') {
      if (this.miFormulario.valid) {
        const persona = this.miFormulario.getRawValue();
        this.todoSvc.update(persona);
        Swal.fire(
          'Modificar',
          'Se actualizo el registro de manera exitosa',
          'success'
        );
        this.router.navigate(['/']);
      }
    } else {
      if (this.miFormulario.valid) {
        const persona = this.miFormulario.getRawValue();
        this.todoSvc.save(persona);
        Swal.fire(
          'Agregar',
          'Se agrego el registro de manera exitosa',
          'success'
        );
        this.router.navigate(['/']);
      }
    }
  }
}
