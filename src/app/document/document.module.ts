import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { providePortalDialogService } from '@onecx/angular-accelerator'

import { documentFeature } from './document.reducers'
import { routes } from './document.routes'
import { DocumentDetailsComponent } from './pages/document-details/document-details.component'
import { DocumentDetailsEffects } from './pages/document-details/document-details.effects'
import { DocumentCreateOperationsEffects } from './operations/document-create-operations.effects'
import { DocumentCreateComponent } from './pages/document-create/document-create.component'
import { DocumentCreateEffects } from './pages/document-create/document-create.effects'
import { DocumentQuickUploadComponent } from './pages/document-quick-upload/document-quick-upload.component'
import { DocumentSearchComponent } from './pages/document-search/document-search.component'
import { DocumentSearchEffects } from './pages/document-search/document-search.effects'
import { DocumentTypeSearchComponent } from './pages/document-type-search/document-type-search.component'
import { DocumentTypeSearchEffects } from './pages/document-type-search/document-type-search.effects'

@NgModule({
  providers: [providePortalDialogService()],
  imports: [
    DocumentCreateComponent,
    DocumentDetailsComponent,
    DocumentSearchComponent,
    DocumentQuickUploadComponent,
    DocumentTypeSearchComponent,
    RouterModule.forChild(routes),
    StoreModule.forFeature(documentFeature),
    EffectsModule.forFeature([
      DocumentCreateEffects,
      DocumentDetailsEffects,
      DocumentSearchEffects,
      DocumentCreateOperationsEffects,
      DocumentTypeSearchEffects
    ])
  ]
})
export class DocumentModule {}
