import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react'

import AppModeToggle from '../AppModeToggle';
import { AppModes } from '../appModeSlice';

const props = {
  appMode: AppModes.REMOTE,
  setMode: () => {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppModeToggle {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calls the setMode prop when clicked', () => {
  const setMode = jest.fn();
  const { getByLabelText  } = render(
    <AppModeToggle {...Object.assign({}, props, { setMode })} />
  );

  const toggle = getByLabelText('Player');
  fireEvent.click(toggle);
  expect(setMode).toHaveBeenCalledTimes(1);
});
