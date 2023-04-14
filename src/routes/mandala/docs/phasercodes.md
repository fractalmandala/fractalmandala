---
title: phaser implementation
tags: sveltecode phaser
type: code
---

```html
<!-- PhaserGame.svelte -->
<script>
  import { onMount } from 'svelte';
  import Phaser from 'phaser';

  const baseMap = 'assets/base_map.png';
  const characterSprites = [
    'assets/character1.png',
    'assets/character2.png',
    'assets/character3.png',
    'assets/character4.png'
  ];

  let game;

  onMount(async () => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-game',
      scene: {
        preload,
        create,
        update
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      }
    };

    game = new Phaser.Game(config);
  });

  function preload() {
    this.load.image('base_map', baseMap);

    for (let i = 0; i < characterSprites.length; i++) {
      this.load.image(`character${i + 1}`, characterSprites[i]);
    }

    // Load other assets such as regions, resources, and text/images for unlocking here
  }

  function create() {
    this.add.image(400, 300, 'base_map');

    const characters = characterSprites.map((_, i) =>
      this.physics.add.image(100 * (i + 1), 100, `character${i + 1}`).setInteractive({ draggable: true })
    );

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    // Create regions, unlocking sections, and resource collection system here
  }

  function update() {
    // Update logic for regions, unlocking sections, and resource collection system here
  }
</script>

<style>
  #phaser-game {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
</style>

<div id="phaser-game" />
```
