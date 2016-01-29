describe('Game of Life', function () {

    describe('evolve', function () {
        var evolve = require('../gol').evolve;

        var world = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ];

        var newWorld = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        it('should produce a new world equal to newWorld', function () {
            expect(evolve(world)).toEqual(newWorld);
        });
    });

    describe('getNumberOfLiveNeighbours', function () {
        var getNumberOfLiveNeighbours = require('../gol').getNumberOfLiveNeighbours;

        var world = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ];

        var newWorld = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        it('should get the number of live neighbours for a particular cell', function () {
            expect(getNumberOfLiveNeighbours(world, 0, 0)).toBe(1);
        });
    });

    describe('getNextCellState', function () {
        var getNextCellState = require('../gol').getNextCellState;

        it('should get the number of live neighbours for a particular cell', function () {
            expect(getNextCellState(1, 0)).toBe(0);
            expect(getNextCellState(1, 1)).toBe(0);
            expect(getNextCellState(1, 2)).toBe(1);
            expect(getNextCellState(1, 3)).toBe(1);
            expect(getNextCellState(1, 4)).toBe(0);
            expect(getNextCellState(0, 0)).toBe(0);
            expect(getNextCellState(0, 1)).toBe(0);
            expect(getNextCellState(0, 2)).toBe(0);
            expect(getNextCellState(0, 3)).toBe(1);
            expect(getNextCellState(0, 4)).toBe(0);
        });
    });

});
