import autoToggleSlice, { setAutoToggle } from '../autoToggleSlice';

it('should return the initial state', () => {
  expect(autoToggleSlice(undefined, {})).toEqual(false);
});

it('should update the state when the setAutoToggle action is triggered', () => {
  expect(autoToggleSlice(true, setAutoToggle(false))).toEqual(false);
  expect(autoToggleSlice(false, setAutoToggle(true))).toEqual(true);
});
