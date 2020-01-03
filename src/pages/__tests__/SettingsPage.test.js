import React from 'react';

import { renderWithRedux } from '../../setupTests';

import SettingsPage from '../SettingsPage';

it('renders without crashing', () => {
  renderWithRedux(<SettingsPage />);
});
