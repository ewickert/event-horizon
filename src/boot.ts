/// <reference path="../typings/phaser.d.ts"/>
module PhaserGame{
	export class Boot extends Phaser.State{
		preload() {
			this.load.image('i_background', 'assets/background.png');
			this.load.image('i_logo', 'assets/title.png');
			this.load.image('i_prompt', 'assets/prompt.png');
			this.load.image('s_player', 'assets/player_ship.png');
			this.load.spritesheet('ss_blackhole', 'assets/black_hole.png', 31, 31, 4);
			this.load.spritesheet('ss_exlife', 'assets/extra_life.png', 31, 31, 4); 

			this.load.audio('sfx_rocket', 'assets/sfx_rocket.mp3');

			this.load.image('txt_ship', 'assets/txt_ship.png');
			this.load.image('txt_black_hole', 'assets/txt_black_hole.png');
			this.load.image('txt_extra_life', 'assets/txt_extra_life.png');
			this.load.image('txt_meteor', 'assets/txt_meteor.png');
		}

		create(){
			this.game.state.start('Menu', true, false);
		}
	}
}
