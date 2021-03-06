const Werewolf = require('./werewolf');
const Teddy = require('./teddy');
const Util = require('./util');

const Game = function() {
  this.werewolves = [];
  this.teddy = new Teddy({ pos: [Game.DIM_X / 2, Game.DIM_Y / 2], x: Game.DIM_X, y: Game.DIM_Y });
  this.secondsElapsed = 0;
  this.gameOver = false;
};

Game.DIM_X = window.innerWidth;
Game.DIM_Y = window.innerHeight - 55;

Game.prototype.isGameOver = function() {
  this.werewolves.forEach(wolf => {
    if (this.teddy.isCollidedWith(wolf)) {
      this.gameOver = true;
    }
  });
};

Game.prototype.update = function() {
  this.moveObjects();
  this.isGameOver();
};

Game.prototype.addWolf = function() {
  const newWolf = new Werewolf({ pos: this.randomPos(), x: Game.DIM_X, y: Game.DIM_Y });
  this.werewolves.push(newWolf);
};

Game.prototype.randomPos = function() {
  const rand = [];
  rand.push([32 + Math.floor(Math.random() * (Game.DIM_X - 32)), 0]);
  rand.push([0, Math.floor(Math.random() * (Game.DIM_Y - 50))]);
  return rand[Math.floor(Math.random() * rand.length)];
};


Game.prototype.draw = function(context) {
  context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

  const bgrImg = new Image();
  bgrImg.src = 'http://res.cloudinary.com/dl8lhjvx0/image/upload/v1468453193/1_criorz.jpg';
  context.drawImage(bgrImg, 0, 0, Game.DIM_X, Game.DIM_Y);

  this.werewolves.forEach(wolf => {
    wolf.draw(context);
  });

  this.teddy.draw(context);

  context.fillStyle = "rgb(250, 250, 250)";
  context.font = "24px Helvetica";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText("Time elapsed: " + this.secondsElapsed, Game.DIM_X - 200, 32);

};

Game.prototype.moveObjects = function() {
  this.werewolves.forEach(wolf => {
    wolf.move();
  });
};

module.exports = Game;
