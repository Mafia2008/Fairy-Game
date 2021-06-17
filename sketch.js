var starImg,bgImg;
var star, starBody;
var fairy, fairyAnimation;
var number = 0;
var starGroup;
var score = 0;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starryNight.jpg");
	fairyAnimation = loadAnimation("images/fairyImage1.png", "images/fairyImage2.png");
}

function setup() {
	createCanvas(800, 750);

	fairy = createSprite(100, 500,);
	fairy.addAnimation("moving", fairyAnimation);
	fairy.scale = 0.175;
	fairy.setCollider("circle", 500, -100, 150);
	
	star = createSprite(700,30);
	star.addImage(starImg);
	star.scale = 0.2;
	starGroup = new Group();

	engine = Engine.create();
	world = engine.world;
	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	Engine.run(engine);

}


function draw() {
	background(bgImg);
	
	textSize(20);
	fill("white");
	text("Score: " + score, 50, 50);
	
	star.x= starBody.position.x 
	star.y= starBody.position.y 

	if(star.isTouching(fairy)){
		Matter.Body.setStatic(starBody,true); 
		number = 1;
		textAlign(CENTER, CENTER);
		text("Press Space", 400, 375)
  	}

  	keyPressed();
  	createStar();
 	drawSprites();
}

function keyPressed() {

	if(keyDown("left") && number === 0){
		fairy.x = fairy.x - 6;
	}

	if(keyDown("right") && number === 0){
		fairy.x = fairy.x + 6;
	}

	if(keyWentDown("space") && number === 1){
		starGroup.destroyEach();
		number = 0;
		score = score + 1;
	}
	
}

function createStar(){
	if(frameCount%150 === 0 && number === 0){
		
	
		starBody = Bodies.circle(Math.round(random(150, 650)) , 30 , 5 , {restitution:0.5, isStatic:true});
		World.add(world, starBody);
		star = createSprite(starBody.x,-80);
		star.addImage(starImg);
		star.scale = 0.2;
		starGroup.add(star);
		
		
	}else if(frameCount%50 === 0 && number === 0){
		Matter.Body.setStatic(starBody,false); 
	}
}