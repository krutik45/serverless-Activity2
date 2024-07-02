/* eslint-disable */

import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageIcon from "../../assets/ImageIcon";
import { Services } from "../../services/Services";
import Modal from "../Modal/Modal";
import {
  Card,
  Grid,
  Image,
  ImageContainer,
  Listing,
  ProductImage,
  RegisterButton,
  UploadButtonContainer,
} from "./HomeStyles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Home: React.FC = () => {
  let navigate = useNavigate();
  const services = new Services();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const [images, setImages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleIconClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files).slice(0, 5); // Limit to max 5 files
      setSelectedFiles(filesArray);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setThumbnailUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
      setShowModal(true);
    }
  };

  const handleUpload = async () => {
    const convertedToBase: any = await convertImageToBase64(selectedFiles[0]);
    console.log("convertedToBase", convertedToBase);
    const response: any = await services.uploadImage({
      base64Image: convertedToBase,
    });
    console.log("response in upload image", response);
    if (response.data.statusCode == 200) {
      window.alert("image uploaded, please refresh the page to see");
    }
    console.log("convertedToBase", convertedToBase);
    if (selectedFiles.length > 0) {
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setSelectedFiles([]);
    setThumbnailUrl(null);
    setShowModal(false);
  };

  useEffect(() => {
    (async function () {
      try {
        const response: any = await services.fetchImages();
        console.log("response in fetch images useEffect", response.data);
        const imagesArray: string[] = response.data.map(
          (data: any) => data.url
        );
        setImages(imagesArray);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    })();
  }, []);

  async function convertImageToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String =
          typeof reader.result === "string" ? reader.result.split(",")[1] : "";
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  return (
    <>
      {images.length === 0 ? (
        "loading..."
      ) : (
        <>
          <Grid>
            {images.map((image: string, index: number) => (
              <Card key={index}>
                <Image>
                  <img src={image} alt={`Image ${index}`} />
                </Image>
              </Card>
            ))}
          </Grid>

          <Listing onClick={() => handleIconClick}>
            <label htmlFor="file-input">
              <ProductImage>
                <ImageIcon height={32} width={32} />
              </ProductImage>
              <p>Upload an image</p>
            </label>
            <input
              required={true}
              multiple
              ref={fileInputRef}
              id="file-input"
              name="productImages"
              type="file"
              accept="image/png"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Listing>

          {showModal && selectedFiles.length > 0 && (
            <Modal onClose={closeModal} title={"Selected Image"}>
              <ImageList
                sx={{ width: 500, height: 450 }}
                cols={3}
                rowHeight={164}
              >
                {selectedFiles.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      style={{
                        height: "164px",
                        width: "164px",
                        objectFit: "cover",
                      }}
                      src={URL.createObjectURL(image)}
                      loading="lazy"
                      alt={`Selected Image ${index}`}
                    />
                  </ImageListItem>
                ))}
              </ImageList>

              <UploadButtonContainer>
                <RegisterButton
                  onClick={() => handleUpload()}
                  style={{ width: "50%" }}
                  type="submit"
                >
                  Upload
                </RegisterButton>
              </UploadButtonContainer>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default Home;
