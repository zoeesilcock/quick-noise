import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import Modal from 'react-modal';

import AddRemoteCode from '../AddRemoteCode';

const props = {
  isShowingCode: true,
  hideCode: () => {},
  newRemoteCode: 13377331,
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
  const { queryByText } = render(<AddRemoteCode {...props} />);
  const title = queryByText('Remote code');
  const code = queryByText('1337-7331');

  expect(title).not.toBeNull();
  expect(code).not.toBeNull();
});

it('renders without crashing without a code', () => {
  const { queryByText } = render(<AddRemoteCode {...Object.assign({}, props, { newRemoteCode: undefined })} />);
  const title = queryByText('Remote code');
  const code = queryByText('undefined');

  expect(title).not.toBeNull();
  expect(code).toBeNull();
});

it('does not renders when isShowingCode is false', () => {
  const { queryByText } = render(<AddRemoteCode {...Object.assign({}, props, { isShowingCode: false })} />);
  const title = queryByText('Remote code');
  expect(title).toBeNull();
});

it('calls the hideCode prop when close is clicked', () => {
  const hideCode = jest.fn();
  const { getByText } = render(
    <AddRemoteCode {...Object.assign({}, props, { hideCode })} />
  );

  const closeButton = getByText('Close');
  fireEvent.click(closeButton);

  expect(hideCode).toHaveBeenCalledTimes(1);
});
