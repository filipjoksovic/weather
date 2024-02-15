import {
  AfterContentChecked,
  Component,
  inject,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { debounceTime, fromEvent } from 'rxjs';

import { CurrentMeasurementComponent } from '../../../components/current-measurement/current-measurement.component';
import { ForecastMeasurementsComponent } from '../../../components/forecast-measurements/forecast-measurements.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { LocationDataComponent } from '../../../components/location-data/location-data.component';

@UntilDestroy()
@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    LocationDataComponent,
    CurrentMeasurementComponent,
    ForecastMeasurementsComponent,
  ],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit, AfterContentChecked {
  /**
   * Since the forecast weather display is not reliable to always end up without an overflow
   * an improvisation needed to be made
   * The parent that holds two boxes has flex-grow:1, meaning that it will take up as much of screen
   * as it can. However, in case of a component overflow (like in forecast component), the component
   * will also grow, and so will the sibling. This created a bad look and bad UX.
   *
   * In order to fix that, here's 60 lines of code :D
   * @private
   */
  private spacerDefault = 16; // TODO extract vars from scss and use them here

  private spacerLg = 32;

  private defaultHeaderHeight = 44;

  private cutoffWidth = 320;

  private readonly rendererFactory = inject(RendererFactory2);

  private readonly renderer: Renderer2 = this.rendererFactory.createRenderer(
    null,
    null
  );

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.handleResizableContentSizing();
      });
  }

  ngAfterContentChecked() {
    this.handleResizableContentSizing();
  }

  private handleResizableContentSizing() {
    const screenHeight = window.innerHeight;
    const header = document.querySelector('app-header');
    const headerHeight = header?.clientHeight;

    const locationData = document.querySelector('app-location-data');
    const locationHeight = locationData?.clientHeight;
    let padding = 0;
    if (headerHeight! > this.defaultHeaderHeight) {
      padding = this.spacerLg;
    } else {
      padding = this.spacerDefault;
    }
    const measurementsContainer = document.querySelector(
      '.measurements-container'
    );
    if (window.innerWidth > this.cutoffWidth) {
      Array.prototype.slice
        .call(measurementsContainer!.children)
        .forEach(element => {
          this.renderer.setStyle(
            element,
            'height',
            `${screenHeight - headerHeight! - locationHeight! - padding / 2 - padding - padding}px`
          );
          this.renderer.setStyle(element, 'overflow-y', 'scroll');
        });
    } else {
      Array.prototype.slice
        .call(measurementsContainer!.children)
        .forEach(element => {
          this.renderer.removeStyle(element, 'overflow-y');
          this.renderer.removeStyle(element, 'height');
        });
    }
  }
}
