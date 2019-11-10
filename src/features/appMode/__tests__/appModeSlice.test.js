import appModeReducer, { AppModes, toggleMode } from '../appModeSlice';

it('should return the initial state', () => {
  expect(appModeReducer(undefined, {})).toEqual(AppModes.REMOTE);
});

it('should toggle the state when teh toggleMode action is triggered', () => {
  expect(appModeReducer(AppModes.REMOTE, toggleMode())).toEqual(AppModes.PLAYER);
  expect(appModeReducer(AppModes.PLAYER, toggleMode())).toEqual(AppModes.REMOTE);
});
