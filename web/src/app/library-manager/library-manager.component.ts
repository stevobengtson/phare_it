import { Component, OnInit } from '@angular/core';
import { Library, LibraryPageResponse, LibraryService } from '../services/library.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-library-manager',
  templateUrl: './library-manager.component.html',
  styleUrls: ['./library-manager.component.css']
})
export class LibraryManagerComponent implements OnInit {
  form: any = {
    name: null,
  };
  libraries: Library[] = [];
  isLoading: boolean = false;
  
  constructor(private libraryService: LibraryService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.loadLibraries();
  }

  onSubmit(): void {
    this.libraryService.createUserLibrary(this.form.name).subscribe({
      next: (library: Library) => {
        this.loadLibraries();
      },
      error: () => alert('Unable to create the library')
    });
  }

  private loadLibraries(): void {
    this.isLoading = true;
    const user = this.tokenService.getUser();
    this.libraryService.getUserLibraries(user.id).subscribe({
      next: (libraryResponse: LibraryPageResponse) => {
        this.libraries = libraryResponse.results;
      },
      complete: () => this.isLoading = false
    });
  }
}
