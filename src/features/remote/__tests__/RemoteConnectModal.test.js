import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import Modal from 'react-modal';

import RemoteConnectModal from '../RemoteConnectModal';

const props = {
  showingConnect: true,
  setConnectShow: () => {},
  connectRemote: () => {},
};

beforeAll(() => {
  const app = document.createElement('div');
  app.id = 'app';

  document
    .getElementsByTagName('body')
    .item(0)
    .appendChild(app);

  Modal.setAppElement('#app');
});

it('renders without crashing', () => {
  const { queryByText } = render(<RemoteConnectModal {...props} />);
  const title = queryByText('Connect to player');
  expect(title).not.toBeNull();
});

it('does not renders when showingConnect is false', () => {
  const { queryByText } = render(<RemoteConnectModal {...Object.assign({}, props, { showingConnect: false })} />);
  const title = queryByText('Connect to player');
  expect(title).toBeNull();
});

it('calls the setConnectShow prop when close is clicked', () => {
  const setConnectShow = jest.fn();
  const { getByText } = render(
    <RemoteConnectModal {...Object.assign({}, props, { setConnectShow })} />
  );

  const closeButton = getByText('Close');
  fireEvent.click(closeButton);

  expect(setConnectShow).toHaveBeenCalledTimes(1);
  expect(setConnectShow).toHaveBeenCalledWith(false);
});

it('calls the setConnectShow prop when connect is clicked', () => {
  const connectRemote = jest.fn();
  const { getByText } = render(
    <RemoteConnectModal {...Object.assign({}, props, { connectRemote })} />
  );

  const connectButton = getByText('Connect');
  fireEvent.click(connectButton);

  expect(connectRemote).toHaveBeenCalledTimes(1);
});

it('updates internal state when code is entered', () => {
  const connectRemote = jest.fn();
  const newCode = 'fake-code';
  const { getByPlaceholderText } = render(
    <RemoteConnectModal {...Object.assign({}, props, { connectRemote })} />
  );

  const codeInput = getByPlaceholderText ('code');
  fireEvent.change(codeInput, { target: { value: newCode } });

  expect(codeInput.value).toEqual(newCode);
});
