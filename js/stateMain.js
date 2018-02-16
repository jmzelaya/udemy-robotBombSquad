var StateMain = {

    preload: function () {
      game.load.spritesheet("robot", "images/main/robot.png", 80, 111, 28);
      game.load.images("tiles", "images/tiles.png");
      // game.load.tilemap("map", "maps/embedMap.json", null, Phaser.Tilemap.TILED_JSON);
    },

    create: function () {
        //Start Physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Load map
        // this.map = game.add.tilemap("map");
        // this.map.addTilesetImage("tiles");

        //"Tile Layer 1" refers to the default name that Tiled gave to the map JSON file.
        // this.layer = this.map.createLayer("Tile Layer 1");
        //Resize the world to the size of the map
        // this.layer.resizeWorld();
        //Set which tiles you want to enable collisions for
        //in this case it's ALL of the tiles EXCEPT the bomb 💣
        // this.map.setCollisionBetween(0,24);

        //Add robot and its animations
        this.robot = game.add.sprite(150, 150, "robot");
        this.robot.animations.add("idle", [0,1,2,3,4,5,6,7,8,9], 12, true);
        this.robot.animations.add("walk", [10, 11, 12, 13, 14, 15, 16, 17], 12, true);
        this.robot.animations.add("jump", [18, 19, 20, 21, 22, 23, 24, 25], 12, false);

        this.robot.animations.play("idle");
        this.robot.anchor.set(0.5, 0.5);
        //Enable physics for the robot
        game.physics.arcade.enable(this.robot);
        this.robot.body.gravity.y = 100;
        this.robot.body.bounce.set(0.25);
        this.robot.body.collideWorldBounds = true;

        //Make the camera follow the robot!
        game.camera.follow(this.robot);
        cursors = game.input.keyboard.createCursorKeys();



    },

    update: function () {
      // game.physics.arcade.collide(this.robot, this.layer);

      //Animation check
      /*
      Check the robots velocity
      with Math.abs because we don't care if the value
      is neg/pos as long as the velocity is over 100
      */
      //We only want these animations to play when the robot is on the ground
      if(this.robot.body.onFloor()){
          if(Math.abs(this.robot.body.velocity.x) >100){
            //Set animation to "walk"
            this.robot.animations.play("walk");
          }
          else{
            //otherwise play the "idle" animation
            this.robot.animations.play("idle");
          }
      }

      //Direction Facing 👈🏼 👉🏼
      //Make sure the robot is face the correct direction
      //If > 0 we know robot is moving to the right
      if(this.robot.body.velocity.x > 0){
        //Set the scale to 1 (default)
        this.robot.scale.x = 1;
      }
      else{
        //Otherwise robot is going left
        //Set scale to -1 to flip the image
        this.robot.scale.x = -1;
      }//CLOSE scale set


      //Cursors - Keyboard key check ⌨️
      if(cursors.left.isDown){
        this.robot.body.velocity.x = -250;
      }
      if(cursors.right.isDown){
        this.robot.body.velocity.x = 250;
      }//CLOSE cursors

      //Jump
      if(cursors.up.isDown){
        if(this.robot.body.onFloor()){
          this.robot.body.velocity.y = -150;
          this.robot.animations.play("jump");
        }
      }


    }

};
