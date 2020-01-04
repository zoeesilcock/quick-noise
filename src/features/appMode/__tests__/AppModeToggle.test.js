import React from 'react';
import { render, fireEvent } from '@testing-library/react'

import AppModeToggle from '../AppModeToggle';
import { AppModes } from '../appModeSlice';

const props = {
  appMode: AppModes.REMOTE,
  setMode: () => {},
};

it('renders without crashing', () => {
  render(<AppModeToggle {...props} />);
});

it('calls the setMode prop when player option is clicked', () => {
  const setMode = jest.fn();
  const { getByLabelText  } = render(
    <AppModeToggle {...Object.assign({}, props, { setMode })} />
  );

  const playerRadio = getByLabelText('Player');
  fireEvent.click(playerRadio);

  expect(setMode).toHaveBeenCalledTimes(1);
});

it('calls the setMode prop when remote option is clicked', () => {
  const setMode = jest.fn();
  const { getByLabelText  } = render(
    <AppModeToggle {...Object.assign({}, props, { appMode: AppModes.PLAYER, setMode })} />
  );

  const remoteRadio = getByLabelText('Remote');
  fireEvent.click(remoteRadio);

  expect(setMode).toHaveBeenCalledTimes(1);
});
