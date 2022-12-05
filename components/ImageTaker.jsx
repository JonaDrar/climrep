import { useRef, useEffect, useState } from "react";

export const ImageTaker = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator
    .mediaDevices
    .getUserMedia({ 
      video: { 
        width: 720, 
        height: 480 
      }})
    .then((stream) => {
      const video = videoRef.current;
      console.log(videoRef);
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {
      console.error(err);
    });
  };

  const takePhoto = () => {
    const width = 480;
    const height = 480;

    const video = videoRef.current;
    const photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    const context = photo.getContext("2d");
    context.drawImage(video, 0, 0, width, height);

    setHasPhoto(true);
  };

  const anotherPhoto = () => {
    const photo = photoRef.current;
    const context = photo.getContext("2d");
    context.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };


  useEffect(() => {
    getVideo();
  }, [videoRef]);



  return (
    <div className="CamPage h-full w-full ">
      <div className="camera">
        <video 
        ref={ videoRef }
        className='w-full h-auto max-w-full'
        ></video>
        <button
          onClick={ takePhoto }
        >
          <img
            src="https://img.icons8.com/ios/50/000000/camera.png"
            alt="camera"
          />
        </button>
      </div>
      <div className={ 'result ' + (hasPhoto ? 'hasPhoto' : '') }>
        <canvas ref={ photoRef }></canvas>
        <button
          onClick={ anotherPhoto }
        >
          <img
            src="https://img.icons8.com/ios/50/000000/refresh.png"
            alt="refresh"
          />
        </button>
        <button
          onClick={ () => console.log(photoRef.current.toDataURL()) }
        >
          <img
            src="https://img.icons8.com/ios/50/000000/ok.png"
            alt="ok"
          />
        </button>
      </div>
    </div>
  );
};
