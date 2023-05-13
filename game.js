class Scene1 extends AdventureScene {
    constructor() {
        super("scene1", "Classroom");
    }
    preload() {
        this.load.path = "./img/";
        this.load.image("door", "door.png");
        this.load.image("desk", "desk.png");
        this.load.audio("lobby", "lobby.mp3");
        this.load.audio("music1", "music1.mp3");
    }
    onEnter() {
        let music1 = this.sound.add('music1');
        music1.play();

        let desk1 = this.add.sprite(300, 900, "desk")
            .setInteractive()
            .on('pointerover', () => this.showMessage("It's a desk."))
            .on('pointerdown', () => {
                this.showMessage("You can't fit an entire desk into your inventory.");
                this.tweens.add({
                    targets: desk1,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });
        let desk2 = this.add.sprite(600, 900, "desk")
            .setInteractive()
            .on('pointerover', () => this.showMessage("It's a desk."))
            .on('pointerdown', () => {
                this.showMessage("You can't carry around a desk on your adventure. It's too heavy.");
                this.tweens.add({
                    targets: desk2,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });
        let desk3 = this.add.sprite(900, 900, "desk")
            .setInteractive()
            .on('pointerover', () => this.showMessage("It's a desk."))
            .on('pointerdown', () => {
                this.showMessage("Forget it. Don't bother trying to take a desk.");
                this.tweens.add({
                    targets: desk3,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let pp = this.add.text(this.w * 0.5, this.w * 0.1, "paper and pencil")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a piece of paper and pencil.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the paper and pencil.");
                this.gainItem('Paper and pancil');
                this.tweens.add({
                    targets: pp,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => pp.destroy()
                });
            })
        let door = this.add.sprite(300, 250, "door")
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("Paper and pancil")) {
                    this.showMessage("You are ready to head to the next room.");
                } else {
                    this.showMessage("You should probably take something with you before you leave...");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("Paper and pancil")) {
                    this.showMessage("*loud obnoxious creaking noise*");
                    this.gotoScene('scene2');
                    music1.stop();
                }
            });

    }
}

class Scene2 extends AdventureScene {
    constructor() {
        super("scene2", "Lounge");
    }
    preload() {
        this.load.path = "./img/";
        this.load.image("slug", "slug.png"); // img couch, tv, table, coffee
        this.load.image("door", "door.png");
        this.load.audio("music1_1", "music1_1.mp3");
    }
    onEnter() {
        this.showMessage("Something feels off...");
        let music1_1 = this.sound.add('music1_1');
        music1_1.play();

        let table = this.add.sprite(600, 900, "table")
            .setInteractive()
            .on('pointerover', () => this.showMessage("It's a table."))
            .on('pointerdown', () => {
                this.showMessage("Stop trying to put large furniture into your inventory it won't work.");
                this.tweens.add({
                    targets: table,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });
        let couch = this.add.sprite(600, 900, "couch")
            .setInteractive()
            .on('pointerover', () => this.showMessage("It's a couch. Very comfy."))
            .on('pointerdown', () => {
                this.showMessage("Don't even try to carry this out the room.");
                this.tweens.add({
                    targets: couch,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });
        let tv = this.add.sprite(900, 900, "tv")
            .setInteractive()
            .on('pointerover', () => this.showMessage("It's a TV."))
            .on('pointerdown', () => {
                this.showMessage("Please leave the TV here. It is not up for grabs.");
                this.tweens.add({
                    targets: tv,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let slug = this.add.sprite(this.w * 0.6, this.w * 0.2, "slug")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('💨💨💨');
                this.tweens.add({
                    targets: slug,
                    x: this.s + (this.h - 2 * this.s) * 1000,
                    y: this.s + (this.h - 2 * this.s) * 1000,
                    ease: 'Sine.inOut',
                    duration: 500
                });
                music1_1.stop();
            })
            .on('pointerdown', () => this.gotoScene('slug'));    
        
        let coffee = this.add.text(this.w * 0.5, this.w * 0.1, "coffee")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Someone's coffee. Smells pretty good and you are quite thirsty. I'm sure whoever's this is won't miss it...")
            })
            .on('pointerdown', () => {
                this.showMessage("You take the cup of coffee.");
                this.gainItem('Coffee');
                this.tweens.add({
                    targets: pp,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => pp.destroy()
                });
            })
        let door = this.add.sprite(300, 250, "door")
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("Coffee")) {
                    this.showMessage("You are ready to head to the next room.");
                } else {
                    this.showMessage("You should probably take something with you before you leave...");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("Coffee")) {
                    this.showMessage("*loud obnoxious creaking noise*");
                    this.gotoScene('scene2');
                    music1_1.stop();
                }
            })  
    }
}

class Scene3 extends AdventureScene {
    constructor() {
        super("scene3", "Office");
    }

    preload() {
        this.load.path = "./img/";
        this.load.image("slug", "slug.png"); // img couch, tv, table, coffee
        this.load.audio("music2", "music2.mp3");
    }

    onEnter() {
        this.showMessage("Something does not feel right...... A shiver runs down your spine");
        let music2 = this.sound.add('music2');
        music2.play();

        let table = this.add.sprite(600, 900, "table")
            .setInteractive()
            .on('pointerover', () => this.showMessage("It's a table."))
            .on('pointerdown', () => {
                this.showMessage("Stop trying to put large furniture into your inventory it won't work.");
                this.tweens.add({
                    targets: table,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });
        let couch = this.add.sprite(600, 900, "couch")
            .setInteractive()
            .on('pointerover', () => this.showMessage("It's a couch. Very comfy."))
            .on('pointerdown', () => {
                this.showMessage("Don't even try to carry this out the room.");
                this.tweens.add({
                    targets: couch,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });
        let tv = this.add.sprite(900, 900, "tv")
            .setInteractive()
            .on('pointerover', () => this.showMessage("It's a TV."))
            .on('pointerdown', () => {
                this.showMessage("Please leave the TV here. It is not up for grabs.");
                this.tweens.add({
                    targets: tv,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let slug = this.add.sprite(this.w * 0.6, this.w * 0.2, "slug")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('💨💨💨');
                this.tweens.add({
                    targets: slug,
                    x: this.s + (this.h - 2 * this.s) * 1000,
                    y: this.s + (this.h - 2 * this.s) * 1000,
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('slug')); 
            music2.stop();    
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    preload() {
        this.load.path = "./img/";
        this.load.image("studio", "studio.png");
        this.load.audio("boom", "boom.mp3");
    }
    create() {
        let studio = this.add.sprite(900, 500, "studio");
        this.sound.add('boom').play();
        this.time.delayedCall(1500, () => {
            this.cameras.main.fadeOut(1000, 255,255,255);
            this.time.delayedCall(900, () => this.scene.start('menu'));
        });
    }
}
       
class Menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    preload() {
        this.load.path = "./img/";
        this.load.image("title", "title.png");
        this.load.image("slug", "slug.png");
        this.load.audio("lobby", "lobby.mp3");
    }

    create() {
        let title = this.add.sprite(1000, 300, "title");
        let lobby = this.sound.add('lobby')
        let box = this.add.text(800, 500, "PLAY")
        .setFontSize(100);       

        this.input.on('pointerdown', () => {
            this.time.delayedCall(2000, () => {
                this.cameras.main.fadeOut(2000, 255,255,255);
            }); 
            this.scene.start('scene1');
            lobby.stop();
            });
        lobby.play();

        let slug = this.add.sprite(300, 300, "slug");
        this.add.tween({
            targets: slug,
            scale: {from: 0, to: 1},
            duration: 1000
        });
        
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

class Slug extends Phaser.Scene {
    constructor() {
        super('slug');
    }
    create() {
        this.add.text(200, 200, "Upon touching the slug, a wave of fatigue overcomes you...").setFontSize(50);
        this.add.text(this.w * 20, this.h * 20, "Click to restart.").setFontSize(30);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Menu, Scene1, Scene2, Scene3, Outro, Slug],
    title: "Escape",
});