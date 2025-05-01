import { Injectable } from '@angular/core'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  getRoles() {
    const roles = [
      'Administrador',
      'Recursos Humanos',
      'Empleado',
      'Supervisor',
    ]
    return of(roles)
  }

  getFormFieldTranslations(lang: 'es' | 'en') {
    const translations = {
      es: {
        // Sección 1: Informador
        employeeNumber: 'Número de empleado',
        email: 'Email',
        employeeType: 'Tipo de empleado',
        reporterRole: 'Rol del informador',
        assignResponsible: 'Asignar responsable',

        // Sección 2: Detalles
        title: 'Título',
        bugDescription: 'Descripción del bug',
        reproductionSteps: 'Pasos para reproducirlo',
        geography: 'Geografía',

        // Sección 3: Entorno
        application: 'Aplicación',
        environment: 'Entorno',
        category: 'Categoría',
        client: 'Cliente',

        // Sección 4: Prioridad
        severity: 'Severidad',
        priority: 'Prioridad',
        notifyTeam: 'Notificar a equipo',

        // Sección 5: Información Adicional
        attachments: 'Adjuntos',
        numberOfAttachments: 'Número de adjuntos',
        link: 'Enlace',
      },

      en: {
        // Section 1: Informer
        employeeNumber: 'Employee Number',
        email: 'Email',
        employeeType: 'Employee Type',
        reporterRole: 'Reporter Role',
        assignResponsible: 'Assign Responsible',

        // Section 2: Details
        title: 'Title',
        bugDescription: 'Bug Description',
        reproductionSteps: 'Steps to Reproduce',
        geography: 'Geography',

        // Section 3: Environment
        application: 'Application',
        environment: 'Environment',
        category: 'Category',
        client: 'Client',

        // Section 4: Priority
        severity: 'Severity',
        priority: 'Priority',
        notifyTeam: 'Notify Team',

        // Section 5: Additional Info
        attachments: 'Attachments',
        numberOfAttachments: 'Number of Attachments',
        link: 'Link',
      },
    }

    return of(translations[lang])
  }
}
