/// <reference path="../typings/phaser.d.ts"/>
module PhaserGame{
	export class Boot extends Phaser.State{
		preload() {
			this.load.image('i_background', 'assets/background.png');
			this.load.image('s_player', 'assets/player_ship.png');
			this.load.spritesheet('ss_blackhole', 'assets/black_hole.png', 31, 31, 4);
			this.load.audio('sfx_rocket', 'assets/sfx_rocket.mp3');
		}

		create(){
			this.game.state.start('Menu', true, false);
		}
	}
}
