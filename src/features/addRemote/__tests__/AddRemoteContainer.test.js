import React from 'react';

import { renderWithRedux } from '../../../setupTests';

import AddRemoteContainer from '../AddRemoteContainer';
import { AppModes } from '../../appMode/appModeSlice';

it('renders without crashing in remote mode', () => {
  const initialState = {
    appMode: AppModes.REMOTE,
  };
  renderWithRedux(<AddRemoteContainer />, { initialState });
});

it('renders without crashing in player mode', () => {
  const initialState = {
    appMode: AppModes.PLAYER,
    addRemote: {
      fetchingCode: false,
      showingCode: false,
      newRemoteCode: 1337,
    }
  };
  renderWithRedux(<AddRemoteContainer />, { initialState });
});
