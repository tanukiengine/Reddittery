export function createDesertBackground(scene, width, height, mid_w, mid_h) {
    
     // Sol animado
    const sunY = mid_h;
    const sun = scene.add.sprite(0, sunY, 'desierto', 'sun').setOrigin(0.5, 0.5).setScale(1.5);
    scene.tweens.add({
        targets: sun,
        x: width + 300,
        duration: 120000,
        ease: 'Linear',
        yoyo: false,
        repeat: -1
    });

    // Fondo cielo opacidad .6
    scene.add.sprite(0, 0, 'desierto', 'sky').setOrigin(0, 0).setDisplaySize(width, height).setAlpha(0.6);

    // Cactus
    scene.add.sprite(width-50, height-50, 'desierto', 'cactus_1').setOrigin(.5, 1).setScale(1);
    scene.add.sprite(width-(mid_w/2), height-50, 'desierto', 'cactus_2').setOrigin(.5, 1).setScale(1);
    scene.add.sprite(150, height-50, 'desierto', 'cactus_3').setOrigin(.5, 1).setScale(1.5);

    // Nubes animadas
    const cloudFrames = ['cloud_1', 'cloud_2', 'cloud_3', 'cloud_4'];
    cloudFrames.forEach((frame, i) => {
        const startX = width + 250;
        const startY = Phaser.Math.Between(0, height / 2);
        const cloud = scene.add.sprite(startX, startY, 'desierto', frame).setOrigin(.5, .5);
        const speed = Phaser.Math.Between(50, 150);
        scene.tweens.add({
            targets: cloud,
            x: 0 - cloud.width,
            duration: ((startX + cloud.width) / speed) * 2000,
            ease: 'Linear',
            repeat: -1,
            delay: i * 500
        });
    });

   
    

    // Tierra
    const landSprite = scene.add.sprite(mid_w, height-height/3, 'desierto', 'land').setOrigin(.5, .5);
    const landOriginalWidth = landSprite.width;
    const landOriginalHeight = landSprite.height;
    const landFixedWidth = width+50;
    const landNewHeight = (landFixedWidth / landOriginalWidth) * landOriginalHeight;
    landSprite.setDisplaySize(landFixedWidth, landNewHeight);

    // Cactus repetidos (opcional, puedes quitar si no quieres duplicados)
    scene.add.sprite(width-50, height-50, 'desierto', 'cactus_1').setOrigin(.5, 1).setScale(1);
    scene.add.sprite(width-(mid_w/2), height-50, 'desierto', 'cactus_2').setOrigin(.5, 1).setScale(1);
    scene.add.sprite(150, height-50, 'desierto', 'cactus_3').setOrigin(.5, 1).setScale(1.5);
}