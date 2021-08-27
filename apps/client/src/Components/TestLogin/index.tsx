import React, { FC, useCallback, useContext, useState } from "react"
import { useHistory } from "react-router"
import styled from "styled-components"

import { CurrentUserContext } from "Context/CurrentUser"
import { login } from "Api/Session"
import { ErrorObject } from "Api"

import Test from "./Test"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 20em;
`

export const TestLogin: FC = ({}) => {
  const { loginToken, setToken, setUser } = useContext(CurrentUserContext)
  const [error, setError] = useState<ErrorObject | undefined>(undefined)
  const history = useHistory()

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((e) => {
    // manually doing form stuff
    e.preventDefault()
    const email = e.currentTarget.querySelector("input#email")?.value
    const password = e.currentTarget.querySelector("input#password")?.value
    
    // login, set context and redirect
    login(email, password)
      .then(({ token, user }) => {
        setToken(token)
        setUser(user)
      })
      .then(() => history.push("/home"))
      .catch(err => setError(err))
  }, [setToken, loginToken])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container>
          <input type="text" id="email"/>
          <input type="password" id="password"/>
          <button type="submit">login</button>
        </Container>
      </form>

      {/* example use with a component that internally uses the useContext hook */}
      <Test />
      {/* example use with Context.Consumer */}
      <CurrentUserContext.Consumer>
        {({ user }) => <div>logged in user is {JSON.stringify(user?.email)}</div> }
      </CurrentUserContext.Consumer>

      { error && 
        <div>
          <pre>code: {error.code}</pre>
          <pre>msg: {error.message}</pre>
          {error.data && <pre>data: {JSON.stringify(error.data, null, 2)}</pre> }
        </div>
      }

    </>
  )
}

export default TestLogin
