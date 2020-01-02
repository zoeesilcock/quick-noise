import React from 'react';

import { renderWithRedux } from '../../../setupTests';

import RemoteContainer from '../RemoteContainer';
import { AppModes } from '../../appMode/appModeSlice';

it('renders without crashing in remote mode', () => {
  const initialState = {
    appMode: AppModes.REMOTE,
    remote: { showingConnect: false }
  };
  renderWithRedux(<RemoteContainer />, { initialState });
});

it('renders without crashing in player mode', () => {
  const initialState = {
    appMode: AppModes.PLAYER,
    remote: { showingConnect: false }
  };
  renderWithRedux(<RemoteContainer />, { initialState });
});
