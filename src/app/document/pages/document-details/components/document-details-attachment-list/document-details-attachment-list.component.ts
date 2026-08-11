import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

import { ButtonModule } from 'primeng/button'
import { FluidModule } from 'primeng/fluid'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { TooltipModule } from 'primeng/tooltip'

import { DocumentAttachmentFormValue } from '../../../../types/document-create.types'
import { formatBytes } from '../../../../utils/attachment.utils'

@Component({
  selector: 'app-document-details-attachment-list',
  imports: [
    TranslateModule,
    FloatLabelModule,
    TableModule,
    FluidModule,
    ButtonModule,
    TooltipModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './document-details-attachment-list.component.html',
  styleUrl: './document-details-attachment-list.component.scss'
})
export class DocumentDetailsAttachmentListComponent {
  @Input() attachments!: FormArray<FormGroup>
  @Input() editMode = false

  @Output() download = new EventEmitter<DocumentAttachmentFormValue>()
  @Output() retryUpload = new EventEmitter<{ id: string; fileName: string }>()

  readonly formatBytes = formatBytes

  onDownloadClicked(attachmentFormGroup: FormGroup): void {
    this.download.emit(this.getAttachmentValue(attachmentFormGroup))
  }

  onRetryUploadClicked(attachmentFormGroup: FormGroup) {
    const { id, fileName } = this.getAttachmentValue(attachmentFormGroup)
    this.retryUpload.emit({ id: id!, fileName: fileName! })
  }

  trackByIndex(index: number): number {
    return index
  }

  getUploadStatusKey(attachmentFormGroup: FormGroup): string {
    const uploadStatus = attachmentFormGroup.get('storageUploadStatus')?.value
    return uploadStatus ? 'DOCUMENT_DETAILS.ATTACHMENTS.STATUS.UPLOADED' : 'DOCUMENT_DETAILS.ATTACHMENTS.STATUS.FAILED'
  }

  private getAttachmentValue(attachmentFormGroup: FormGroup): DocumentAttachmentFormValue {
    return attachmentFormGroup.getRawValue() as DocumentAttachmentFormValue
  }
}
