import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private jsonUrl = 'assets/mock/olympic.json';

  constructor(private http: HttpClient) {}

  getOlympics(): Observable<any> {
    return this.http.get<any>(this.jsonUrl)
  }

}
