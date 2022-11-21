import { Injectable } from '@angular/core';

export interface User {
  name: string,
  email: string,
  id: string,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
}
