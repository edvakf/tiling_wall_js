(function(global) {
'use strict';

var SPLIT_VERTICAL = 0;
var SPLIT_HORIZONTAL = 1;

var TilingWall = function(targets) {
	this.targets = targets;
	this.target_names = [];
	this.target_num = 0;

	for (var x in targets) if (targets.hasOwnProperty(x)) {
		var target = targets[x];
		if (!(0 < target.width && 0 < target.height)) throw new Error('Bad Arguments');
		this.target_names.push(x);
		this.target_num++;
	}
	if (this.target_num === 0) throw new Error('Bad Arguments');

	this.node_num = this.target_num * 2 - 1;
};

TilingWall.prototype._init = function() {
	this.nodes = [];
	for (var i = 0; i < this.node_num; i++) {
		this.nodes.push({
			node_id: i,
			parent: i === 0 ? -1 : ((i - 1) / 2) | 0,
			left: (this.node_num <= i * 2 + 1) ? -1 : (i * 2 + 1),
			right: (this.node_num <= i * 2 + 2) ? -1 : (i * 2 + 2),
			split: Math.random() < 0.5 ? SPLIT_VERTICAL : SPLIT_HORIZONTAL,
			x: 0.0,
			y: 0.0,
			width: 0.0,
			height: 0.0,
			aspect: 0.0,
			name: null
		});
	}

	for (var j = 0, l = this.target_num; j < l; j++) {
		var target_name = this.target_names[j];
		var target = this.targets[target_name];
		var node_id = l + j - 1;
		this.nodes[node_id].width = target.width;
		this.nodes[node_id].height = target.height;
		this.nodes[node_id].aspect = target.width / target.height;
		this.nodes[node_id].name = target_name;
	}
};

TilingWall.prototype._calcAspect = function() {
	for (var node_id = this.target_num - 2; 0 <= node_id; node_id--) {
		var node = this.nodes[node_id];
		var left_aspect = this.nodes[node.left].aspect;
		var right_aspect = this.nodes[node.right].aspect;

		if (node.split === SPLIT_VERTICAL) {
			node.aspect = left_aspect + right_aspect;
		} else {
			node.aspect = (left_aspect * right_aspect) / (left_aspect + right_aspect);
		}
	}
};

TilingWall.prototype._calcPosition = function(width) {
	this.width = this.nodes[0].width = width;
	this.height = this.nodes[0].height = width / this.nodes[0].aspect;

	for (var node_id = 1, l = this.node_num; node_id < l; node_id++) {
		var node = this.nodes[node_id];

		var p = this.nodes[node.parent];
		if (p.split === SPLIT_VERTICAL) {
			node.height = p.height;
			node.width = node.height * node.aspect;
		} else {
			node.width = p.width;
			node.height = node.width / node.aspect;
		}

		if (node.node_id === p.left) {
			node.x = p.x;
			node.y = p.y;
		} else {
			if (p.split === SPLIT_VERTICAL) {
				node.x = p.x + p.width - node.width;
				node.y = p.y;
			} else {
				node.y = p.y + p.height - node.height;
				node.x = p.x;
			}
		}
	}
};

TilingWall.prototype._shuffleTargets = function() {
	// fisher yates shuffle
	for (var i = this.target_names.length - 1; i > 0; i--) {
		var j = (Math.random() * i) | 0;
		var tmp = this.target_names[i];
		this.target_names[i] = this.target_names[j];
		this.target_names[j] = tmp;
	}
};

TilingWall.prototype._formatResults = function() {
	var results = this.targets.length ? [] : {};
	for (var i = this.target_num - 1, l = this.nodes.length; i < l; i++) {
		var node = this.nodes[i];
		results[node.name] = {
			width: node.width,
			height: node.height,
			x: node.x,
			y: node.y
		};
	}
	return results;
};

TilingWall.prototype.arrange = function(width) {
	if (arguments.length !== 1 || width <= 0) throw new Error('Bad Arguments');

	this._shuffleTargets();
	this._init();
	this._calcAspect();
	this._calcPosition(+width);
	return this._formatResults();
};

if (typeof exports !== 'undefined') {
	exports.TilingWall = TilingWall;
} else if (typeof define === 'function' && define.amd) {
	define([], function() {return TilingWall;});
} else {
	global.TilingWall = TilingWall;
}

} (this));
