import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideState } from '@ngrx/store';
import { productsFeature } from './app/store/reducers/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './app/store/effects/product.effects';
import { provideToastr } from 'ngx-toastr';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#1f2452',
  fgsType: 'three-bounce', 
  fgsColor: '#1f2452', 
  fgsSize: 70,
  pbColor: '#1f2452',
  pbDirection: 'ltr', 
  pbThickness: 5,
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  bgsOpacity: 0.1, 
  text: 'Loading...', 
  textColor: '#ffffff',
  maxTime: 5000
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)),
    provideNgxSkeletonLoader({
        theme: {
            extendsFromRoot: true,
            height: '30px',
        },
    }),
    provideStore(),
    provideState(productsFeature),
     importProvidersFrom(
      EffectsModule.forRoot([ProductsEffects]),
    ),
    provideStoreDevtools({ maxAge: 25 }),
    provideToastr(),
]
}).catch((err) => console.error(err));
