export const volumeSetter = jest.fn();
export const noiseStart = jest.fn();
export const noiseStop = jest.fn();

const volumeValue = {};
Object.defineProperty(volumeValue, 'value', {
  set: volumeSetter
});

export const toMaster = jest.fn().mockImplementation(() => {
  return {
    volume: volumeValue,
    start: noiseStart,
    stop: noiseStop,
  };
});

export const NoiseConstructor = jest.fn().mockImplementation(() => {
  return { toMaster };
});

const tone = {
  Noise: NoiseConstructor,
};

export default tone;
