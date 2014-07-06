var TilingWall = require('../src/tiling_wall').TilingWall;

var expect = require('expect.js');

describe('constructor', function () {
	it('should throw if width of a target is zero', function() {
		expect(function() {
			var input = [{width: 0, height: 10}];
			var tw = new TilingWall(input);
			var output = tw.arrange(10);
		}).to.throwError();
	});

	it('should throw if height of a target is zero', function() {
		expect(function() {
			var input = [{width: 10, height: 0}];
			var tw = new TilingWall(input);
			var output = tw.arrange(10);
		}).to.throwError();
	});

	it('should throw if width of a target is undefined', function() {
		expect(function() {
			var input = [{height: 10}];
			var tw = new TilingWall(input);
			var output = tw.arrange(10);
		}).to.throwError();
	});

	it('should throw if width of a target is NaN', function() {
		expect(function() {
			var input = [{width: NaN, height: 10}];
			var tw = new TilingWall(input);
			var output = tw.arrange(10);
		}).to.throwError();
	});
});

describe('arrange', function () {
	it('should throw if argument is not passed', function() {
		expect(function() {
			var input = [{width: 10, height: 10}];
			var tw = new TilingWall(input);
			var output = tw.arrange();
		}).to.throwError();
	});

	it('should throw if argument is zero', function() {
		expect(function() {
			var input = [{width: 10, height: 10}];
			var tw = new TilingWall(input);
			var output = tw.arrange(0);
		}).to.throwError();
	});

	it('should return an array if input is an array array', function() {
		var input = [{width: 10, height: 10}];
		var tw = new TilingWall(input);
		var output = tw.arrange(10);
		expect(output).to.be.an('array');
		expect(output).to.have.property(0);
	});

	it('should return an object if input is an array object', function() {
		var input = {foo: {width: 10, height: 10}};
		var tw = new TilingWall(input);
		var output = tw.arrange(10);
		expect(output).to.be.an('object');
		expect(output).not.to.be.an('array');
		expect(output).to.have.property('foo');
	});

	it('should have the right output format', function() {
		var input = [{width: 10, height: 10}];
		var tw = new TilingWall(input);
		var output = tw.arrange(10);
		expect(output[0]).to.have.property('width');
		expect(output[0]).to.have.property('height');
		expect(output[0]).to.have.property('x');
		expect(output[0]).to.have.property('y');
	});

	it('should set width and height', function() {
		var input = [{width: 10, height: 10}];
		var tw = new TilingWall(input);
		var output = tw.arrange(10);
		expect(tw.width).to.be(10);
		expect(tw.height).to.be(10);
	});

	it('should cover the entire rectangle', function() {
		var input = [];
		for (var n = 1; n <= 5; n++) {
			for (var m = 1; m <= 5; m++) {
				input.push({width: n, height: m});
			}
		}
		var tw = new TilingWall(input);
		var output = tw.arrange(10);

		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				var x = tw.width * i / 10;
				var y = tw.height * j / 10;
				expect(output.some(function(out) {
					return out.x <= x && x <= out.x + out.width &&
						out.y <= y && y <= out.y + out.height;
				})).to.be.ok();
			}
		}
	});
});

