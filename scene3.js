class Scene3 extends AdventureScene {
    constructor() {
        super("scene3", "Office");
    }

    preload() {
        this.load.path = "./img/";
        this.load.image("slug", "slug.png");
        this.load.image("odesk", "odesk.png");
        this.load.image("dishes", "dishes.png");
        this.load.audio("music2", "music2.mp3");
    }

    onEnter() {
        this.showMessage("Something does not feel right...... A shiver runs down your spine");
        let music2 = this.sound.add('music2');
        music2.play();

        let odesk = this.add.sprite(600, 900, "odesk")
            .setInteractive()
            .on('pointerover', () => this.showMessage("It's a professor's desk."));

        let dishes = this.add.sprite(this.w * 0.5, this.w * 0.1, "dishes")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("The professor's dirty dishes. Help them clean it or else.")
            })
            .on('pointerdown', () => {
                this.showMessage("You take the dirty dishes. You put the coffee down on the professor's desk as a gift.");
                this.gainItem('Dirty dishes');
                this.loseItem('Coffee')
                this.tweens.add({
                    targets: dishes,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => dishes.destroy()
                });
            })
        let door = this.add.sprite(300, 250, "door")
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("Dirty dishes")) {
                    this.showMessage("You are ready to head to the next room.");
                } else {
                    this.showMessage("CLEAN UP FOR THE PROFESSOR.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("Dirty dishes")) {
                    this.showMessage("*SSQUEEEAAKK*");
                    this.gotoScene('scene4');
                    music2.stop();
                }
            })

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
                music2.stop();
            });   
    }
}