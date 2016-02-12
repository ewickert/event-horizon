tsc = node node_modules/typescript/bin/tsc
phaser_type_dir = node_modules/phaser/typescript

.PHONY: typings

all: src/main.ts
	$(tsc) src/main.ts src/boot.ts src/menu.ts src/play.ts src/player.ts --out js/main.js

typings: 
	$(info SHELL = $(SHELL))
	cp $(phaser_type_dir)/p2.d.ts typings/p2.d.ts
	cp $(phaser_type_dir)/phaser.d.ts typings/phaser.d.ts
	cp $(phaser_type_dir)/pixi.d.ts typings/pixi.d.ts
