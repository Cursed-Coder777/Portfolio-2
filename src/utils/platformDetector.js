// Platform detection — primarily used by audioSystem to select the right
// audio format. Apple devices don't support Ogg Vorbis, so we fall back to MP3.
//
// Detects: iOS (iPhone/iPad/iPod), macOS Safari (by checking maxTouchPoints),
// and regular macOS.

export const isApplePlatform = () => {
  if (typeof navigator === "undefined") return false;

  return (
    // iOS detection
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    // Modern iPad detection (iOS 13+)
    (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1) ||
    // macOS detection
    (/Mac/.test(navigator.userAgent) &&
      !/iPad|iPhone|iPod/.test(navigator.userAgent))
  );
};

export const getAudioFileExtension = () => (isApplePlatform() ? "mp3" : "ogg");
