import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

/**
 * Shared module for the bilingual (English/Persian) UI.
 * @ngx-translate/core v18 dropped TranslateModule — TranslatePipe is a
 * standalone pipe now, so it's imported directly (standalone
 * pipes/directives/components can be listed in an NgModule's `imports`).
 * Import I18nSharedModule wherever a feature module's templates use the
 * `translate` pipe, and specifically wherever <app-language-switcher> is
 * placed.
 */
@NgModule({
  declarations: [
    LanguageSwitcherComponent
  ],
  imports: [
    CommonModule,
    TranslatePipe
  ],
  exports: [
    TranslatePipe,
    LanguageSwitcherComponent
  ]
})
export class I18nSharedModule { }
