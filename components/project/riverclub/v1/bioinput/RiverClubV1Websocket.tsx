import React, { useEffect, useState } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { fetchData } from "next-auth/client/_utils";

interface Props {
  setImgData: any;
}

const RiverClubV1Websocket: React.FC<Props> = ({ setImgData }: Props) => {
  const cameraIsReady = true;
  const [myImage, setMyImage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5021/FaceClient");

    const fetchData = async () => {
      try {
        await new Promise<void>((resolve) => {
          if (cameraIsReady) {
            resolve();
          }
        });

        await ws.send('{"action":"GetImage"}');
      } catch (error) {
        console.error(`WebSocket error: ${error}`);
      }
    };

    const handleWebSocketMessage = async (event: MessageEvent) => {
      try {
        const res = JSON.parse(event.data);

        if (res.image != null) {
          setMyImage(res.image);
          setImgData(res.image);
          console.log(myImage);
        } else {
          console.error(res.message);
        }
      } catch (error) {
        console.error(`Error processing WebSocket message: ${error}`);
      }
    };

    ws.onopen = fetchData;
    ws.onmessage = handleWebSocketMessage;

    ws.onerror = (event: any) => {
      console.error(`WebSocket error: ${event.data}`);
    };

    ws.onclose = () => {
      console.log("WebSocket Connection is closed");
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [fetchData]);

  useEffect(() => {
    setImgData(myImage);
  });

  // const base64String = myImage;
  // const [imageData, setImageData] = useState<string | null>(null);

  // useEffect(() => {
  //   async function waitForDataAndConvert() {
  //     while (!data) {

  //       await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout interval as needed
  //     }

  //     try {
  //       const binaryData = new Uint8Array(
  //         Array.from(atob(base64String), (char) => char.charCodeAt(0)
  //       ));

  //       const blob = new Blob([binaryData], {
  //         type: "image/png",
  //       });

  //       const imageUrl = URL.createObjectURL(blob);

  //       setImageData(imageUrl);
  //     } catch (error) {
  //       // Handle any potential errors during image conversion
  //       console.error("Image conversion error:", error);
  //     }
  //   }

  //   waitForDataAndConvert();
  // }, [data]);

  return (
    <BlockDiv className="flex flex-col">
      <img src={myImage} alt={myImage} className="hidden" />
      {/* {imageData && (
        <img src={imageData} alt="Base64 Image" className="w-32 h-32" />
      )} */}
    </BlockDiv>
  );
};

export default RiverClubV1Websocket;
