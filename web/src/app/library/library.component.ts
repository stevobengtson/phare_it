import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../services/file-upload.service';
import { Library, LibraryService } from '../services/library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit { 
  libraryId: string|null = null;
  libraryName: string = 'Unknown';
  library: Library|null = null;
  columns: string[] = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  ];
  isLoading: boolean = false;
  file: File|null = null;

  constructor(private route: ActivatedRoute, private libraryService: LibraryService, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.libraryId = this.route.snapshot.paramMap.get('libraryId');
    if (this.libraryId === null) {
      alert('Unable to load library');
    } else {
      this.libraryService.getLibrary(this.libraryId).subscribe({
        next: (library: Library) => {
          this.libraryName = library.name;
          this.library = library;
        },
        error: (error: any) => {
          console.log(error);
          alert('Unable to load library');
        }
      });
    }
  }

  onChange(event: any): void {
    this.file = event.target.files[0];
  }

  onUpload(): void {
    if (this.file === null || this.libraryId === null) {
      return;
    }

    this.isLoading = true;
    this.fileUploadService.upload(this.libraryId, this.file).subscribe({
      next: () => alert('Uploaded'),
      error: (error: any) => {
        this.isLoading = false;
        console.log(error);
        alert('Unable to upload file');
      },
      complete: () => this.isLoading = false,
    });
  }
}
