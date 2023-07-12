import { divMod } from 'services/math';

export const formatDuration = (milliseconds: number) => {
  let hours: number, minutes: number;
  [hours, milliseconds] = divMod(milliseconds, 60 * 60 * 1000);
  [minutes, milliseconds] = divMod(milliseconds, 60 * 1000);
  const seconds = Math.trunc(milliseconds / 1000);
  return [hours, minutes, seconds]
    .filter((value, i) => i !== 0 || value)
    .map((value) => value.toString().padStart(2, '0'))
    .join(':');
};
