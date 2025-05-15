import { Component } from '@angular/core';
import { SelectorComponent } from './selector/selector.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  imports: [SelectorComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

}
