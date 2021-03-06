import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { navLinks } from 'Utils/navLinks'

import render from 'Utils/render'
import { Login } from './index'

it('renders login component', () => {

  expect(() =>
    render(
      <BrowserRouter>
          <Login onSubmit={() => {}} />
      </BrowserRouter>
    )
  ).not.toThrow()
})

describe('Check content of Login component', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Login onSubmit={() => {}} />
    </BrowserRouter>
  )

  it('checks if title rendered', () => {
    // const title = getByText('ENTRAR')
    // expect(title).toHaveTextContent('Entrar')
  })

  it('checks if subtitle rendered', () => {
    const title = getByText(
      'Laboratorio dos Fazeres e Saberes Tecnicos da Economia Criativa'
    )
    expect(title).toHaveTextContent(
      'Laboratorio dos Fazeres e Saberes Tecnicos da Economia Criativa'
    )
  })
})

describe('Check user session links', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Login onSubmit={() => {}} />
    </BrowserRouter>
  )
  it('check SignIn button', () => {
    expect(getByText('ENTRAR').closest('button')).toHaveTextContent('ENTRAR')
  })

  it('check SignUp button', () => {
    expect(getByText(navLinks.cadastro.label).closest('a')).toHaveAttribute(
      'href',
      navLinks.cadastro.path
    )
  })

  it('check Recover link', () => {
    expect(getByText(navLinks.forgotPass.label).closest('a')).toHaveAttribute(
      'href',
      navLinks.forgotPass.path
    )
  })
})
