import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import moment from 'moment';
import { AppServiceService } from '../services/app-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  greetin: string;
  time: string;
  date: string;
  hentai: string;
  urlText: string = '';
  @ViewChild('url') urlInput: ElementRef;

  constructor(
    private appService: AppServiceService
  ) { }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.urlInput.nativeElement.focus()
    if (event.key == 'Enter' && this.urlText.length > 1){
      this.appService.search(this.urlText)
    } else if (event.key == 'Escape'){
      this.resetSearch()
    }
  }

 
  ngOnInit(): void {
    this.time = this.appService.getTime()
    this.greetin = this.appService.getGreetins()
    this.date = this.appService.getDate()
    this.hentai = this.appService.getHentai()
  }

  resetSearch(){
    this.urlText = ''
    console.log(this.urlText.length)
  }
}
