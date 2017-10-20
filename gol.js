const evolveCell = (isAlive, liveNeighbours) =>
  (isAlive && liveNeighbours === 2) || liveNeighbours === 3 ? 1 : 0

function countLiveNeighbours (world, x, y) {
  const neighbours = [
    [x + 1, y - 1], [x + 1, y], [x + 1, y + 1], [x, y + 1],
    [x - 1, y + 1], [x - 1, y], [x - 1, y - 1], [x, y - 1]
  ]
  return neighbours.reduce((count, [ x, y ]) =>
    count + (world[x] && world[x][y]) || count, 0)
}

function evolve (world) {
  return world.map((row, x) => {
    return row.map((cell, y) => evolveCell(cell, countLiveNeighbours(world, x, y)))
  })
}

function getGeneration (cells, generations) {
  return Array(generations).fill(0).reduce(evolve, cells)
}

module.exports = getGeneration
