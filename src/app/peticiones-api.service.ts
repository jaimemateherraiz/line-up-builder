import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './models/Players';
// import { SinglePlayerApiResponse } from './models/SinglePlayer';

@Injectable({
  providedIn: 'root',
})
export class PeticionesApiService {
  constructor() {}

  private apiKey: string = '47a8a94d9def0c05652edf15de65949e';
  private apiHost: string = 'v3.football.api-sports.io';
  private apiUrl: string = 'https://v3.football.api-sports.io/';
  private http: HttpClient = inject(HttpClient);

  public getPlayers(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      this.apiUrl + 'players?team=' + id + '&season=2023',
      {
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': this.apiHost,
        },
      }
    );
  }

}
