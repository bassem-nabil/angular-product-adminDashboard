import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxUiLoaderModule],
  template: `
    <ngx-ui-loader></ngx-ui-loader>
    <router-outlet></router-outlet>
  `,
  styleUrls: []
})
export class AppComponent {
  constructor(private ngxUiLoaderService: NgxUiLoaderService) {
    //#region check loader with timeout
    this.ngxUiLoaderService.start();
    setTimeout(() => {
      this.ngxUiLoaderService.stop();
    }, 1000);
    //#endregion
  }
}
