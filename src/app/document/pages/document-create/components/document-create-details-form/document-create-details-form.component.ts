import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { SelectItem } from 'primeng/api'
import { ButtonModule } from 'primeng/button'

import { DocumentDetailsFormComponent } from 'src/app/document/components/document-details-form/document-details-form.component'
import { createDocumentDetailsSectionForm } from '../../../../utils/document-details-form.factory'
import { DocumentCreateDetailsFormGroup, DocumentCreateDetailsStepData } from '../../../../types/document-create.types'

@Component({
  selector: 'app-document-create-details-form',
  imports: [TranslateModule, ReactiveFormsModule, DocumentDetailsFormComponent, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './document-create-details-form.component.html'
})
export class DocumentCreateDetailsFormComponent implements OnInit {
  @Input() details: Partial<DocumentCreateDetailsStepData> | null = null
  @Input() availableTypes: SelectItem[] = []

  @Output() next = new EventEmitter<Partial<DocumentCreateDetailsStepData>>()

  readonly formGroup: DocumentCreateDetailsFormGroup = createDocumentDetailsSectionForm()

  ngOnInit(): void {
    if (this.details) {
      this.formGroup.patchValue(this.details, { emitEvent: false })
      this.formGroup.markAsPristine()
    }
  }

  onNextClick(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched()
      return
    }

    this.next.emit(this.formGroup.getRawValue())
  }
}
