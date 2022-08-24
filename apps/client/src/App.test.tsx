import React from 'react'
import render from 'Utils/render'

import App from 'App'

it('renders without exploding', () => {
  expect(() => render(<App />)).not.toThrow()
})
