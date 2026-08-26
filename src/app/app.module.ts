import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { isDevMode, NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router'
import { LetDirective } from '@ngrx/component'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'

import { AngularAuthModule } from '@onecx/angular-auth'
import { AppStateService, APP_CONFIG, ConfigurationService } from '@onecx/angular-integration-interface'
import { AngularAcceleratorModule, providePortalDialogService } from '@onecx/angular-accelerator'
import { createTranslateLoader, provideTranslationPathFromMeta } from '@onecx/angular-utils'
import { startsWith } from '@onecx/angular-webcomponents'

import { environment } from 'src/environments/environment'
import { AppComponent } from './app.component'
import { metaReducers, reducers } from './app.reducers'
import { Configuration } from './shared/generated'
import { apiConfigProvider } from './shared/utils/apiConfigProvider.utils'

export const routes: Routes = [
  {
    matcher: startsWith(''),
    loadChildren: () => import('./document/document.module').then((mod) => mod.DocumentModule)
  },
  {
    matcher: startsWith('document-types'),
    loadChildren: () => import('./document/document.module').then((mod) => mod.DocumentModule)
  }
]

@NgModule({
  imports: [
    AppComponent,
    AngularAuthModule,
    BrowserAnimationsModule,
    LetDirective,
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    EffectsModule.forRoot([]),
    AngularAcceleratorModule,
    TranslateModule.forRoot({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient, AppStateService]
      }
    })
  ],
  providers: [
    providePortalDialogService(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: APP_CONFIG, useValue: environment },
    {
      provide: Configuration,
      useFactory: apiConfigProvider,
      deps: [ConfigurationService, AppStateService]
    },
    provideTranslationPathFromMeta(import.meta.url, 'assets/i18n/'),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {}
