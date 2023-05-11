class Scene1 extends AdventureScene {
    constructor() {
        super("scene1", "Classroom");
    }

    preload() {
        this.load.path = "./img/";
        this.load.image("door", "door.png");
        this.load.image("desk", "desk.png");
        //this.load.audio("boom", "boom.mp3");
    }

    onEnter() {

        let desk1 = this.add.sprite(300, 1000, "desk")
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
        let desk2 = this.add.sprite(600, 1000, "desk")
            .setInteractive()
            .on('pointerover', () => this.showMessage("It's a desk."))
            .on('pointerdown', () => {
                this.showMessage("You can't fit an entire desk into your inventory.");
                this.tweens.add({
                    targets: desk2,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });
        let desk3 = this.add.sprite(900, 1000, "desk")
            .setInteractive()
            .on('pointerover', () => this.showMessage("It's a desk."))
            .on('pointerdown', () => {
                this.showMessage("You can't fit an entire desk into your inventory.");
                this.tweens.add({
                    targets: desk3,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.sprite(300, 250, "door")
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    this.gotoScene('scene2');
                }
            })

    }
}

class Scene2 extends AdventureScene {
    constructor() {
        super("scene2", "The second room has a long name (it truly does).");
    }

    preload() {
        this.load.path = "./img/";
        this.load.image("studio", "studio.png");
        this.load.audio("boom", "boom.mp3");
    }

    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('scene1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
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
        let studio = this.add.sprite(900, 500, "studio")
        this.time.delayedCall(2000, () => {
            this.cameras.main.fadeOut(2000, 255,255,255);
            this.time.delayedCall(1000, () => this.scene.start('scene1'));
            this.sound.add("boom").play();
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
        this.load.audio("music1", "music1.mp3");
    }

    create() {
        let title = this.add.sprite(300, 50, "title");
        let box = this.add.text(70, 140,
`PLAY


SETTINGS


QUIT`
        );

        let circle1 = this.add.circle(50, 150, 10, 0xFF0000);
        let circle2 = this.add.circle(50, 190, 10, 0xFF0000);
        let circle3 = this.add.circle(50, 230, 10, 0xFF0000);
        
        let cat = this.add.sprite(300, 300, "cat");
        this.add.tween({
            targets: cat,
            scale: {from: 0, to: 1},
            duration: 1000
        });
       

        this.input.on('pointerdown', () => {
            this.time.delayedCall(2000, () => {
                this.cameras.main.fadeOut(2000, 255,255,255);
            }); this.scene.start('scene1')
            });
        this.sound.add("siu").play();
        
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


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Menu, Scene1, Scene2, Outro],
    title: "Escape",
});