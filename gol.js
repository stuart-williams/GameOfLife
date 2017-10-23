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

const colHasLiveCells = (cells, n) => cells.map((row) => row[n]).includes(1)

function trim (cells) {
  const cellsEnd = cells.length - 1
  const rowEnd = cells[0].length - 1

  const newCells = cells.reduce((accum, row, i) => {
    if (!colHasLiveCells(cells, 0)) row = row.slice(1)
    if (!colHasLiveCells(cells, rowEnd)) row = row.slice(0, -1)
    if ((i === 0 || i === cellsEnd) && !row.includes(1)) return accum
    return [ ...accum, row ]
  }, [])

  if (!colHasLiveCells(newCells, 0) || !colHasLiveCells(newCells, newCells[0].length - 1) || !newCells[0].includes(1) || !newCells[newCells.length - 1].includes(1)) {
    return trim(newCells)
  }

  return newCells
}

function evolve (cells) {
  const xRow = Array(cells[0].length + 2).fill(0)
  const xCells = [ xRow, ...cells.map((row) => [ 0, ...row, 0 ]), xRow ]

  return trim(xCells.map((row, x) => row.map((cell, y) => {
    const liveNeighbours = countLiveNeighbours(xCells, x, y)
    return evolveCell(cell, liveNeighbours)
  })))
}

function getGeneration (cells, generations) {
  return Array(generations).fill(0).reduce(evolve, cells)
}

module.exports = getGeneration
