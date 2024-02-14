import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultLayoutComponent } from './layout/components/default-layout/default-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
