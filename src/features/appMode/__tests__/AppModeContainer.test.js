import React from 'react';

import { renderWithRedux } from '../../../setupTests';

import AppModeContainer from '../AppModeContainer';
import { AppModes } from '../appModeSlice';

it('renders without crashing', () => {
  const initialState = { appMode: AppModes.PLAYER };
  renderWithRedux(<AppModeContainer />, { initialState });
});
