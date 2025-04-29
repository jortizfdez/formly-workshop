import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {FormBuilder, FormGroup  } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {


  constructor(private _formBuilder: FormBuilder){

  }
  
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  scibForm = this._formBuilder.group({
    scibGlobal: false,
  });

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
  ];

  ngOnInit(): void {
    this._getIsScibGlobal()
  }

  private  _getIsScibGlobal(){
    this.scibForm.valueChanges.subscribe(formValue=>{
      // Añade aqui el codigo necesario para poder hacer dinamicos los campos que requieren el valor

    })
  }

  submit() {
    alert(JSON.stringify(this.model));
  }
}