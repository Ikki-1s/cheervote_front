export const AdjustStringLength = (
  targetString: string,
  maxLength: number,
  addCharacter?: string,
) => {
  let returnString;
  if (targetString.length > maxLength) {
    returnString = addCharacter
      ? targetString.substring(0, maxLength) + addCharacter
      : targetString.substring(0, maxLength);
  } else {
    returnString = targetString;
  }
  return returnString;
};
