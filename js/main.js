var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../typings/phaser.d.ts"/>
var PhaserGame;
(function (PhaserGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'game', null);
            // Add states here.
            this.state.add('Boot', PhaserGame.Boot, false);
            this.state.add('Menu', PhaserGame.Menu, false);
            // this.state.start('Example');
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    PhaserGame.Game = Game;
})(PhaserGame || (PhaserGame = {}));
window.onload = function () {
    var game = new PhaserGame.Game();
};
/// <reference path="../typings/phaser.d.ts"/>
var PhaserGame;
(function (PhaserGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('i_background', 'assets/background.png');
            this.load.image('s_player', 'assets/player_ship.png');
            this.load.spritesheet('ss_blackhole', 'assets/black_hole.png', 31, 31, 4);
            this.load.audio('sfx_rocket', 'assets/sfx_rocket.mp3');
        };
        Boot.prototype.create = function () {
            this.game.state.start('Menu', true, false);
        };
        return Boot;
    })(Phaser.State);
    PhaserGame.Boot = Boot;
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.apply(this, arguments);
        }
        Menu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'i_background');
        };
        return Menu;
    })(Phaser.State);
    PhaserGame.Menu = Menu;
})(PhaserGame || (PhaserGame = {}));
