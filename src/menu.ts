module PhaserGame{
	export class Menu extends Phaser.State {
		background: Phaser.Sprite;
		logo: Phaser.Sprite;
		play_prompt: Phaser.Sprite;

		create(){
			this.background = this.add.sprite(0, 0, 'i_background');
			this.logo = this.add.sprite(36, 20, 'i_logo');
			this.play_prompt = this.add.sprite(64, 554, 'i_prompt');
			this.init_key();
			
		}

		init_key(){
			this.add.sprite(328, 300, 'txt_ship');
			this.add.sprite(328, 321, 'txt_extra_life');
			this.add.sprite(328, 342, 'txt_black_hole');
			this.add.sprite(328, 363, 'txt_meteor');
		}
	}
}
