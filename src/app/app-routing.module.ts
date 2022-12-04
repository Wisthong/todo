import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    title: 'Lista de personas',
  },
  {
    path: 'form',
    loadComponent: () => import('../app/form/form.component'),
    title: 'Formulario',
  },
  {
    path: 'form/:id',
    loadComponent: () => import('../app/form/form.component'),
    title: 'Editar',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
