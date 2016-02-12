module PhaserGame{
	export class Player extends Phaser.Sprite{
		constructor(game: Phaser.Game, x: number, y: number){
			super(game, x, y, 's_player', 0);
			this.anchor.setTo(0.5, 0.5);
			game.add.existing(this);
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.collideWorldBounds = true;
		}

		update(){
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
				this.body.angularVelocity = 200;
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
				this.body.angularVelocity = -200;
			}else{
				this.body.angularVelocity = 0;
			}

			if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
				this.game.physics.arcade.velocityFromAngle(this.angle - 90, 300, this.body.velocity);
			} else{
				this.body.velocity.x = 0;
				this.body.velocity.y = 0;
			}
		}
	}
}
