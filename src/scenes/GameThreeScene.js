import Phaser from 'phaser'
import HomeButton from '../components/HomeButton'
import MusicButton from '../components/MusicButton'
import CoinBadge from '../components/CoinBadge'
import DiamondBadge from '../components/DiamondBadge'
import ClockBadge from '../components/ClockBadge'
import GameThreeWelcomeAudio from '../components/GameThreeWelcomeAudio'
import LevelEasyButton from '../components/LevelEasyButton'
import LevelNormalButton from '../components/LevelNormalButton'
import LevelHardButton from '../components/LevelHardButton'
import LevelHardestButton from '../components/LevelHardestButton'
import MoveTheImagesToTheRightPositionsScene from './MoveTheImagesToTheRightPositionsScene'
import MainGameScene from './MainGameScene'
import { destroyObject, addBee } from '../helpers'

class GameThreeScene extends Phaser.Scene {
  static get KEY () {
    return 'GameThreeScene'
  }

  static get GAME_SCENE_KEY () {
    return MoveTheImagesToTheRightPositionsScene.KEY
  }

  constructor () {
    super({ key: GameThreeScene.KEY })

    this.things = {}
  }

  create (data) {
    this.forceRestart()
    this.setBackground()

    this.playWelcomeAudio()
    this.createCoinBadge()
    this.createDiamondBadge()
    this.createClockBadge()
    this.createBackToHomeButton()
    this.createMusicButton()
    this.createLevelButtons()

    addBee(this)
    this.events.on('resume', this.onResume.bind(this))
  }

  onResume (scene, data) {
    this.things.diamondBadge.refreshDiamond()
  }

  forceRestart () {
    for (let index in this.things) {
      destroyObject(this.things[index])
      delete this.things[index]
    }
  }

  setBackground () {
    this.cameras.main.setBackgroundColor('#FCE4EC')

    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.height * 0.95
    const fontSize = Math.floor(this.cameras.main.height * 0.2)
    this.things.backgroundText = this.make.text({
      x: centerX,
      y: centerY,
      text: 'Thi ai tinh',
      style: {
        font: fontSize + 'px Quicksand',
        fill: '#fc4242'
      }
    })
    this.things.backgroundText.setOrigin(0.5, 1)
  }

  playWelcomeAudio () {
    if (this.things.welcomeAudio === undefined) this.things.welcomeAudio = this.sound.add(GameThreeWelcomeAudio.KEY)
    this.things.welcomeAudio.play()
  }

  stopWelcomeAudio () {
    this.things.welcomeAudio.stop()
  }

  createCoinBadge () {
    if (this.things.coinBadge === undefined) this.things.coinBadge = new CoinBadge(this)
  }

  createDiamondBadge () {
    if (this.things.diamondBadge === undefined) this.things.diamondBadge = new DiamondBadge(this)
  }

  createClockBadge () {
    if (this.things.clockBadge === undefined) this.things.clockBadge = new ClockBadge(this)
  }

  createBackToHomeButton () {
    if (this.things.homeButton === undefined) {
      const y = this.things.coinBadge.coinImage.y + this.things.coinBadge.coinImage.displayHeight / 2 + 8
      this.things.homeButton = new HomeButton(this, y)

      this.things.homeButton.setCallback(() => {
        this.scene.pause()
        this.things.welcomeAudio.stop()
      })
    }
  }

  createMusicButton () {
    if (this.things.musicButton === undefined) this.things.musicButton = new MusicButton(this)
  }

  createLevelButtons () {
    if (this.things.levelEasyButton === undefined) {
      this.things.levelEasyButton = new LevelEasyButton(this)
      this.things.levelEasyButton.setCallback(() => {
        this.things.welcomeAudio.stop()
        // this.scene.start(MainGameScene.KEY, {parentSceneKey: GameThreeScene.KEY, forceRestart: true, gameSceneKey: GameThreeScene.GAME_SCENE_KEY, level: 'easy' })
        this.scene.pause()
        this.scene.run(GameThreeScene.GAME_SCENE_KEY, {level: 'easy' })
      })
    }
    if (this.things.levelNormalButton === undefined) {
      this.things.levelNormalButton = new LevelNormalButton(this)
      this.things.levelNormalButton.setCallback(() => {
        this.things.welcomeAudio.stop()
        this.scene.pause()
        // this.scene.start(MainGameScene.KEY, {parentSceneKey: GameThreeScene.KEY, forceRestart: true, gameSceneKey: GameThreeScene.GAME_SCENE_KEY, level: 'normal' })
        this.scene.run(GameThreeScene.GAME_SCENE_KEY, {level: 'normal' })
      })
    }
    if (this.things.levelHardButton === undefined) {
      this.things.levelHardButton = new LevelHardButton(this)
      this.things.levelHardButton.setCallback(() => {
        this.things.welcomeAudio.stop()
        this.scene.pause()
        // this.scene.start(MainGameScene.KEY, {parentSceneKey: GameThreeScene.KEY, forceRestart: true, gameSceneKey: GameThreeScene.GAME_SCENE_KEY, level: 'hard' })
        this.scene.run(GameThreeScene.GAME_SCENE_KEY, {level: 'hard' })
      })
    }
    // if (this.things.levelHardestButton === undefined) {
    //   this.things.levelHardestButton = new LevelHardestButton(this)
    //   this.things.levelHardestButton.setCallback(() => {
    //     this.things.welcomeAudio.stop()
    //     this.scene.start(MainGameScene.KEY, {parentSceneKey: GameThreeScene.KEY, forceRestart: true, gameSceneKey: GameThreeScene.GAME_SCENE_KEY, level: 'hardest' })
    //   })
    // }
  }
}

export default GameThreeScene
