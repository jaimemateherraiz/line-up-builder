import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SelectorComponent } from './selector/selector.component';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';

// Interfaz para los datos del jugador que se arrastran
interface DraggedPlayerData {
  id: number;
  name: string;
  photo: string;
} 
// Interfaz actualizada para las posiciones en el campo
interface PlayerPosition {
  x: number;
  y: number;
  role?: string;
  color?: string;

  droppedPlayer?: DraggedPlayerData;
  isOccupied: boolean;
  isDragOver?: boolean;
  id: string;
}

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    SelectorComponent,
    FormsModule
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements AfterViewInit {
  @ViewChild('formationSelect') formationSelect!: ElementRef<HTMLSelectElement>; // Usado para el select de formación

  public playerPositions: PlayerPosition[] = [];

  lineUpName: string = ''; 

  private formationsData: {
    [key: string]: Omit<
      PlayerPosition,
      'id' | 'isOccupied' | 'isDragOver' | 'droppedPlayer'
    >[];
  } = {
      '4-3-3': [
        { x: 5, y: 50, role: 'POR', color: '#405BA4' },
        { x: 20, y: 20, role: 'LD', color: '#42713F' },
        { x: 20, y: 40, role: 'DFC', color: '#42713F' },
        { x: 20, y: 60, role: 'DFC', color: '#42713F' },
        { x: 20, y: 80, role: 'LI', color: '#42713F' },
        { x: 45, y: 30, role: 'MC', color: '#AEA503' },
        { x: 45, y: 50, role: 'MC', color: '#AEA503' },
        { x: 45, y: 70, role: 'MC', color: '#AEA503' },
        { x: 70, y: 25, role: 'ED', color: '#91211B' },
        { x: 70, y: 50, role: 'DC', color: '#91211B' },
        { x: 70, y: 75, role: 'EI', color: '#91211B' },
      ],
      '4-4-2': [
        { x: 5, y: 50, role: 'POR', color: '#405BA4' },
        { x: 20, y: 20, role: 'LD', color: '#42713F' },
        { x: 20, y: 40, role: 'DFC', color: '#42713F' },
        { x: 20, y: 60, role: 'DFC', color: '#42713F' },
        { x: 20, y: 80, role: 'LI', color: '#42713F' },
        { x: 45, y: 15, role: 'MD', color: '#AEA503' },
        { x: 45, y: 40, role: 'MC', color: '#AEA503' },
        { x: 45, y: 60, role: 'MC', color: '#AEA503' },
        { x: 45, y: 85, role: 'MI', color: '#AEA503' },
        { x: 70, y: 35, role: 'DC', color: '#91211B' },
        { x: 70, y: 65, role: 'DC', color: '#91211B' },
      ],
      '4-2-3-1': [
        { x: 5, y: 50, role: 'POR', color: '#405BA4' },
        { x: 20, y: 20, role: 'LD', color: '#42713F' },
        { x: 20, y: 40, role: 'DFC', color: '#42713F' },
        { x: 20, y: 60, role: 'DFC', color: '#42713F' },
        { x: 20, y: 80, role: 'LI', color: '#42713F' },
        { x: 38, y: 35, role: 'MCD', color: '#AEA503' },
        { x: 38, y: 65, role: 'MCD', color: '#AEA503' },
        { x: 55, y: 20, role: 'MPD', color: '#AEA503' },
        { x: 55, y: 50, role: 'MPC', color: '#AEA503' },
        { x: 55, y: 80, role: 'MPI', color: '#AEA503' },
        { x: 75, y: 50, role: 'DC', color: '#91211B' },
      ],
      '3-5-2': [
        { x: 5, y: 50, role: 'POR', color: '#405BA4' },
        { x: 20, y: 30, role: 'DFC', color: '#42713F' },
        { x: 20, y: 50, role: 'DFC', color: '#42713F' },
        { x: 20, y: 70, role: 'DFC', color: '#42713F' },
        { x: 45, y: 10, role: 'CARD', color: '#AEA503' },
        { x: 40, y: 35, role: 'MC', color: '#AEA503' },
        { x: 40, y: 50, role: 'MC', color: '#AEA503' },
        { x: 40, y: 65, role: 'MC', color: '#AEA503' },
        { x: 45, y: 90, role: 'CARI', color: '#AEA503' },
        { x: 70, y: 40, role: 'DC', color: '#91211B' },
        { x: 70, y: 60, role: 'DC', color: '#91211B' },
      ],
      '5-3-2': [
        { x: 5, y: 50, role: 'POR', color: '#405BA4' },
        { x: 20, y: 15, role: 'CARD', color: '#42713F' },
        { x: 22, y: 35, role: 'DFC', color: '#42713F' },
        { x: 22, y: 50, role: 'DFC (LIB)', color: '#42713F' },
        { x: 22, y: 65, role: 'DFC', color: '#42713F' },
        { x: 20, y: 85, role: 'CARI', color: '#42713F' },
        { x: 45, y: 30, role: 'MC', color: '#AEA503' },
        { x: 45, y: 50, role: 'MC', color: '#AEA503' },
        { x: 45, y: 70, role: 'MC', color: '#AEA503' },
        { x: 70, y: 40, role: 'DC', color: '#91211B' },
        { x: 70, y: 60, role: 'DC', color: '#91211B' },
      ],
    };

  constructor() { }

  onFormationSelectChange(event: Event): void {
    const selectedFormationKey = (event.target as HTMLSelectElement).value;
    this.updatePlayerPositions(selectedFormationKey);
  }

  ngAfterViewInit(): void {
    const selectElement = document.getElementById('Jaime') as HTMLSelectElement;
    if (selectElement) {
      selectElement.addEventListener('change', (event) =>
        this.onFormationSelectChange(event)
      );
      // Para cargar una formación inicial si alguna está seleccionada por defecto (que no sea el placeholder)
      if (
        selectElement.value &&
        selectElement.value !== 'SELECCIONA UNA FORMACIÓN'
      ) {
        this.updatePlayerPositions(selectElement.value);
      }else {
        
      }
    }
  }

  // Método para manejar el cambio de formación desde el select original
  updatePlayerPositions(formationKey: string): void {
    const formationBaseData = this.formationsData[formationKey];

    if (formationBaseData) {
      this.playerPositions = formationBaseData.map((pos, index) => ({
        ...pos,
        id: `${formationKey}-slot-${index}`,
        isOccupied: false,
        isDragOver: false,
        droppedPlayer: undefined,
      }));
    } else {
      this.playerPositions = [];
    }
  }

  // --- Métodos para Drag and Drop ---
  onDragOver(event: DragEvent, position: PlayerPosition): void {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    position.isDragOver = true;
  }

  onDragLeave(event: DragEvent, position: PlayerPosition): void {
    position.isDragOver = false;
  }

  onDrop(event: DragEvent, targetPosition: PlayerPosition): void {
    event.preventDefault();
    targetPosition.isDragOver = false;

    if (event.dataTransfer) {
      const playerDataString = event.dataTransfer.getData('application/json');
      if (playerDataString) {
        try {
          const playerData: DraggedPlayerData = JSON.parse(playerDataString);
          targetPosition.droppedPlayer = playerData;
          targetPosition.isOccupied = true;
        } catch (e) {
          console.error('Error al parsear datos del jugador:', e);
        }
      }
    }
  }

  // Opcional: Método para limpiar un slot si se implementa un botón para ello
  clearPlayerSlot(position: PlayerPosition): void {
    position.droppedPlayer = undefined;
    position.isOccupied = false;
  }

  
  // --- Métodos para descargar la imagen de la alineación ---
  downloadImage(): void {
    if (!this.playerPositions.length) {
      // @ts-ignore
      import('sweetalert2').then(Swal => {
        Swal.default.fire({
          icon: 'warning',
          title: 'Antes de nada rellena la alineación!',
          confirmButtonText: 'OK'
        });
      });
      return;
    }

    const elementToCapture = document.querySelector('#captura') as HTMLElement | null;

    if (!elementToCapture) {
      console.error('Elemento #captura no encontrado.');
      return;
    }

    html2canvas(elementToCapture, {
      allowTaint: false,
      useCORS: true,
      logging: true,
      scale: 2,
    }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${this.lineUpName || 'Line-Up-By-You'}.png`;
      link.click();
    }).catch(error => {
      console.error('Error al generar la imagen con html2canvas:', error);
    });
  }

}
