class Scene2 extends AdventureScene {
    constructor() {
        super("scene2", "Lounge");
    }

    preload() {
        this.load.path = "./img/";
        this.load.image("slug", "slug.png"); // img couch, tv, table, coffee
        this.load.audio("music1_1", "music1_1.mp3");
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
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));     
    }
}