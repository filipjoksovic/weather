import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { StorageKeysEnum } from '../models/core/storage-keys.enum';
import { StorageService } from './storage.service';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(
    private readonly translate: TranslateService,
    private readonly storageService: StorageService,
    private readonly weatherService: WeatherService
  ) {}

  public initTranslateService() {
    const selectedLanguage = this.storageService.get<string>(
      StorageKeysEnum.SELECTED_LANG
    );
    this.translate.setDefaultLang(selectedLanguage || 'sl');
    this.translate.use(selectedLanguage || 'sl');
  }

  public setDefaultLangage(value: string) {
    this.storageService.set(StorageKeysEnum.SELECTED_LANG, value);
    this.translate.use(value);
    this.weatherService.dispatchReload();
  }
}
