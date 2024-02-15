import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './components/header/header.component';
import { DefaultLayoutComponent } from './layout/components/default-layout/default-layout.component';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DefaultLayoutComponent,
    HeaderComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Weather';

  constructor(private readonly languageService: LanguageService) {
    this.languageService.initTranslateService();
  }
}
