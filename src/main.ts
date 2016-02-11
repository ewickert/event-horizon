/// <reference path="../typings/phaser.d.ts"/>
module PhaserGame{
	export class Game extends Phaser.Game{
		constructor(){
			super(800, 600, Phaser.AUTO, 'game', null);
			// Add states here.
			this.state.add('Boot', Boot, false);
			this.state.add('Menu', Menu, false);
			// this.state.start('Example');
			this.state.start('Boot');
		}
	}
}

window.onload = () => {
	var game = new PhaserGame.Game();
}
