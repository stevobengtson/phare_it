import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit { 
  libraryId: string|null = null;
  columns: string[] = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.libraryId = this.route.snapshot.paramMap.get('libraryId');
  }

}
