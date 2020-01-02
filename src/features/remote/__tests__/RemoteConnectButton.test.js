import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react'

import RemoteConnectButton from '../RemoteConnectButton';

const props = {
  setConnectShow: () => {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RemoteConnectButton {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calls the setConnectShow prop when clicked', () => {
  const setConnectShow = jest.fn();
  const { getByText } = render(
    <RemoteConnectButton {...Object.assign({}, props, { setConnectShow })} />
  );

  const button = getByText('Connect to player');
  fireEvent.click(button);
  expect(setConnectShow).toHaveBeenCalledTimes(1);
});
