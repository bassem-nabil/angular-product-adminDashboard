// import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { routes } from './app.routes';
// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
// import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//   bgsColor: '#1f2452',
//   fgsType: 'three-bounce', 
//   fgsColor: '#1f2452', 
//   fgsSize: 70,
//   pbColor: '#1f2452',
//   pbDirection: 'ltr', 
//   pbThickness: 5,
//   overlayColor: 'rgba(0, 0, 0, 0.5)',
//   bgsOpacity: 0.1, 
//   text: 'Loading...', 
//   textColor: '#ffffff',
//   maxTime: 5000
// };

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideAnimations(),
//     provideHttpClient(withInterceptorsFromDi()),
//     importProvidersFrom(
//       NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
//     ),
//     provideNgxSkeletonLoader({
//       theme: {
//         extendsFromRoot: true,
//         height: '30px',
//       },
//     }),
    
//   ]
// };
