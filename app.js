function Snake() {
  this.direction = 'left';

  this.body = [
    { row: 16, column: 20 },
    { row: 16, column: 21 },
    { row: 16, column: 22 },
    { row: 16, column: 23 },
    { row: 16, column: 24 }
  ];
}

Snake.prototype.move = function() {
  var head = this.body[0];

  switch(this.direction) {
    case 'left':
      this.body.unshift({
        row: head.row,
        column: (head.column - 1 + 50) %  50
      });
      break;

    // Your implementation
    case 'right':
      this.body.unshift({
        row: head.row,
        column: (head.column + 1) % 50
      });
      break;

    case 'up':
      this.body.unshift({
        row: (head.row - 1 + 50) % 50,
        column: head.column
      });
      break;

    case 'down':
      this.body.unshift({
        row: (head.row + 1) % 50,
        column: head.column
      });
      break;
  }
  this.body.pop();
};

Snake.prototype.goLeft = function() {
  if (this.direction === 'up' || this.direction === 'down') {
    this.direction = 'left';
  }
};

Snake.prototype.goRight = function() {
  if (this.direction === 'up' || this.direction === 'down') {
    this.direction = 'right';
  }
};

Snake.prototype.goUp = function() {
  if (this.direction === 'left' || this.direction === 'right') {
    this.direction = 'up';
  }
};

Snake.prototype.goDown = function() {
  if (this.direction === 'left' || this.direction === 'right') {
    this.direction = 'down';
  }
};

function Game() {
  this.snake = new Snake();

  for (var row = 0; row < 50; row++) {
    for (var col = 0; col < 50; col++) {
      $('.container').append($('<div>')
        .addClass('cell')
        .attr('data-row', row)
        .attr('data-col', col)
      );
    }
  }

  this.drawSnake();
  this.assignControlsToKeys();
}

Game.prototype.assignControlsToKeys = function() {
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 38: // arrow up
        this.snake.goUp();
        break;
      case 40: // arrow down
        this.snake.goDown();
        break;
      case 37: // arrow left
        this.snake.goLeft();
        break;
      case 39: // arrow right
        this.snake.goRight();
        break;
    }
  }.bind(this));
};

Game.prototype.drawSnake = function() {
  this.snake.body.forEach(function(position, index) {
    var selector = '[data-row=' + position.row + ']' +
                   '[data-col=' + position.column + ']';

    $(selector).addClass('snake');
  });
};

Game.prototype.clearSnake = function() {
  $('.snake').removeClass('snake');
};

Game.prototype.start = function() {
  if (!this.intervalId) {
    this.intervalId = setInterval(this.update.bind(this), 100);
  }
};

Game.prototype.update = function() {
  this.snake.move();
  this.clearSnake();
  this.drawSnake();
};

var game;

$(document).ready(function() {
  game = new Game();
  game.start();
});
