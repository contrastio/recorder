import Button from '@mui/material/Button';

import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useStreams } from 'contexts/streams';

import styles from './Toolbar.module.css';

const Toolbar = () => {
  const { setCameraStream, setScreenshareStream } = useStreams();
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
      // TODO Set screenshare stream to null when ending stopping the screenshare
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      console.log(
        'Screen share settings:',
        stream.getVideoTracks()[0].getSettings()
      );
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
