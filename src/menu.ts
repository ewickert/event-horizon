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
			this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
		}
		update(){
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				this.start_game();
			}
		}

		init_key(){
			this.add.sprite(328, 305, 'txt_ship');
			this.add.sprite(286, 287, 's_player');
			//this.add.sprite(328, 340, 'txt_extra_life');
			//var el = this.add.sprite(286, 331, 'ss_exlife');
			//el.animations.add('pulse');
			//el.animations.play('pulse', 10, true);
			this.add.sprite(328, 377, 'txt_black_hole');
			var bh = this.add.sprite(286, 367, 'ss_blackhole');
			bh.animations.add('pulse');
			bh.animations.play('pulse', 10, true);
			//this.add.sprite(328, 401, 'txt_meteor');
		}

		start_game(){
			this.game.state.start('Play', true, false);		
		}
	}
}
