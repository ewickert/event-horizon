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
            this.state.add('Play', PhaserGame.Play, false);
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
            this.load.image('i_logo', 'assets/title.png');
            this.load.image('i_prompt', 'assets/prompt.png');
            this.load.image('s_player', 'assets/player_ship.png');
            this.load.image('p_score', 'assets/panel_score.png');
            this.load.spritesheet('ss_blackhole', 'assets/black_hole.png', 31, 31, 4);
            this.load.spritesheet('ss_exlife', 'assets/extra_life.png', 31, 31, 4);
            this.load.audio('sfx_rocket', 'assets/sfx_rocket.mp3');
            this.load.image('txt_ship', 'assets/txt_ship.png');
            this.load.image('txt_black_hole', 'assets/txt_black_hole.png');
            this.load.image('txt_extra_life', 'assets/txt_extra_life.png');
            this.load.image('txt_meteor', 'assets/txt_meteor.png');
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
            this.logo = this.add.sprite(36, 20, 'i_logo');
            this.play_prompt = this.add.sprite(64, 554, 'i_prompt');
            this.init_key();
        };
        Menu.prototype.update = function () {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.start_game();
            }
        };
        Menu.prototype.init_key = function () {
            this.add.sprite(328, 305, 'txt_ship');
            this.add.sprite(286, 287, 's_player');
            this.add.sprite(328, 340, 'txt_extra_life');
            var el = this.add.sprite(286, 331, 'ss_exlife');
            el.animations.add('pulse');
            el.animations.play('pulse', 10, true);
            this.add.sprite(328, 377, 'txt_black_hole');
            var bh = this.add.sprite(286, 367, 'ss_blackhole');
            bh.animations.add('pulse');
            bh.animations.play('pulse', 10, true);
            this.add.sprite(328, 401, 'txt_meteor');
        };
        Menu.prototype.start_game = function () {
            this.game.state.start('Play', true, false);
        };
        return Menu;
    })(Phaser.State);
    PhaserGame.Menu = Menu;
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
        }
        Play.prototype.create = function () {
            var _this = this;
            this.background = this.add.sprite(0, 0, 'i_background');
            var panel = this.add.sprite(0, 0, 'p_score');
            panel.alpha = .8;
            this.player = new PhaserGame.Player(this.game, this.game.world.centerX, this.game.world.centerY);
            this.scoreboard = this.game.add.text(10, 10, 'Score: 0', { fontSize: '16px', fill: '#FFFFFF' });
            this.scoreboard.font = "Lucida Console";
            this.grp_blackhole = this.game.add.group();
            this.timer = this.game.time.create(false);
            this.timer.loop(1000, function () { _this.scoreboard.text = 'Score: ' + Math.round(_this.timer.seconds); }, this);
            this.timer.start();
            this.tick = 0;
        };
        Play.prototype.update = function () {
            var _this = this;
            this.tick++;
            if (this.tick % 150 == 0) {
                var x = (Math.random() * 1000) % 800;
                var y = (Math.random() * 1000) % 600 + 50;
                var span = (Math.random() * 10000) + this.tick;
                this.grp_blackhole.add(new PhaserGame.Blackhole(this.game, x, y, span));
            }
            var closest = null;
            var m_distance = 100000000;
            this.grp_blackhole.forEach(function (item) {
                if (item.lifespan == _this.tick)
                    item.destroy();
                //var grav = 5000/(this.game.physics.arcade.distanceBetween(item, this.player) + 1) * 150;
                //this.game.physics.arcade.accelerateToObject(this.player, item, grav);
                if (_this.game.physics.arcade.distanceBetween(item, _this.player) < m_distance) {
                    closest = item;
                    m_distance = _this.game.physics.arcade.distanceBetween(item, _this.player);
                }
                _this.game.physics.arcade.collide(item, _this.player, function () {
                    _this.game.state.start('Menu', true, false);
                });
            }, this);
            if (closest != null) {
                var grav = 5000 / (this.game.physics.arcade.distanceBetween(closest, this.player) + 1) * 150;
                this.game.physics.arcade.accelerateToObject(this.player, closest, grav);
            }
        };
        return Play;
    })(Phaser.State);
    PhaserGame.Play = Play;
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 's_player', 0);
            this.anchor.setTo(0.5, 0.5);
            game.add.existing(this);
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.collideWorldBounds = true;
        }
        Player.prototype.update = function () {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.angularVelocity = 200;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.angularVelocity = -200;
            }
            else {
                this.body.angularVelocity = 0;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.game.physics.arcade.velocityFromAngle(this.angle - 90, 300, this.body.velocity);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.game.physics.arcade.velocityFromAngle(this.angle - 90, -150, this.body.velocity);
            }
            else {
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
            }
        };
        return Player;
    })(Phaser.Sprite);
    PhaserGame.Player = Player;
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Blackhole = (function (_super) {
        __extends(Blackhole, _super);
        function Blackhole(game, x, y, lifespan) {
            _super.call(this, game, x, y, 'ss_blackhole', 0);
            this.anchor.setTo(0.5, 0.5);
            game.add.existing(this);
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;
            this.body.checkCollision = true;
            this.animations.add('pulse');
            this.animations.play('pulse', 10, true);
            this.lifespan = lifespan;
        }
        return Blackhole;
    })(Phaser.Sprite);
    PhaserGame.Blackhole = Blackhole;
})(PhaserGame || (PhaserGame = {}));
