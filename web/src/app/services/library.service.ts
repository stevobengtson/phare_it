import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.service';

export interface Library {
  name: string,
  user: string|User,
  id: string,
  photos: string[]|null,
}

export interface LibraryPageResponse {
  results: Library[],
  page: number,
  limit: number,
  totalPages: number,
  totalResults: number
}

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  createUserLibrary(name: string): Observable<any> {
    return this.http.post<Library>(environment.apiUrl + '/libraries', {
      name
    });
  }

  getUserLibraries(userId: string): Observable<any> {
    return this.http.get<LibraryPageResponse>(environment.apiUrl + '/users/' + userId + '/libraries');
  }

  getLibrary(libraryId: string): Observable<any> {
    return this.http.get<Library>(environment.apiUrl + '/libraries/' + libraryId);
  }
}
