const toCamelCase = (string) => {

  const strSplit = string.split("-");
  let returnStr = strSplit[0].toLowerCase();

  for (let i = 1; i < strSplit.length; i++) {
    returnStr += strSplit[i].charAt(0).toUpperCase() + strSplit[i].slice(1);
  }

  return returnStr;

};

const toShuffledString = (string, length) => {

  

};