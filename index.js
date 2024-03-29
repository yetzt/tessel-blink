
function blink(pin){
	if (!this instanceof blink) return new blink(pin);
	var self = this;
	self.timer = null;
	self.pin = pin;
	self.pin.write(0); // start off
	return this;
	self.pin.write(++state%2);
};

blink.prototype.stop = function(fn){
	var self = this;
	if (self.timer) clearInterval(self.timer);
	if (typeof fn === "function") fn();
	return self;
};

blink.prototype.on = function(fn){
	var self = this;
	self.stop(function(){
		self.pin.write(1);
		if (typeof fn === "function") fn();
	});
	return self;
};

blink.prototype.off = function(fn){
	var self = this;
	self.stop(function(){
		self.pin.write(0);
		if (typeof fn === "function") fn();
	});
	return self;
};

blink.prototype.blink = function(freq){
	var self = this;
	if (!freq || typeof freq !== "number") freq = 100;
	else if (freq < 50) freq = 50;
	self.stop(function(){
		var state = 0;
		self.timer = setInterval(function(){
			self.pin.write(++state%2);
		},freq);
	});
	return self;
};

blink.prototype.pulse = function(freq_low, freq_high){
	var self = this;
	if (!freq_high || typeof freq_high !== "number") freq_high = 100;
	if (!freq_low || typeof freq_low !== "number") freq_low = freq_high;
	if (freq_high < 50) freq_high = 50;
	if (freq_low < 50) freq_low = 50;
	self.stop(function(){
		self.pin.write(1);
		setTimeout(function(){
			self.pin.write(0);
		},freq_low)
		self.timer = setInterval(function(){
			self.pin.write(1);
			setTimeout(function(){
				self.pin.write(0);
			},freq_low)
		},freq_high+freq_low);
	});
	return self;
};

module.exports = blink;