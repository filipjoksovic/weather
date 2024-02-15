import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { WeatherService } from '../../services/weather.service';
import { LanguagePickerComponent } from './language-picker.component';

describe('LanguagePickerComponent', () => {
  let spectator: Spectator<LanguagePickerComponent>;
  const createComponent = createComponentFactory({
    component: LanguagePickerComponent,
    detectChanges: false,
    shallow: false,
    imports: [
      TranslateTestingModule.withTranslations({}),
      HttpClientTestingModule,
    ],
    providers: [mockProvider(WeatherService, {})],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('Should create component (smoke)', () => {
    expect(spectator.component).toExist();
  });
});
