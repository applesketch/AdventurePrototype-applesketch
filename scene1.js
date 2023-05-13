class Scene1 extends AdventureScene {
    constructor() {
        super("scene1", "Classroom");
    }
    preload() {
        this.load.path = "./img/";
        this.load.image("door", "door.png");
        this.load.image("pp", "pp.png");
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

        let pp = this.add.sprite(this.w * 0.5, this.w * 0.1, "pp")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a piece of paper and pencil.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the paper and pencil.");
                this.gainItem('Paper and pencil');
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
                if (this.hasItem("Paper and pencil")) {
                    this.showMessage("You are ready to head to the next room.");
                } else {
                    this.showMessage("You should probably take something with you before you leave...");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("Paper and pencil")) {
                    this.showMessage("*loud obnoxious creaking noise*");
                    this.gotoScene('scene2');
                    music1.stop();
                }
            });

    }
}