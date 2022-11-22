import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  photoRootUrl: string = environment.apiUrl + '/photos';
  photoFileName: string | null = null;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.photoFileName = this.route.snapshot.paramMap.get('photoFileName');
  }
}
