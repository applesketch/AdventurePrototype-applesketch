class Scene2 extends AdventureScene {
    constructor() {
        super("scene2", "Lounge");
    }

    preload() {
        this.load.path = "./img/";
        this.load.image("slug", "slug.png"); // img couch, tv, table, coffee
        this.load.audio("music2", "music2.mp3");
    }

    onEnter() {
        // this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage("You've got no other choice, really.");
        //     })
        //     .on('pointerdown', () => {
        //         this.gotoScene('scene1');
        //     });

        let slug = this.add.sprite(this.w * 0.6, this.w * 0.2, "slug")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('💨💨💨');
                this.tweens.add({
                    targets: slug,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}