'use strict';

function getNextCellState(isAlive, numberOfLiveNeighbours) {
    return (isAlive && numberOfLiveNeighbours === 2) || numberOfLiveNeighbours === 3 ? 1 : 0;
}

function getNumberOfLiveNeighbours(world, x, y) {
    var neighbours = [
        [x+1, y-1], [x+1, y], [x+1, y+1], [x, y+1],
        [x-1, y+1], [x-1, y], [x-1, y-1], [x, y-1]
    ];
    return neighbours.reduce(function (count, n) {
        return count += world[n[0]] && world[n[0]][n[1]] || 0;
    }, 0);
}

function evolve(world) {
    return world.map(function (line, x) {
        return line.map(function (cellState, y) {
            return getNextCellState(cellState, getNumberOfLiveNeighbours(world, x, y));
        });
    });
}

module.exports = {
    evolve: evolve,
    getNumberOfLiveNeighbours: getNumberOfLiveNeighbours,
    getNextCellState: getNextCellState
};
