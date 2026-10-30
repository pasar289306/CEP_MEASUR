import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export type MeasurLanguage = 'en' | 'fa';

const STORAGE_KEY = 'measurLanguage';
const RTL_LANGUAGES: MeasurLanguage[] = ['fa'];

/**
 * Owns the app's bilingual (English/Persian) runtime language switch:
 * - loads the active translation file via ngx-translate
 * - sets <html lang> and <html dir> so native form controls and
 *   third-party widgets (ngx-bootstrap, plotly, etc.) also flip direction
 * - remembers the choice in localStorage so the desktop app reopens in
 *   the language the person left it in
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  activeLanguage: BehaviorSubject<MeasurLanguage> = new BehaviorSubject<MeasurLanguage>('en');

  constructor(
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.translateService.addLangs(['en', 'fa']);
    this.translateService.setFallbackLang('en');
  }

  init(): void {
    const savedLanguage = this.getSavedLanguage();
    this.setLanguage(savedLanguage);
  }

  setLanguage(language: MeasurLanguage): void {
    this.translateService.use(language).subscribe();
    this.activeLanguage.next(language);
    this.applyDocumentDirection(language);
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (e) {
      // localStorage can be unavailable (private browsing, some Electron contexts).
      // Language still works for the session; it just won't persist.
    }
  }

  toggleLanguage(): void {
    const next: MeasurLanguage = this.activeLanguage.getValue() === 'en' ? 'fa' : 'en';
    this.setLanguage(next);
  }

  isRtl(language: MeasurLanguage = this.activeLanguage.getValue()): boolean {
    return RTL_LANGUAGES.includes(language);
  }

  private applyDocumentDirection(language: MeasurLanguage): void {
    const htmlElement = this.document.documentElement;
    htmlElement.setAttribute('lang', language);
    htmlElement.setAttribute('dir', this.isRtl(language) ? 'rtl' : 'ltr');
    htmlElement.classList.toggle('measur-rtl', this.isRtl(language));
  }

  private getSavedLanguage(): MeasurLanguage {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'fa') {
        return saved;
      }
    } catch (e) {
      // ignore, fall back to default below
    }
    return 'en';
  }
}
