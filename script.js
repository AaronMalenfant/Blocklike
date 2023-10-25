let stage = new blockLike.Stage({ sensing: true })
let health = 5;
let forever = true;
let bullets = 10;
stage.whenKeyPressed('Escape', () => { forever = false; })


let duck = new blockLike.Sprite({
  costume: new blockLike.Costume({
    image: 'duck/fly1.svg'
  })
});

let mouse = new blockLike.Sprite({
  costume: new blockLike.Costume({
    image: 'mouse/10.svg'
  })
});

duck.addCostume(new blockLike.Costume({
  //color: '#A2DAFF',
  image: 'duck/fly2.svg'
}));

function fly(times, dist, wait) {
  for (let i = 0; i < times; i += 1) {
    this.switchCostumeToNum(i % 2)
    this.move(dist)
    stage.wait(wait);
  }
}
duck.addTo(stage);
mouse.addTo(stage);
stage.whenFlag(function () {

  duck.goTo(-250, 0);

  health = 5;
  while (health > 0) {
    duck.goTo(-200, 0);
    duck.invoke(fly, [20, 25, 0.25]);
    health--;
  }
});

duck.whenClicked(function () {
  debugger;
  this.goTo(-200, 0);
  this.invoke(fly, [10, 50, 0.5])
});

stage.whenClicked(function () {
  const touch = mouse.isTouching(duck);
  if (bullets <= 1) {
    mouse.say("out!");
    return;
  }
  bullets--;

  if (touch) {
    duck.goTo(-200, 0);
  }
  mouse.say(bullets);
});

stage.whenKeyPressed(function(x) {
  debugger;
  console.log(x);

});
mouse.whenFlag(function () {
  console.log("whenFlag " + forever);

  while (forever) {
    this.wait(0.1);
    this.goTo(stage.mouseX, stage.mouseY);
  }
});