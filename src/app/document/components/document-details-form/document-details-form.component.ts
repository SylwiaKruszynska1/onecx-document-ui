import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

import { SelectItem } from 'primeng/api'
import { InputTextModule } from 'primeng/inputtext'
import { SelectModule } from 'primeng/select'
import { TooltipModule } from 'primeng/tooltip'
import { FloatLabelModule } from 'primeng/floatlabel'
import { FluidModule } from 'primeng/fluid'

import { LifeCycleState } from 'src/app/shared/generated/model/lifeCycleState'
import { DocumentCreateDetailsFormGroup, DocumentDetailsFormGroup } from '../../types/document-create.types'

@Component({
  selector: 'app-document-details-form',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    TooltipModule,
    FloatLabelModule,
    FluidModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './document-details-form.component.html',
  styleUrls: ['./document-details-form.component.scss']
})
export class DocumentDetailsFormComponent implements OnInit {
  @Input() formGroup!: DocumentDetailsFormGroup | DocumentCreateDetailsFormGroup
  @Input() availableTypes: SelectItem[] = []
  @Input() availableStatuses: SelectItem[] = []

  documentStatuses: SelectItem[] = []

  ngOnInit(): void {
    this.loadDocumentStatus()
  }

  isInvalid(controlName: string): boolean {
    const control = (this.formGroup as FormGroup).get(controlName)
    return !!control && control.invalid && (control.touched || control.dirty)
  }

  private loadDocumentStatus(): void {
    this.documentStatuses = Object.keys(LifeCycleState).map((key) => ({
      label: key,
      value: LifeCycleState[key as keyof typeof LifeCycleState]
    }))
  }
}
