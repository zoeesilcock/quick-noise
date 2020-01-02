import React from 'react';

import { renderWithRedux } from '../../setupTests';
import App from '../App';

it('renders without crashing', () => {
  renderWithRedux(<App />);
});
