import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { providePortalDialogService } from '@onecx/angular-accelerator'

import { documentFeature } from './document.reducers'
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

const routes: Routes = [
  {
    path: 'details/:id',
    component: DocumentDetailsComponent,
    pathMatch: 'full'
  },
  { path: '', component: DocumentSearchComponent, pathMatch: 'full' },
  { path: 'create-document', component: DocumentCreateComponent },
  { path: 'quick-upload', component: DocumentQuickUploadComponent },
  {
    path: 'document-types',
    component: DocumentTypeSearchComponent,
    pathMatch: 'full'
  }
]
@NgModule({
  providers: [providePortalDialogService()],
  imports: [
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
