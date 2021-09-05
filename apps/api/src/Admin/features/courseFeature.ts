import adminjs, { BaseRecord, buildFeature } from 'adminjs'
import { CourseRepository } from "Repository/CourseRepository"

// Create new action for admin example
export const courseActions = (courseRepo?: CourseRepository) => buildFeature({
  actions: {
    abrirCurso: {
      icon: "Task",
      actionType: "record",
      isAccessible: ({currentAdmin}) => {
        if(currentAdmin) {
          return currentAdmin.title == "admin" || currentAdmin.title == "professor"
        }
        return false
      },
      handler: async (_request, _response, context ) => {
        const { currentAdmin } = context
        const record = context.record as BaseRecord

        record.update({
          available: true
        })

        return {
          record: record.toJSON(currentAdmin),
          notice: {
            message: ` Curso Aberto `
          }
        }
      },
      component: false
    },
    fecharCurso: {
      actionType: "record",
      icon: "MisuseOutline",
      isAccessible: ({currentAdmin}) => {
        if(currentAdmin) {
          return currentAdmin.title == "professor" || currentAdmin.title == "admin"
        }
        return false
      },
      handler: async (_request, _response, context) => {
        const { currentAdmin } = context
        const record = context.record as BaseRecord


        record.update({
          available: false
        })
        return {
          record: record.toJSON(currentAdmin),
          notice: {
            message: ` Curso fechado`
          }
        }
      },
      component: false
    },
    inscricoes: {
      actionType: "record",
      component: adminjs.bundle("../components/subscription.tsx"),
      handler: async (_request, _response, context) => {
        const { currentAdmin, record } = context
        
        if(record) {
          record.params = {
            ...record?.params,
            courseRepo: courseRepo
          }
        }

        return {
          record: record!.toJSON(currentAdmin)
        }
      }
    }
  }
})

export default courseActions
