type RequestWindowOptions = {
  width?: number;
  height?: number;
};

type DocumentPictureInPicture = {
  requestWindow: (options?: RequestWindowOptions) => Promise<Window>;
};

interface Window {
  documentPictureInPicture: DocumentPictureInPicture;
}
