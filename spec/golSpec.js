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

        it('should produce a correct new world', function () {
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

        var data = [{
            isAlive: 1, numberOfLiveNeighbours: 0, expect: 0,
            isAlive: 1, numberOfLiveNeighbours: 1, expect: 0,
            isAlive: 1, numberOfLiveNeighbours: 2, expect: 1,
            isAlive: 1, numberOfLiveNeighbours: 3, expect: 1,
            isAlive: 1, numberOfLiveNeighbours: 4, expect: 0,
            isAlive: 0, numberOfLiveNeighbours: 0, expect: 0,
            isAlive: 0, numberOfLiveNeighbours: 1, expect: 0,
            isAlive: 0, numberOfLiveNeighbours: 2, expect: 0,
            isAlive: 0, numberOfLiveNeighbours: 3, expect: 1,
            isAlive: 0, numberOfLiveNeighbours: 4, expect: 0
        }];

        it('should get the next cell state given the current cell state and its number of live neighbours', function () {
            data.forEach(function (o) {
                expect(getNextCellState(o.isAlive, o.numberOfLiveNeighbours)).toBe(o.expect);
            });
        });
    });

});
