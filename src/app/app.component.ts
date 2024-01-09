import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import moment from 'moment';
import { AppServiceService } from '../services/app-service.service';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap'

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
  shortcut: string | void;
  tl: gsap.core.Timeline;

  constructor(
    private appService: AppServiceService
  ) { }

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.urlInput.nativeElement.focus()
    if (event.key == 'Enter' && this.shortcut){
      this.appService.webGo(this.shortcut)
      return
    }else{
      this.shortcut = null
    }
    if (this.urlText.length  == 3){
      this.shortcut = this.appService.checkShortCut(this.urlText)
      if (this.shortcut){
        let tl = gsap.timeline();
        tl.to('.search', { duration: 0.2, y: -30 })
        .to('.search', { duration: 0.2, y: 0 })
      }
      console.log(this.shortcut)
    }
    if (event.key == 'Enter' && this.urlText.length > 1){
      this.appService.webSearch(this.urlText)
    } else if (event.key == 'Escape'){
      this.resetSearch()
    }
  }

 
  ngOnInit(): void {
    this.time = this.appService.getTime()
    this.greetin = this.appService.getGreetins()
    this.date = this.appService.getDate()
    this.hentai = this.appService.getHentai()
    this.urlInput.nativeElement.focus()
  }

  resetSearch(){
    this.urlText = ''
  }
}
