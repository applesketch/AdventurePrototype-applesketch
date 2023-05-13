class Scene4 extends AdventureScene {
    constructor() {
        super("scene4", "Kitchen");
    }

    preload() {
        this.load.path = "./img/";
        this.load.image("knife", "knife.png");
        this.load.image("sink", "sink.png");
        this.load.audio("music3", "music3.mp3");
    }

    onEnter() {
        this.showMessage("The unsettling feeling grows...");
        let music3 = this.sound.add('music3');
        music3.play();

        let knife = this.add.sprite(600, 900, "knife")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Knife.")
            })
            .on('pointerdown', () => {
                this.gainItem('Knife');
                this.tweens.add({
                    targets: knife,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => knife.destroy()
                });
            })

        let sink = this.add.sprite(this.w * 0.5, this.w * 0.1, "sink")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Sink.")
            })
            .on('pointerdown', () => {
                this.showMessage("Dishes washed.");
                this.loseItem('Dirty dishes');
            })
        let door = this.add.sprite(300, 250, "door")
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("Knife")) {
                    this.showMessage("You are ready for the final boss.");
                } else {
                    this.showMessage("Prepare yourself.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("Knife")) {
                    this.showMessage("*Prepare yourself.*");
                    this.gotoScene('boss');
                    music3.stop();
                }
            })
    }
}