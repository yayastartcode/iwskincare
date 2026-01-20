import * as migration_20260119_135049_initial from './20260119_135049_initial';

export const migrations = [
  {
    up: migration_20260119_135049_initial.up,
    down: migration_20260119_135049_initial.down,
    name: '20260119_135049_initial'
  },
];
