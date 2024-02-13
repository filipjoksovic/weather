import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultLayoutComponent } from './layout/components/default-layout/default-layout.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DefaultLayoutComponent, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Weather';
}
