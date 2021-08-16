import AdminBro from 'adminjs'
import AdminBroExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/typeorm';
// import User from 'Entities/User'; 
import { Connection } from 'typeorm'
import AnimalExample from 'Entities/AnimalExample';
import { getResources, makeConnections } from './resources'

// Vai precisar adicionar class validador ao adminBro caso use

AdminBro.registerAdapter( { Database, Resource } )


export const getAdminBro = (conn: Connection) => {
    makeConnections(conn)
    AnimalExample.useConnection(conn)
    return new AdminBro({
      // databases: [conn],
      resources: getResources(),
      branding: {
        companyName: "Labfaz",
        logo: false
      },
      rootPath: '/admin'
    })
}

const getAdminRouter = (adminBro: AdminBro) => {
  return AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: (email, password) => {
      // Tendo a entidade de usuario bem definida com roles da pra
      // fazer essa autenticação usando a dados do banco de dados
      if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
        return {
          email,
          title: "Main",
          id: 1
        }
      } else {
        return null
      }
    },
    cookiePassword: 'somestrongpassowrd',
    cookieName: 'nicename'
  },
  null,
  {
    saveUninitialized: false,
    resave: true,
    secret: 'somestrongpassword'
  });
}

export default getAdminRouter;
