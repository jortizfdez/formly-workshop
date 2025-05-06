import { Component, OnInit } from '@angular/core'
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formValuesJson: string = ''
  public languages = [
    { value: 'en', viewValue: 'En' },
    { value: 'es', viewValue: 'Es' },
  ]

  constructor(private _formBuilder: FormBuilder) { }

  form = new FormGroup({})
  model: any = {}
  options: FormlyFormOptions = {}

  scibForm = this._formBuilder.group({
    scibGlobal: false,
    language: 'en',
  })

  fields: FormlyFieldConfig[] = [
    {
      type: 'stepper',
      fieldGroup: [
        {
          props: { label: 'Reporter' },
          fieldGroup: [
            //Configura aqui la seccion 1
          ],
        },
        {
          props: { label: 'Detail' },
          fieldGroup: [
            //Configura aqui la seccion 2
          ],
        },
        {
          props: { label: 'Entorno' },
          fieldGroup: [
            {
              key: 'application',
              type: 'input',
              props: {
                label: 'Application',
                required: true,
              },
              expressions: {
                'model.application': (field: FormlyFieldConfig) => {
                  if (this.scibForm.value.scibGlobal) {
                    return 'GLOBAL'
                  } else {
                    return '';
                  }
                },
              },
            },
            {
              key: 'environment',
              type: 'select',
              props: {
                label: 'Environment',
                required: true,
                options: [
                  { label: 'PRO', value: 'PRO' },
                  { label: 'PRE', value: 'PRE' },
                  { label: 'DEV', value: 'DEV' }]
              },
            },
            {
              key: 'category',
              type: 'select',
              props: {
                label: 'Category',
                required: true,
                disabled: true,
                options: []
              },
              expressions: {
                'props.disabled': (field: FormlyFieldConfig) => { return !field.model.environment || field.model.environment === 'DEV' },
                'props.options': (field: FormlyFieldConfig) => {
                  if (field.model.environment === 'PRO') {
                    return [
                      { label: 'CAT A', value: 'CAT A' },
                      { label: 'CAT B', value: 'CAT B' }]
                  } else if (field.model.environment === 'PRE') {
                    return [
                      { label: 'CAT C', value: 'CAT C' },
                      { label: 'CAT D', value: 'CAT D' }]
                  } else if (field.model.environment === 'DEV') {
                    field.model.category = null;
                  }
                  return [];
                }
              }
            }
          ],
        },
        {
          props: { label: 'Prioridad' },
          fieldGroup: [
            //Configura aqui la seccion 4
          ],
        },
        {
          props: { label: 'Info adicional' },
          fieldGroup: [
            //Configura aqui la seccion 5
          ],
        },
      ],
    },
  ]

  ngOnInit(): void {
    this._getIsScibGlobal()
    this._printFormValues()
  }

  reset() {
    //Añade el codigo necesario para resetear el formulario
  }

  private _getIsScibGlobal() {
    this.scibForm.valueChanges.subscribe((values) => {
      // Añade aqui el codigo necesario para poder hacer dinamicos los campos que requieren el valor de SCIB y el idioma

    })
  }

  private _printFormValues() {
    this.form.valueChanges.subscribe((formValues) => {
      this.formValuesJson = JSON.stringify(formValues, null, 2)
    })
  }

  submit() {
    alert(JSON.stringify(this.model))
  }
}
