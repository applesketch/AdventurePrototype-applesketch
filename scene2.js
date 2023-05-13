class Scene2 extends AdventureScene {
    constructor() {
        super("scene2", "Lounge");
    }
    preload() {
        this.load.path = "./img/";
        this.load.image("slug", "slug.png");
        this.load.image("couch", "couch.png");
        this.load.image("tv", "tv.png");
        this.load.image("table", "table.png");
        this.load.image("coffee", "coffee.png");
        this.load.image("door", "door.png");
        this.load.audio("music1_1", "music1_1.mp3");
    }
    onEnter() {
        this.showMessage("Something feels off...");
        let music1_1 = this.sound.add('music1_1');
        music1_1.play();

        let table = this.add.sprite(800, 500, "table")
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
        let couch = this.add.sprite(800, 800, "couch")
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
        let tv = this.add.sprite(800, 300, "tv")
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
            .on('pointerdown', () => {
                this.gotoScene('slug');
                music1_1.stop();
            });   
        
        let coffee = this.add.sprite(this.w * 0.5, this.w * 0.1, "coffee")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Someone's coffee. Smells pretty good and you are quite thirsty. I'm sure whoever's this is won't miss it...")
            })
            .on('pointerdown', () => {
                this.showMessage("You take the cup of coffee and leave a note behind.");
                this.gainItem('Coffee');
                this.loseItem('Paper and pencil');
                this.tweens.add({
                    targets: coffee,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => coffee.destroy()
                });
            })
        let door = this.add.sprite(300, 250, "door")
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("Coffee")) {
                    this.showMessage("You are ready to head to the next room.");
                } else {
                    this.showMessage("You feel thirsty. Take the drink. Do it.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("Coffee")) {
                    this.showMessage("*CREAK*");
                    this.gotoScene('scene3');
                    music1_1.stop();
                }
            })  
    }
}