import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-picker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './language-picker.component.html',
  styleUrl: './language-picker.component.scss',
})
export class LanguagePickerComponent {
  private readonly translateService = inject(TranslateService);

  private readonly languageService: LanguageService = inject(LanguageService);

  public selectedLanguage = this.translateService.currentLang;

  languageSelected($event: Event) {
    this.languageService.setDefaultLangage(($event.target as any).value);
  }
}
