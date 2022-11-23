import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(private http:HttpClient) { }
  
  upload(libraryId: string, file: File):Observable<any> {
      const formData = new FormData(); 
      formData.append("file", file, file.name);
      return this.http.post(environment.apiUrl + '/libraries/' + libraryId + '/photos', formData)
  }

  delete(libraryId: string, fileName: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/libraries/' + libraryId + '/photos/' + fileName);
  }
}