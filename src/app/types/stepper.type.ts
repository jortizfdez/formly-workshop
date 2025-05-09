import { Component } from '@angular/core'
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  selector: 'formly-field-stepper',
  template: `
    <mat-stepper linear #stepper>
      <mat-step
        *ngFor="
          let step of field.fieldGroup;
          let index = index;
          let last = last
        "
      >
        <ng-template matStepLabel>{{ step?.props?.label }}</ng-template>
        <formly-field [field]="step"></formly-field>
        <div>
          <button
            matStepperPrevious
            *ngIf="index !== 0"
            class="btn btn-primary"
            type="button"
          >
            Back
          </button>
          <button
            matStepperNext
            *ngIf="!last"
            class="btn btn-primary"
            type="button"
          >
            Next
          </button>
          <button
            *ngIf="last"
            class="btn btn-primary"
            [disabled]="!form.valid"
            type="submit"
          >
            Submit
          </button>
        </div>
      </mat-step>
    </mat-stepper>
  `,
})

// Sustituir linea 24 por la 8 / Sustituir linea 25 por la 13
// <mat-step *ngFor="let step of field.fieldGroup; let index = index; let last = last" [completed]="isValid(step)">
// <button matStepperNext *ngIf="!last" class="btn btn-primary" type="button" [disabled]="!isValid(step)">
export class FormlyFieldStepper extends FieldType {
  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      return !!field?.formControl?.valid
    }

    return field.fieldGroup
      ? field.fieldGroup.every((f) => this.isValid(f))
      : true
  }
}
