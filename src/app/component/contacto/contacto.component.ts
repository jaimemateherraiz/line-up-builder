import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-contacto',
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
  //imports: [FormsModule]
})
export class ContactoComponent {
  contacto = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  enviarFormulario() {
    console.log('Datos del formulario:', this.contacto);
  }
}
