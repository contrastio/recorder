export const divMod = (a: number, b: number) => {
  return [Math.trunc(a / b), a % b] as const;
};
