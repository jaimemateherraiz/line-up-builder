import { Component, inject, OnInit } from '@angular/core';

import { PeticionesApiService } from '../../peticiones-api.service';
import { ApiResponse, PlayerResponse } from '../../models/Players';
import { SinglePlayerApiResponse, Statistic } from '../../models/SinglePlayer';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-selector',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.css'
})
export class SelectorComponent implements OnInit {

  private apiService = inject(PeticionesApiService);

  players: PlayerResponse[] = [];
  playerStatistics: Statistic[] | null = null;

  private _teamId: number | null = null;
  playerId: number = 0; // ID del equipo seleccionado

  ngOnInit(): void {   // Usamos ngOnInit para la inicialización
    this.teamId = null;  // Asegura que el valor inicial sea null
  }

  get teamId(): number | null {
    return this._teamId;
  }

  set teamId(value: number | null) {
    this._teamId = value;
    if (value !== null && value > 0) {
      this.obtenerJugadores(value);
      console.log('teamId changed:', value);
    } else {
      this.players = []; // Limpia la lista si no hay equipo seleccionado
    }
  }

  obtenerJugadores(teamId: number) {
    if (teamId > 0) { // Evita la petición inicial con 0
      this.apiService.getPlayers(teamId).subscribe((apiResponse: ApiResponse) => {
        if (apiResponse && apiResponse.response && Array.isArray(apiResponse.response)) {
          this.players = apiResponse.response;
          console.log("Jugadores:", this.players);
        } else {
          this.players = []; // Limpia la lista en caso de error o respuesta vacía
          console.error('La respuesta de la API no tiene la estructura esperada para getPlayers.');
        }
      });
    } else {
      this.players = []; // Limpia la lista si no hay equipo seleccionado
    }
  }

  obtenerInfoJugador(playerId: number) {
    this.apiService.getPlayerInfo(playerId).subscribe((apiResponse: SinglePlayerApiResponse) => {
      if (apiResponse && apiResponse.response && apiResponse.response.length > 0) {
        this.playerStatistics = apiResponse.response[0].statistics; // Extrae las estadísticas
        console.log("Estadisticas de Jugador:", this.playerStatistics);
      } else {
        console.error('La respuesta de la API no tiene la estructura esperada para getPlayerInfo.');
        this.playerStatistics = null;
      }
    });
  }
}
