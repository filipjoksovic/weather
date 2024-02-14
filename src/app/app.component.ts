import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { HeaderComponent } from './components/header/header.component';
import { DefaultLayoutComponent } from './layout/components/default-layout/default-layout.component';

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

  constructor(private readonly translate: TranslateService) {
    this.translate.setDefaultLang('sl');
    this.translate.use('sl');
  }
}
