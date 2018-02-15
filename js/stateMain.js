var StateMain = {

    preload: function () {
      game.load.spritesheet("robot", "images/main/robot.png", 80, 111, 28);
      game.load.images("tiles", "images/tiles.png");
      game.load.tilemap("map", "maps/map1.json", null, Phaser.Tilemap.TILED_JSON);
    },

    create: function () {
        //Start Physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Load map
        this.map = game.add.tilemap("map");
        this.map.addTilesetImage("tiles");

        //"Tile Layer 1" refers to the name that Tiled gave to the map JSON file.
        this.layer = this.map.createLater("Tile Layer 1");
        //Resize the world to the size of the map
        this.layer.resizeWorld();
        //Set which tiles you want to enable collisions for
        //in this case it's ALL of the tiles EXCEPT the bomb 💣
        this.map.setCollisionBetween(0,24);

        //Add robot and its animations
        this.robot = game.add.sprite(150, 150, "robot");
        this.robot.animations.add("idle", [0,1,2,3,4,5,6,7,8,9], 12, true);
        this.robot.animations.add("walk", [10, 11, 12, 13, 14, 15, 16, 17], 12, true);
        this.robot.animations.add("jump", [18, 19, 20, 21, 22, 23, 24, 25], 12, false);

        this.robot.animations.play("idle");
        this.robot.anchor.set(0.5, 0.5);
        game.physics.arcade.enable(this.robot);
        this.robot.body.gravity.y = 100;
        this.robot.body.bounce.set(0.25);
        this.robot.body.collideWorldBounds = true;

        //Make the camera follow the robot!
        game.camera.follow(this.robot);


    },

    update: function () {
      game.physics.arcade.collide(this.robot, this.layer);

    }

};
