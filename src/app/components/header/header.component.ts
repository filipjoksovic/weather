import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { LanguagePickerComponent } from '../language-picker/language-picker.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, FaIconComponent, LanguagePickerComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
