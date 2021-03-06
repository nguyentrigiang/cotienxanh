import Phaser from 'phaser'
import BackButton from '../components/BackButton'
import MusicButton from '../components/MusicButton'
import CoinBadge from '../components/CoinBadge'
import DiamondBadge from '../components/DiamondBadge'
import ClockBadge from '../components/ClockBadge'
import LevelEasyButton from '../components/LevelEasyButton'
import LevelNormalButton from '../components/LevelNormalButton'
// import LevelHardButton from '../components/LevelHardButton'
import MainGameScene from './MainGameScene'
import CompleteTheStoriesScene from './CompleteTheStoriesScene'
import { destroyObject, addBee } from '../helpers'
import CompleteTheStoriesGuideSound from '../components/CompleteTheStoriesGuideSound'
import GameTwoScene from './GameTwoScene'

class GameTwoSubTwoScene extends Phaser.Scene {
  static get KEY () {
    return 'GameTwoSubTwoScene'
  }

  static get GAME_SCENE_KEY () {
    return CompleteTheStoriesScene.KEY
  }

  constructor () {
    super({ key: GameTwoSubTwoScene.KEY })

    this.things = {}
  }

  create (data) {
    this.forceRestart()
    this.setBackground()

    this.playWelcomeAudio()
    this.createCoinBadge()
    this.createDiamondBadge()
    this.createClockBadge()
    this.createBackButton()
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
    const fontSize = Math.floor(this.cameras.main.height * 0.15)
    this.things.backgroundText = this.make.text({
      x: centerX,
      y: centerY,
      text: 'Thi ai thông thái',
      style: {
        font: fontSize + 'px Quicksand',
        fill: '#23cf5f'
      }
    })
    this.things.backgroundText.setOrigin(0.5, 1)
  }

  playWelcomeAudio () {
    if (this.things.welcomeAudio === undefined) this.things.welcomeAudio = this.sound.add(CompleteTheStoriesGuideSound.KEY)
    this.things.welcomeAudio.play()
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

  createBackButton () {
    destroyObject(this.things.backButton)
    const y = this.things.coinBadge.coinImage.y + this.things.coinBadge.coinImage.displayHeight / 2 + 8
    this.things.backButton = new BackButton(this, GameTwoScene.KEY, () => this.things.welcomeAudio.stop(), true, {}, true, y)
  }

  createMusicButton () {
    if (this.things.musicButton === undefined) this.things.musicButton = new MusicButton(this)
  }

  createLevelButtons () {
    if (this.things.levelEasyButton === undefined) {
      this.things.levelEasyButton = new LevelEasyButton(this)
      // this.things.levelEasyButton.setCallback(() => this.scene.start(MainGameScene.KEY, {parentSceneKey: GameTwoSubTwoScene.KEY, forceRestart: true, gameSceneKey: GameTwoSubTwoScene.GAME_SCENE_KEY, level: 'easy' }))
      this.things.levelEasyButton.setCallback(() => {
        this.scene.pause()
        this.scene.run(GameTwoSubTwoScene.GAME_SCENE_KEY, {level: 'easy' })
      })
    }
    // if (this.things.levelNormalButton === undefined) {
    //   this.things.levelNormalButton = new LevelNormalButton(this)
    //   this.things.levelNormalButton.setCallback(() => this.scene.start(MainGameScene.KEY, { forceRestart: true, gameSceneKey: GameTwoSubTwoScene.GAME_SCENE_KEY, level: 'normal' }))
    // }
    // if (this.things.levelHardButton === undefined) {
    //   this.things.levelHardButton = new LevelHardButton(this)
    //   this.things.levelHardButton.setCallback(() => this.scene.start(MainGameScene.KEY, { forceRestart: true, gameSceneKey: GameTwoSubTwoScene.GAME_SCENE_KEY, level: 'hard' }))
    // }
  }
}

export default GameTwoSubTwoScene
