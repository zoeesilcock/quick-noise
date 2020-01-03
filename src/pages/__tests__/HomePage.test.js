import React from 'react';

import { renderWithRedux } from '../../setupTests';

import HomePage from '../HomePage';

it('renders without crashing', () => {
  renderWithRedux(<HomePage />);
});
