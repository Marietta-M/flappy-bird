// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = -4;
var labelScore;
var player;
var pipes = [];
var bestscore = 0;  //Highscore
var gapMargin = 50;   //mindestens 1 Block Röhre am Rand
var blockHeight = 50; //größe eines Blockes der Röhren
var height = 400;
var gapSize = 100; //Größe Lücke in den Röhren
var width = 798;  //weite Bildschirm
var pipeEndExtraWidth = 5;
var gameSpeed = 200;

//you can assign the initial color of the background here

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

    game.load.image("playerImg", "../assets/flappy-cropped.png");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipeBlock", "../assets/pipe2-body.png");
    game.load.image("pipeEnd", "../assets/pipe2-end.png");
    game.load.image("clouds", "../assets/cloudtest2.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the background colour of the scene
    game.stage.setBackgroundColor("#3bb7c4");
    // var backgroungVelocity = gameSpeed/10;                      //Wolke im hintergrund
    // var backgroundSprite = game.add.tileSprite(0, 0, width, height, "clouds");  //Wolke im hintergrund
    // backgroundSprite.autoScroll(-backgroungVelocity, 0);  //Wolke im hintergrund
    // disco();
    // setTimeout('disco()',5);

    // game.add.text(20, 20, "!", {font: "60px Arial", fill: "#abcdef"});
    // game.add.text(750, 20, "?", {font: "60px Arial", fill: "#abcdef"});
    // game.add.text(20, 340, "$", {font: "60px Arial", fill: "#abcdef"});
    // game.add.text(730, 340, "%", {font: "60px Arial", fill: "#abcdef"});
    player = game.add.sprite(50, 50, "playerImg");
    game.physics.enable(player);

    player.body.gravity.y = 300;






    // game.input.onDown.add(clickHandler);
    game.input
      .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.add(playerJump);

      // game.input
      //   .keyboard.addKey(Phaser.Keyboard.RIGHT)
      //   .onDown.add(moveRight);
      //
      // game.input
      //   .keyboard.addKey(Phaser.Keyboard.LEFT)
      //   .onDown.add(moveLeft);
      //
      // game.input
      //   .keyboard.addKey(Phaser.Keyboard.UP)
      //   .onDown.add(moveUp);
      //
      // game.input
      //   .keyboard.addKey(Phaser.Keyboard.DOWN)
      //   .onDown.add(moveDown);
      var pipeInterval = 2 * Phaser.Timer.SECOND;
      game.time.events.loop(
        pipeInterval,
        generatePipe
      );

    score = score + 1;
    labelScore = game.add.text(20, 20, "-4");

}

/*
 * This function updates the scene. It is called for every new frame.
 */

function update() {
 game.physics.arcade.overlap(
 player,
 pipes,
 gameOver);
if (player.body.y<0){
  gameOver();
}
if (player.body.y>400){
  gameOver();
}
}
function gameOver(){
  registerScore(score);
  game.state.restart();
  score=-4;
}

function addPipeBlock(x, y){
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);

  game.physics.arcade.enable(block);
  block.body.velocity.x = -150;
}

function addPipeTop(x, y){
  var pipeTop = game.add.sprite(x, y, "pipeEnd");
  pipes.push(pipeTop);

  game.physics.arcade.enable(pipeTop);
  pipeTop.body.velocity.x = -150;
}

function addPipeEnd(x, y){
  var pipeBottom = game.add.sprite(x, y, "pipeEnd");
  pipes.push(pipeBottom);

  game.physics.arcade.enable(pipeBottom);
  pipeBottom.body.velocity.x = -150;
}


// function generatePipe(){
//   var gapStart = game.rnd.integerInRange(1, 5);
//   for(var count = 0; count<8; count = count + 1){
//     if(count != gapStart && count != gapStart + 1) {
//         addPipeBlock(800, count * 50);
//     }


function generatePipe(){
      var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
      addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart);

      for(var y = gapStart; y > 0; y-=blockHeight){
        addPipeBlock(width, y - blockHeight);
      }
      for(var y = gapStart +gapSize; y < height; y+=blockHeight){
            addPipeBlock(width, y);
      }
      addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);

  changeScore();
}

function playerJump(){
  player.body.velocity.y = -150;
}
function clickHandler(event) {
  // alert("Hello!");
    // game.add.sprite(event.x, event.y, "playerImg");
    game.sound.play("score");
    score = score + 1;
    labelScore.setText(score.toString());
}

function moveRight(){
  player.x = player.x + 10;
}

function moveLeft(){
  player.x = player.x - 10;
}

function moveUp(){
  player.y = player.y - 10;
}

function moveDown(){
  player.y = player.y + 10;
}
function spaceHandler() {
  changeScore();
 game.sound.play("score");
}

function changeScore() {
 score = score + 1;
 labelScore.setText(score.toString());
}
