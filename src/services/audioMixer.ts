/**
 * Mixes multiple audio streams into a single audio track using Web Audio API.
 * This allows combining microphone audio with tab audio for recordings.
 */

/**
 * Mixes microphone and tab audio streams with optional gain control.
 *
 * @param microphoneStream - MediaStream containing microphone audio
 * @param tabAudioStream - MediaStream containing tab audio from screen share
 * @param micGainValue - Volume level for microphone (0.0 to 1.0, default 0.7)
 * @param tabGainValue - Volume level for tab audio (0.0 to 1.0, default 0.7)
 * @returns Mixed audio track that can be added to a MediaStream
 */
export const mixAudioStreams = (
  microphoneStream: MediaStream,
  tabAudioStream: MediaStream,
  micGainValue = 0.7,
  tabGainValue = 0.7,
): MediaStreamTrack => {
  const audioContext = new AudioContext();

  // Create source nodes from both streams
  const micSource = audioContext.createMediaStreamSource(microphoneStream);
  const tabSource = audioContext.createMediaStreamSource(tabAudioStream);

  // Create destination for mixed output
  const destination = audioContext.createMediaStreamDestination();

  // Add gain controls for volume balancing
  const micGain = audioContext.createGain();
  const tabGain = audioContext.createGain();

  micGain.gain.value = micGainValue;
  tabGain.gain.value = tabGainValue;

  // Connect audio graph: source -> gain -> destination
  micSource.connect(micGain).connect(destination);
  tabSource.connect(tabGain).connect(destination);

  // Return the mixed audio track
  return destination.stream.getAudioTracks()[0];
};

/**
 * Gets a single audio track from available audio sources.
 * If both microphone and tab audio exist, they are mixed together.
 * Otherwise, returns whichever single source is available.
 *
 * @param microphoneStream - Optional MediaStream with microphone audio
 * @param tabAudioStream - Optional MediaStream with tab audio
 * @returns Single audio track (mixed or single source), or undefined if no audio sources
 */
export const getAudioTrack = (
  microphoneStream: MediaStream | null,
  tabAudioStream: MediaStream | null,
): MediaStreamTrack | undefined => {
  const microphoneTrack = microphoneStream?.getAudioTracks()[0];
  const tabAudioTrack = tabAudioStream?.getAudioTracks()[0];

  // If both audio sources exist, mix them
  if (microphoneTrack && tabAudioTrack) {
    return mixAudioStreams(microphoneStream, tabAudioStream);
  }

  // Otherwise return whichever single source exists
  return microphoneTrack || tabAudioTrack;
};
