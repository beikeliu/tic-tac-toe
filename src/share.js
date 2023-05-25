export const getInitItems = () => {
  const items = {};
  for(let n = 0; n < 9; n++) {
    items[n] = undefined;
  }
  return items;
}

export const calculateWinner = (values) => {
  let winner = undefined;
  const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winning.map((line) => {
    const [x, y, z] = line;
    if (values[x] && values[x] === values[y] && values[x] === values[z]) {
      winner = values[x];
    }
  });
  return winner;
}
