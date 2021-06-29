import { createResponseMock, mockRouteHandler, createRequestMock, asMock } from "Utils/mockUtils"
import expectStatus from "Utils/expectStatus"

import UserRepository from "Repository/UserRepository"
import User from "Entities/User"
import CreateUser from "./CreateUser"
import UpdateUser from "./UpdateUser"
import { RequestHandler } from "express"
import { DeepPartial } from "typeorm"

describe('UpdateUser Route Handler', () => {

  let UserRepo: UserRepository
  let updateUserRoute: RequestHandler<DeepPartial<User>>
  let createUserRoute: RequestHandler<DeepPartial<User>>
  let mockTable: any

  beforeAll(() => {
    UserRepo = new UserRepository()
    createUserRoute = CreateUser({ UserRepo })
    updateUserRoute = UpdateUser({ UserRepo })

    jest.spyOn(UserRepo, 'create').mockImplementation(info => mockTable.push({ ...info, id: `${info.name}.${info.password}`}) )
    jest.spyOn(UserRepo, 'save').mockReturnValue(Promise.resolve({} as User))
    jest.spyOn(UserRepo, 'generateHash').mockImplementation(password => password)
    jest.spyOn(UserRepo, 'findByEmail').mockImplementation(email => mockTable.find(findUser => findUser.email === email))
    jest.spyOn(UserRepo, 'findById').mockImplementation(id => mockTable.find(findUser => findUser.id === id))
  })

  beforeEach(() => {
    asMock(UserRepo.create).mockClear()
    asMock(UserRepo.save).mockClear()
    mockTable = [];
  })


  it('should be able update the user profile', async () => {

    const userInfo = {
      name: 'john doe',
      email: 'johndoe@hotmail.com',
      password: '123456'
    }

    const user = UserRepo.create(userInfo)

    const response = createResponseMock()
    const updatedUser = createRequestMock({
      user_id: user.id,
      name: 'John Wick',
      email: 'johnwick@hotmail.com'
    })

    await mockRouteHandler(updateUserRoute, updatedUser, response)

    const UserTable = RepoConfig.table

    expect(UserTable.length).toBe(1)
    expect(updatedUser.body?.name).toBe('John Wick')
    expect(updatedUser.body?.email).toBe('johnwick@hotmail.com')
  })

})  