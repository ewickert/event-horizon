module PhaserGame{
	export class Menu extends Phaser.State {
		background: Phaser.Sprite;
		create(){
			this.background = this.add.sprite(0, 0, 'i_background');
		}
	}
}
