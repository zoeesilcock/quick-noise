import React from 'react';

import AppModeContainer from '../features/appMode/AppModeContainer';
import AddRemoteContainer from '../features/addRemote/AddRemoteContainer';
import RemoteContainer from '../features/remote/RemoteContainer';

const SettingsPage = () => {
  return (
    <div>
      <h1>Settings</h1>
      <AppModeContainer />
      <br />
      <AddRemoteContainer />
      <RemoteContainer />
    </div>
  )
}

export default SettingsPage;
