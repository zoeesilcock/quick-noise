import appModeReducer, { AppModes, toggleMode, setMode } from '../appModeSlice';

it('should return the initial state', () => {
  expect(appModeReducer(undefined, {})).toEqual(AppModes.REMOTE);
});

it('should toggle the state when the toggleMode action is triggered', () => {
  expect(appModeReducer(AppModes.REMOTE, toggleMode())).toEqual(AppModes.PLAYER);
  expect(appModeReducer(AppModes.PLAYER, toggleMode())).toEqual(AppModes.REMOTE);
});

it('should update the state when the setMode action is triggered', () => {
  expect(appModeReducer(AppModes.REMOTE, setMode(AppModes.PLAYER))).toEqual(AppModes.PLAYER);
  expect(appModeReducer(AppModes.PLAYER, setMode(AppModes.REMOTE))).toEqual(AppModes.REMOTE);
});
