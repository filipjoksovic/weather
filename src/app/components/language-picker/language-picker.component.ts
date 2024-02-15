import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-language-picker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './language-picker.component.html',
  styleUrl: './language-picker.component.scss',
})
export class LanguagePickerComponent {
  private readonly translateService = inject(TranslateService);

  private readonly weatherService = inject(WeatherService);

  public selectedLanguage = this.translateService.currentLang;

  languageSelected($event: Event) {
    this.translateService.use(($event.target as any).value);
    this.weatherService.dispatchReload();
  }
}
