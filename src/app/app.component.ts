import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppServiceService } from '../services/app-service.service';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap'
import { HttpClientModule } from '@angular/common/http';
import { duration } from 'moment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  providers:[HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  greetin: string;
  time: string;
  date: string;
  art: string;
  quote: string;
  author: string;
  urlText: string = '';
  @ViewChild('url') urlInput: ElementRef;
  @ViewChild('aut') authorTag: ElementRef;
  shortcut: string | void;
  tl: gsap.core.Timeline;

  constructor(private appService: AppServiceService) {}

  @HostListener('window:keyup', ['$event'])
  //ele foca e DEPOIS consegue ler os caracteres.
  handleKeyboardEvent(event: KeyboardEvent) {
    this.urlInput.nativeElement.focus();
    if (event.key == 'Enter' && this.shortcut) {
      this.appService.webGo(this.shortcut);
      return;
    } else {
      this.shortcut = null;
    }
    if (this.urlText.length == 3) {
      this.shortcut = this.appService.checkShortCut(this.urlText);
      if (this.shortcut) {
        let tl = gsap.timeline();
        tl.to('.search', { duration: 0.2, y: -30 }).to('.search', {
          duration: 0.2,
          y: 0,
        });
      }
    }
    if (event.key == 'Enter' && this.urlText.length > 1) {
      this.appService.webSearch(this.urlText);
    } else if (event.key == 'Escape') {
      this.resetSearch();
    }
  }
  ngAfterViewInit(): void {
    this.urlInput.nativeElement.focus();
  }

  ngOnInit(): void {
    this.time = this.appService.getTime();
    this.greetin = this.appService.getGreetins();
    this.date = this.appService.getDate();
    this.art = this.appService.getHentai();
    this.handleQuotes()
    setTimeout(() => {
      this.urlInput.nativeElement.focus()
    }, 200);
   
  }

  handleQuotes(){
    this.appService.getQuote().subscribe(res=>{
      this.quote = res[0].content
      this.author = res[0].author
      const authorHTML = this.authorTag.nativeElement
      gsap.fromTo('.author',{opacity:0}, {opacity:1,  duration: 1})
    })
  }

  resetSearch() {
    this.urlText = '';
  }
}
