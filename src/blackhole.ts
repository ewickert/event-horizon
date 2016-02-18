module PhaserGame{
	export class Blackhole extends Phaser.Sprite{

		public lifespan: number;
		constructor(game: Phaser.Game, x: number, y: number, lifespan: number){
			super(game, x, y, 'ss_blackhole', 0);
			this.anchor.setTo(0.5, 0.5);
			game.add.existing(this);
			game.physics.enable(this, Phaser.Physics.ARCADE);

			this.body.immovable = true;
			this.body.checkCollision = true;

			this.animations.add('pulse');
			this.animations.play('pulse', 10, true);

			this.lifespan = lifespan;
		}
	}
}
