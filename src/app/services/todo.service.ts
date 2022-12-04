import { Injectable } from '@angular/core';
import { Persona } from '../interface/persona.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _personas: Persona[] = [];

  constructor() {}

  get personas() {
    return (this._personas = JSON.parse(localStorage.getItem('personas')!));
  }

  save(persona: Persona) {
    this._personas.push(persona);
    localStorage.setItem('personas', JSON.stringify(this._personas));
  }

  obtenerPersona(id: number) {
    return this.personas.filter((m: { id: number }) => m.id == id);
  }

  eliminar(id: number) {
    const indice = this._personas.findIndex((m) => m.id === id);
    this._personas.splice(indice, 1);
    localStorage.setItem('personas', JSON.stringify(this._personas));
  }

  update(persona: Persona) {
    const indice = this._personas.findIndex((m) => m.id === persona.id);
    this._personas.splice(indice, 1, persona);
    localStorage.setItem('personas', JSON.stringify(this._personas));
  }
}
