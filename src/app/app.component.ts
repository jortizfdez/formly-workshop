import { Component, OnInit } from '@angular/core'
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { FormBuilder, FormGroup } from '@angular/forms'

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

  constructor(private _formBuilder: FormBuilder) {}

  form = new FormGroup({})
  model: any = {}
  options: FormlyFormOptions = {}

  scibForm = this._formBuilder.group({
    scibGlobal: false,
    language: 'en',
  })

  scibGlobalSwitch= false

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
            {
              key: 'title',
              type: 'input',
              props: {
                label: 'Title',
                required: true,
                type:'text'
              }
            },
            {
              key: 'bugDescription',
              type: 'textarea',
              props: {
                label: 'Bug description',
                type: 'text-area',
                required: false,
                minLength: 50
              }
            },
            {
              key: 'geography',
              type: 'select',
              props: {
                label: 'Geography',
                type: 'select-input',
                required: true,
                options:[
                  {label: 'ES', value : 'ES' }, 
                  {label: 'GB', value : 'GB' },
                  {label: 'PT', value : 'PT' },
                  {label: 'GLOBAL', value : 'GLOBAL' },
                ]
              },
              expressions: {
                'props.disabled': (field: FormlyFieldConfig) => {
                  return this.scibGlobalSwitch;
                },
                'model.geography': (field: FormlyFieldConfig) => {
                  if(this.scibGlobalSwitch){
                    return 'GLOBAL'
                  }else {
                    return null
                  }
                }
              
               
              }
            }
          ],
        },
        {
          props: { label: 'Entorno' },
          fieldGroup: [
            //Configura aqui la seccion 3
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
      if (!values.scibGlobal){
        this.scibGlobalSwitch= false
      }else{
        this.scibGlobalSwitch= true
      }
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
