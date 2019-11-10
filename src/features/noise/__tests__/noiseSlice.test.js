import noiseReducer, { setIsPlaying } from '../noiseSlice';

it('should return the initial state', () => {
  expect(noiseReducer(undefined, {})).toEqual({ isPlaying: false });
});

it('should set the state to whatever is sent to the setIsPlaying action', () => {
  expect(noiseReducer({ isPlaying: true }, setIsPlaying(false))).toEqual({ isPlaying: false });
  expect(noiseReducer({ isPlaying: false }, setIsPlaying(true))).toEqual({ isPlaying: true });
});
