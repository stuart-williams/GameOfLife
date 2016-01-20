/**
 * Rules:
 * Any live cell with two or three live neighbours lives on to the next generation.
 * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */

(function () {
    'use strict';

    var timeoutId;

    function times(num, callback) {
        /**
         * Array(num) creates an empty array i.e. num = 3 you'll get [,,,].
         * We use apply because forEach ignores the 'holes' but apply does not, it passes them as 'undefined'.
         */
        Array.apply(null, Array(num)).forEach(callback);
    }

    var GOL = {

        world: {},
        worldSize: 50,
        initialState: ['0:0', '0:1', '0:2', '0:3'],

        traverseWorld: function (callback) {
            times(GOL.worldSize, function (o, i) {
                times(GOL.worldSize, function (oo, ii) {
                    var id = i + ':' + ii;
                    callback.call(GOL, id, GOL.world[id] || 0);
                });
            });
        },

        createWorld: function () {
            console.log('Creating world...');
            this.traverseWorld(function (cellId) {
                this.world[cellId] = this.initialState.indexOf(cellId) > -1 ? 1 : 0;
            });
        },

        getLiveNeighbourCount: function (cellId) {
            var p = cellId.split(':');
            var x = parseInt(p[0], 10);
            var y = parseInt(p[1], 10);

            var get = function (x, y) {
                var id = x + ':' + y;
                GOL.world[id] = GOL.world[id] === undefined ? 0 : GOL.world[id];
                return GOL.world[id];
            };

            return get(x+1, y-1) + get(x+1, y) + get(x+1, y+1) + get(x, y+1) + get(x-1, y+1) + get(x-1, y) + get(x-1, y-1) + get(x, y-1);
        },

        getCellNextGenState: function (isAlive, liveNeighbourCount) {
            return (isAlive && liveNeighbourCount === 2) || liveNeighbourCount === 3 ? 1 : 0;
        },

        nextGeneration: function () {
            console.log('Computing generation...');

            this.hasLiveCells = false;

            this.traverseWorld(function (cellId, isAlive) {
                this.world[cellId] = this.getCellNextGenState(isAlive, this.getLiveNeighbourCount(cellId));
                if (this.world[cellId]) {
                    this.hasLiveCells = true;
                }
            });

            console.log(this.world);

            if (!this.hasLiveCells) {
                console.log('All cells are dead...');
                this.stop();
            }
        },

        next: function () {
            GOL.nextGeneration();
            if (timeoutId !== null) {
                timeoutId = setTimeout(GOL.next, 100);
            }
        },

        stop: function () {
            console.log('Stopping...');
            clearTimeout(timeoutId);
            timeoutId = null;
        },

        start: function () {
            this.next();
        },

        init: function () {
            console.log('Initializing...');
            this.createWorld();
        }

    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = GOL;
        }
        exports.GOL = GOL;
    } else {
        window.GOL = GOL;
        window.addEventListener('DOMContentLoaded', GOL.init.bind(GOL));
    }

}());
