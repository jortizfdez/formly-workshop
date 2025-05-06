import { Component, OnInit } from '@angular/core'
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AppService } from './services/app.service'

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

  constructor(private _formBuilder: FormBuilder , private _appService:AppService) {}

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
          fieldGroup: [
            {
              key:'employee-number',
            type :'input',
            validators:{
              min:{

              }
            },
            props:{
              label:'Numero empleado',
              required:true,
              options:[
                
              ]
            }
          },
            {
            key:'rol',
            type :'select',
            validators:{
              min:{
                
              }
            },
            props:{
              label:'Rol informador',
              required:true,
              options:
                this._appService.getRoles()
              
            }
          },
            {key:'responsable',
            type :'select',
            resetOnHide:true,
            validators:{
              min:{
                
              }
            },
            props:{
              label:'responsable',
              required:true,
              options:['n1111', 'n2222']
            }
          }
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
