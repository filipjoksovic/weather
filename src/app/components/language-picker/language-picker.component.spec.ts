import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { LanguagePickerComponent } from './language-picker.component';

describe('LanguagePickerComponent', () => {
  let spectator: Spectator<LanguagePickerComponent>;
  const createComponent = createComponentFactory({
    component: LanguagePickerComponent,
    detectChanges: false,
    shallow: false,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('Should create component (smoke)', () => {
    expect(spectator.component).toExist();
  });
});
