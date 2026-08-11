import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

import { ButtonModule } from 'primeng/button'
import { FloatLabelModule } from 'primeng/floatlabel'
import { FluidModule } from 'primeng/fluid'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { TooltipModule } from 'primeng/tooltip'

import {
  DocumentCharacteristicFormValue,
  DocumentCharacteristicsFormGroup
} from '../../../../types/document-create.types'
import { createCharacteristicFormGroup } from '../../../../utils/document-details-form.factory'

@Component({
  selector: 'app-document-create-characteristics',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    TableModule,
    FloatLabelModule,
    FluidModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './document-create-characteristics.component.html'
})
export class DocumentCreateCharacteristicsComponent implements OnInit {
  @Input() characteristics: DocumentCharacteristicFormValue[] = []

  @Output() back = new EventEmitter<void>()
  @Output() save = new EventEmitter<DocumentCharacteristicFormValue[]>()

  readonly characteristicsForm = new FormArray<DocumentCharacteristicsFormGroup>([])

  ngOnInit(): void {
    this.buildForm()
  }

  onBackClick(): void {
    this.back.emit()
  }

  onAddCharacteristic(): void {
    this.characteristicsForm.push(createCharacteristicFormGroup())
  }

  onRemoveCharacteristic(index: number): void {
    this.characteristicsForm.removeAt(index)
  }

  onSaveClick(): void {
    this.characteristicsForm.markAllAsTouched()
    if (this.characteristicsForm.invalid) {
      return
    }

    this.save.emit(this.characteristicsForm.getRawValue())
  }

  trackByIndex(index: number): number {
    return index
  }

  private buildForm(): void {
    this.characteristicsForm.clear()
    this.characteristics.forEach((characteristic) => {
      this.characteristicsForm.push(
        createCharacteristicFormGroup({
          id: characteristic.id ?? undefined,
          name: characteristic.name ?? undefined,
          value: characteristic.value ?? undefined
        })
      )
    })
  }
}
