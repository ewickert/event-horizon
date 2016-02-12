module PhaserGame{
	export class Play extends Phaser.State{
		background: Phaser.Sprite;
		player: Player;
		create(){
			this.background = this.add.sprite(0, 0, 'i_background');
			this.player = new Player(this.game,
								this.game.world.centerX,
								this.game.world.centerY);
		}
	}
}
