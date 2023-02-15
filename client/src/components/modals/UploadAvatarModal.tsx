import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { createImage } from "../../config/createImage";

type Props = {
  imageSrc: string | null;
  handleSetResMsg: (data: { msg: string; status: number }) => void;
  handleCloseCropModal: () => void;
  handleSetAvatar: (avatar: string) => void;
};

export default function UploadAvatarModal({
  imageSrc,
  handleCloseCropModal,
  handleSetResMsg,
  handleSetAvatar,
}: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCropComplete = useCallback(
    (croppedArea: Point, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const savedCroppedImage = async (pixelCrop: any) => {
    try {
      const image: HTMLImageElement | any = await createImage(
        imageSrc as string
      );
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return null;
      }

      // set canvas size to match the bounding box
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      // croppedAreaPixels values are bounding box relative
      // extract the cropped image using these values
      const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
      );

      // set canvas width to final desired crop size - this will clear existing context
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      // paste generated rotate image at the top left corner
      ctx.putImageData(data, 0, 0);
      canvas.toBlob((file) => {
        const formData = new FormData();
        formData.append("avatar", file as Blob, "avatar.jpeg");

        fetch(import.meta.env.VITE_BACKEND_URL + "upload-avatar", {
          method: "POST",
          credentials: "include",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            const resMsg: { msg: string; status: number } = {
              msg: data.msg,
              status: data.status,
            };
            console.log(data);
            handleSetResMsg(resMsg);
            handleSetAvatar(data?.avatar);
          })
          .catch((err) => {
            console.log(err);
          });
      }, "image/jpeg");
    } catch (e) {
      console.error(e);
    } finally {
      handleCloseCropModal();
    }
  };

  return (
    <div className="fixed w-100 h-100 top-0 left-0 right-0 bottom-0 bg-primary-black bg-opacity-60 flex items-center justify-center">
      <div className="p-8 bg-secondary-black flex flex-col justify-center align-center relative w-400">
        {/* close btn | icon */}
        <i
          onClick={handleCloseCropModal}
          className="fa-solid fa-xmark text-grays text-sm absolute right-0 top-0 rounded-full p-2 hover:text-grayish"
        ></i>
        {imageSrc && (
          <div className="h-400 w-full relative m-auto">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 4}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        )}
        <p className="text-xs text-grays mt-2">
          Note: Scroll your mouse to zoom in and zoom out
        </p>

        <button
          onClick={() => savedCroppedImage(croppedAreaPixels)}
          className="text-grayish w-full bg-dark-green p-2 mt-5"
        >
          Save
        </button>
      </div>
    </div>
  );
}
