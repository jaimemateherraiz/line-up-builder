import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Contacto } from '../models/Clases';
import Swal from 'sweetalert2';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  nombre= '';
  email = '';
  asunto = '';
  mensaje = '';
  
  constructor(private dataService: DataService){

  }
  
  agregarElemento() {
   if (this.nombre.length > 0 && this.email.length > 0 && this.email.length > 0 && this.mensaje.length > 0){
        this.dataService.addContacto({
          nombre: this.nombre,
          email: this.email,
          asunto: this.asunto,
          mensaje: this.mensaje
    });
    Swal.fire({
        icon: 'success',
        title: 'Mensaje agregado correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
      this.limpiarDatos();
      localStorage.setItem('contactos', JSON.stringify(this.dataService.getContactos()))
  } else {
     Swal.fire({
         icon: 'warning',
         title: 'Faltan datos',
         showConfirmButton: false,
         timer: 1500,
       });
      }
      this.limpiarDatos();
 
}

public limpiarDatos(){
    this.nombre= '',
    this.email= '',
    this.asunto= '',
    this.mensaje= '';
  };
  
}

