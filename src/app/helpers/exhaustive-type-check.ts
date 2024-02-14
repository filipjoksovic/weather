export function exhaustiveTypeCheck(reloadAction: never) {
  console.error(`Provided value ${reloadAction} is not a supported value`);
  return reloadAction;
}
