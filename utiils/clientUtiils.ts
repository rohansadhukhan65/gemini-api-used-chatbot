 

export const removeSpacesAndSpecialCharsAndLowerCase = (str:string) => str.replaceAll(/[^a-zA-Z0-9]/g, '').toLowerCase()
