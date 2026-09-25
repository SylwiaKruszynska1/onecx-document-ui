import { createSelector } from '@ngrx/store'

import { createChildSelectors } from '@onecx/ngrx-accelerator'
import { RowListGridData } from '@onecx/angular-accelerator'

import { DocumentType } from 'src/app/shared/generated'
import { documentFeature } from '../../document.reducers'
import { initialState } from './document-type-search.reducers'
import { DocumentTypeSearchViewModel } from './document-type-search.viewmodel'

export const documentTypeSearchSelectors = createChildSelectors(documentFeature.selectDocumentTypes, initialState)

export const selectSearchCriteria = documentTypeSearchSelectors.selectSearchCriteria

export const selectResults = createSelector(
  documentTypeSearchSelectors.selectResults,
  selectSearchCriteria,
  (results: DocumentType[], searchCriteria): RowListGridData[] => {
    let filtered = results
    if (searchCriteria?.name) {
      const searchName = searchCriteria.name.toLowerCase()
      filtered = filtered.filter((item) => item.name?.toLowerCase().includes(searchName))
    }
    return filtered.map((item) => ({
      imagePath: '',
      ...item,
      id: item.id!
    }))
  }
)

export const selectDocumentTypeSearchViewModel = createSelector(
  documentTypeSearchSelectors.selectColumns,
  selectResults,
  documentTypeSearchSelectors.selectLoadingIndicator,
  documentTypeSearchSelectors.selectResultComponentState,
  documentTypeSearchSelectors.selectSearchHeaderComponentState,
  documentTypeSearchSelectors.selectDialogVisible,
  documentTypeSearchSelectors.selectEditingDocumentType,
  (
    columns,
    results,
    loadingIndicator,
    resultComponentState,
    searchHeaderComponentState,
    dialogVisible,
    editingDocumentType
  ): DocumentTypeSearchViewModel => ({
    columns,
    results,
    loadingIndicator,
    resultComponentState,
    searchHeaderComponentState,
    dialogVisible,
    editingDocumentType
  })
)
