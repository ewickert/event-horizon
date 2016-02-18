module PhaserGame{
	export class Play extends Phaser.State{
		background: Phaser.Sprite;
		player: Player;
		grp_blackhole: Phaser.Group;
		timer: Phaser.Timer;
		scoreboard: Phaser.Text;
		tick: number;
		panel: Phaser.Sprite;

		create(){
			this.background = this.add.sprite(0, 0, 'i_background');
			this.panel = this.add.sprite(0, 0, 'p_score');
			this.game.physics.arcade.enable(this.panel);
			this.panel.body.immovable = true;
			this.panel.body.checkCollision.up = true;
			this.panel.body.checkCollision.down = true;
			this.panel.body.checkCollision.right = true;
			this.panel.alpha = .8;
			this.player = new Player(this.game,
								this.game.world.centerX,
								this.game.world.centerY);
			
			this.scoreboard = this.game.add.text(10, 10, 'Score: 0', {fontSize: '16px', fill: '#FFFFFF'});
			this.scoreboard.font = "Lucida Console";
			this.grp_blackhole = this.game.add.group();
			this.timer = this.game.time.create(false);
			this.timer.loop(1000, () =>{this.scoreboard.text =  'Score: ' + Math.round(this.timer.seconds)}, this);
			this.timer.start();
			this.tick = 0;
		}
		
		update(){

		this.game.physics.arcade.collide(this.player, this.panel);

			this.tick++;
			if(this.tick % 150 == 0){
				var x = (Math.random() * 1000) % 800;
				var y = (Math.random() * 1000) % 600 + 50;
				var span = Math.round((Math.random() * 10000)) + this.tick;
				this.grp_blackhole.add(new Blackhole(this.game, x, y, span));
			}
			var closest = null;
			var m_distance = 100000000;
			this.grp_blackhole.forEach((item: any) =>{
				try{		
				if(this.game.physics.arcade.distanceBetween(item, this.player) < m_distance){
						closest = item;
						m_distance = this.game.physics.arcade.distanceBetween(item, this.player);
				}

				this.game.physics.arcade.collide(item, this.player, () =>{
						this.game.state.start('Menu', true, false);
				});


				if (item.lifespan <= this.tick){ 
						 this.grp_blackhole.remove(item);
						 item.destroy();
					}
				}catch(e){}

				}, this);

			if(closest != null){
				var grav = 5000/(this.game.physics.arcade.distanceBetween(closest, this.player) + 1) * 150;
				this.game.physics.arcade.accelerateToObject(this.player, closest, grav);
			}
		}
	}
}
