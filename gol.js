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
  const end = cells.length - 1

  return cells.reduce((accum, row) => {
    if (!cells.map((row) => row[0]).includes(1)) row = row.slice(1)
    if (!cells.map((row) => row[end]).includes(1)) row = row.slice(0, -1)

    return row.includes(1) ? [ ...accum, row ] : accum
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
