import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService, MeasurLanguage } from '../language.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent implements OnInit, OnDestroy {
  activeLanguage: MeasurLanguage = 'en';
  private languageSub: Subscription;

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageSub = this.languageService.activeLanguage.subscribe(language => {
      this.activeLanguage = language;
    });
  }

  ngOnDestroy(): void {
    this.languageSub.unsubscribe();
  }

  setLanguage(language: MeasurLanguage): void {
    this.languageService.setLanguage(language);
  }
}
