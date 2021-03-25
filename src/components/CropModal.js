import { useCallback, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// For accessibility (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function CropModal(props) {
  const {
    isOpen,
    toggleModal,
    imageBase64,
  } = props;

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 50, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onLoad = useCallback(img => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  const handleSave = () => {
    const croppedBase64 = previewCanvasRef.current.toDataURL('image/png');
    console.log(croppedBase64);
  }

  return (
    <Modal
      className="modal"
      isOpen={isOpen}
      onRequestClose={toggleModal}
      >
        <h2>Crop Your Image</h2>
        <ReactCrop
          src={imageBase64}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          minHeight={100} // change to your desired minimum height/width
          minWidth={100}
          ruleOfThirds // shows a grid pattern for centering
          circularCrop // remove this if your profile images are square
          keepSelection // crop won't reset on click
          imageStyle={{ maxHeight: '75vh'}} // prevents image from pushing modal off-screen
        />
        <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
        <button class="upload-label" onClick={handleSave}>Save</button>
    </Modal>
  );
};

export default CropModal;
