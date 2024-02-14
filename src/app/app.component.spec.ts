import { AppComponent } from './app.component';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { TranslateTestingModule } from 'ngx-translate-testing';

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
