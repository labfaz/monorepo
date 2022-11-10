import React from 'react';
import { storiesOf } from '@storybook/react';

import Login from './Login';

storiesOf('Pages/Login', module)
  .addParameters({ component: Login })
  .add('default', () => <Login />);
