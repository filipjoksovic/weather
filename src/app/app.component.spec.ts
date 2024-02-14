import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [TranslateTestingModule.withTranslations({})],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('Should render component', () => {
    expect(spectator).toBeDefined();
  });
});
