// Audio system using Howler.js.
//
// Three sound sources:
//   - backgroundMusic — looping music (started on "Enter")
//   - backgroundAmbience — looping ambient SFX (started on "Enter")
//   - thumpHover — one-shot thump SFX (played on interactions)
//
// File extension is platform-dependent (.ogg for most, .mp3 for Apple)
// because iOS/macOS Safari doesn't support Ogg Vorbis.

import { Howl, Howler } from "howler";
import { getAudioFileExtension } from "./platformDetector";

const sounds = {
  backgroundMusic: new Howl({
    src: [`/audio/music/background_music.${getAudioFileExtension()}`],
    loop: true,
    html5: true,
    volume: 0.8,
  }),
  backgroundAmbience: new Howl({
    src: [`/audio/sfx/background_ambience.${getAudioFileExtension()}`],
    loop: true,
    html5: true,
    volume: 0.9,
  }),
  thumpHover: new Howl({
    src: [`/audio/sfx/thump_hover.${getAudioFileExtension()}`],
    loop: false,
    html5: true,
    volume: 1,
  }),
};

export const playSound = (soundId) => {
  sounds[soundId]?.play();
};

export const playBackgroundMusic = () => {
  sounds.backgroundMusic.play();
};

export const stopBackgroundMusic = () => {
  sounds.backgroundMusic.stop();
};

export const pauseBackgroundMusic = () => {
  sounds.backgroundMusic.pause();
};

export { sounds, Howler };
