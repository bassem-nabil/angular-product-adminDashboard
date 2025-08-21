import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-footer',
  template: `
    <div class="pc-footer">
      <div class="footer-wrapper container-fuild">
        <div class="row">
          <div class="col my-1">
            <p class="m-0">
              AZ Product 
              <a routerLink="/dashboard">Dashboard</a>
            </p>
          </div>
          <div class="col-auto my-1">
            <ul class="list-inline footer-link mb-0">
              <li class="list-inline-item">
                <a routerLink="/products">Products</a>
              </li>
              <li class="list-inline-item">
                <a routerLink="/orders">Orders</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: []
})
export class FooterComponent {}
