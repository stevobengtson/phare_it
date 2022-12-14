import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PhotoService } from '../services/photo.service';
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
  photoRootUrl: string = environment.apiUrl + '/photos';
  
  @ViewChild("fileInput", {static: false}) fileInput: ElementRef | undefined;

  constructor(private route: ActivatedRoute, private libraryService: LibraryService, private photoService: PhotoService) { }

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

  deletePhoto(fileName: string): void {
    if (this.libraryId !== null) {
      this.photoService.delete(this.libraryId, fileName).subscribe({
        next: () => {
          if (this.library?.photos) {
            console.log('Looking for', fileName, 'in', this.library.photos);
            const index = this.library.photos.indexOf(fileName);
            this.library.photos.splice(index, 1);
          }
        },
        error: (err) => alert(err)
      });
    }
  }

  onUpload(): void {
    if (this.file === null || this.libraryId === null) {
      return;
    }

    this.isLoading = true;
    this.photoService.upload(this.libraryId, this.file).subscribe({
      next: (file: any) => {
        this.library?.photos?.push(file.filename);
        this.file = null;
        if (this.fileInput !== undefined) {
          this.fileInput.nativeElement.value = '';
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        console.log(error);
        alert('Unable to upload file');
      },
      complete: () => this.isLoading = false,
    });
  }
}
