import { Unique } from '../helpers';
import { AlarmoArea, EArmModes } from '../types';

export const modesByArea = (areaCfg: AlarmoArea) =>
  (Object.keys(areaCfg.modes) as EArmModes[]).filter(mode => areaCfg.modes[mode].enabled);

export const getModesList = (config: Record<string, AlarmoArea>) => {
  let modes: EArmModes[] = [];

  Object.values(config).forEach(area => {
    modes = [...modes, ...modesByArea(area)];
  });

  modes = Unique(modes);

  modes.sort((a, b) => {
    const modesList = Object.values(EArmModes);
    const indexA = modesList.findIndex(e => e == a);
    const indexB = modesList.findIndex(e => e == b);
    return indexA - indexB;
  });

  return modes;
};
