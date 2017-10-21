const evolveCell = (isAlive, liveNeighbours) =>
  (isAlive && liveNeighbours === 2) || liveNeighbours === 3 ? 1 : 0

function countLiveNeighbours (cells, x, y) {
  const neighbours = [
    [x + 1, y - 1], [x + 1, y], [x + 1, y + 1], [x, y + 1],
    [x - 1, y + 1], [x - 1, y], [x - 1, y - 1], [x, y - 1]
  ]
  return neighbours.reduce((count, [ x, y ]) =>
    count + (cells[x] && cells[x][y]) || count, 0)
}

function trim (cells) {
  return cells.reduce((accum, row) => {
    return row.some(Boolean) ? [ ...accum, row ] : accum
  }, [])
}

function evolve (cells) {
  const xCells = [ ...cells.map((row) => [ ...row, 0 ]), [ 0, 0, 0, 0 ] ]

  return trim(xCells.map((row, x) => row.map((cell, y) => {
    const liveNeighbours = countLiveNeighbours(cells, x, y)
    return evolveCell(cell, liveNeighbours)
  })))
}

function getGeneration (cells, generations) {
  return Array(generations).fill(0).reduce(evolve, cells)
}

module.exports = getGeneration
