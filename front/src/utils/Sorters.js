const scoreSort = (num, property) => {
  return (a, b) => {
    if (num === 1) {
      return a[property] - b[property];
    } else {
      return b[property] - a[property];
    }
  };
}

const nameSort = (num, property) => {
  return (a, b) => {
    if (num === 1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  };
};

const sortName = (num, array) => {
  if (num !== 1 && num !== -1) return console.log("first arg must be 1 or -1");
  return array.sort(nameSort(num, "name"));
};

const sortScore = (num, array) => {
  if (num !== 1 && num !== -1) return console.log("first arg must be 1 or -1");
  return array.sort(scoreSort(num, "healthScore"));
};

export { sortName, sortScore };