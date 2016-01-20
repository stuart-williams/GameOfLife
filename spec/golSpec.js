var GOL = require('../gol');

describe('Game of Life', function () {

    describe('the createWorld function', function () {
        var i = 0;
        var inputs = [2, 10, 100];
        var outputs = [4, 100, 10000];

        beforeEach(function (done) {
            GOL.worldSize = inputs[i++];
            GOL.createWorld();
            done();
        });

        function runTest(item, i) {
            it('with a worldSize of ' + inputs[i] + ' creates a world of size ' + outputs[i], function (done) {
                expect(Object.keys(GOL.world).length).toEqual(outputs[i]);
                done();
            });
        }

        inputs.forEach(runTest);
    });

});
