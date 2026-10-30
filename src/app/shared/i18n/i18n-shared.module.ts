import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

/**
 * Shared module for the bilingual (English/Persian) UI.
 * Import TranslateModule (no forRoot/forChild args needed beyond app.module's
 * forRoot) wherever a feature module's templates use the `translate` pipe,
 * and import this module specifically wherever <app-language-switcher> is
 * placed.
 */
@NgModule({
  declarations: [
    LanguageSwitcherComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    TranslateModule,
    LanguageSwitcherComponent
  ]
})
export class I18nSharedModule { }
