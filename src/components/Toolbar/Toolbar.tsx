import Button from '@mui/material/Button';

import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useStreams } from 'contexts/streams';

import styles from './Toolbar.module.css';

// TODO Remove and use Footer instead
const Toolbar = () => {
  const { screenshareStream, setCameraStream, setScreenshareStream } =
    useStreams();
  const { requestPipWindow, exitPipWindow } = usePictureInPicture();

  const getCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setCameraStream(stream);
  };

  const getScreenShare = async () => {
    await requestPipWindow();
    try {
      if (screenshareStream) {
        screenshareStream.getTracks().forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      stream.getVideoTracks()[0].onended = () => {
        setScreenshareStream(null);
        exitPipWindow();
      };
      setScreenshareStream(stream);
    } catch {
      // Happens when the user aborts the screenshare
      exitPipWindow();
    }
  };

  return (
    <div className={styles.root}>
      <Button onClick={getCamera}>Get camera</Button>
      <Button onClick={getScreenShare}>Share screen</Button>
    </div>
  );
};

export default Toolbar;
