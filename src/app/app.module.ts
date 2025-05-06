import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core'
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormlyFieldStepper } from './types/stepper.type'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatStepperModule } from '@angular/material/stepper'
import { MatButtonModule } from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSelectModule } from '@angular/material/select'
import { FormlyFieldTextArea } from '@ngx-formly/bootstrap/textarea'
import { FormlyFieldInput } from '@ngx-formly/bootstrap/input'
import { FormlyFieldSelect } from '@ngx-formly/bootstrap/select'
import { FormlyFieldRadio } from '@ngx-formly/bootstrap/radio'
import { AbstractControl, ValidationErrors} from '@angular/forms'

export function isEmployeeValidationMessage(error: any, field: FormlyFieldConfig) {
  return `"${field?.formControl?.value}" is not a valid employee number`;
}

export function isEmployeeValidator(control: AbstractControl): ValidationErrors | null {
  return ((control.value).toString().startsWith('N') ||  (control.value).toString().startsWith('X')) && (control.value).toString().length > 3 ? { 'employee': true } : null;
}

@NgModule({
  declarations: [AppComponent, FormlyFieldStepper],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,

    FormlyModule.forRoot({
      /* Añade aqui todos los modulos que necesites */
      types: [
        { name: 'stepper', component: FormlyFieldStepper, wrappers: [] },
        { name: 'text', component: FormlyFieldInput, wrappers: [] },
        { name: 'text-area', component: FormlyFieldTextArea, wrappers: [] },
        { name: 'radiobutton', component: FormlyFieldRadio, wrappers: [] },
      ],
      validationMessages: [
				{ name: 'required', message: 'This field is required' },
        { name: 'minLength', message: 'Se requiere al menos 50 caracteres' },
				{ name: 'employeeNumber', message: isEmployeeValidationMessage},
			],
			validators: [{ name: 'isEmployee', validation: isEmployeeValidator }],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
