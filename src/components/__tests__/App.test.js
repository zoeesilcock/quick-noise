import React from 'react';

import App from '../App';
import { renderWithRedux } from '../../setupTests';

it('renders without crashing', () => {
  renderWithRedux(<App />);
});
