import React from 'react'
import { storiesOf } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import SkipNav from '.'

storiesOf("Components/SkipNav", module)
  .addParameters({ component: SkipNav })
  .add("SkipNav", () => <BrowserRouter ><SkipNav /></BrowserRouter>)
