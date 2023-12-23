import "dotenv/config";
import { RingApi } from "ring-client-api";
import * as path from "path";
import { join } from "node:path";
import fs from "fs";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { createWorker } from "tesseract.js";

dotenv.config();

const app: Express = express();
app.use(cors());
const port = 8000; //process.env.PORT;

app.get("/plateNumber", async (req: Request, res: Response) => {
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
  console.log("Reading Text");
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

  const worker = await createWorker("eng");
  const ret = await worker.recognize(
    path.resolve("./", "output", "test2.png")
    // { rectangle: { left: 266, top: 162, width: 82, height: 42 } }
  );
  console.log(ret.data.text);
  await worker.terminate();
  res.json(ret.data);
});

app.get("/checkQueue", async (req: Request, res: Response) => {
  console.log("HHHELLLLLLL");
  const ringApi = new RingApi({
    refreshToken: "",
    debug: true,
  });
  // [camera] = await ringApi.getCameras();
  //   const test = locations.cameras[0].streamVideo({
  //     output: [path.join("./", "output", "part_2.mp4")],
  //   });

  //   test
  //     .then((val) => {
  //       val.activateCameraSpeaker();
  //       return val;
  //     })
  const [locations] = await ringApi.getLocations();

  const snapshot = locations.cameras[0].getSnapshot();

  snapshot
    .then((imgBuff) => {
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      console.log("Taking snapshot");
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      fs.writeFile(path.join("./", "output", "snapshot.png"), imgBuff, () => {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log("checking for plate");
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

        // ***** You can use downloaded images and start here instead of using images taken by ring camera //
        try {
          const image = fs.readFileSync(
            path.join("./", "output", "snapshot.png"),
            {
              encoding: "base64",
            }
          );

          axios({
            method: "POST",
            url: "https://detect.roboflow.com/license-plate-recognition-rxg4e/4",
            params: {
              api_key: "get api key from roboflow",
            },
            data: image,
            headers: {
              cache: "no-cache",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
            .then(async function (response) {
              const { predictions } = response.data;
              const { x, y, width, height } = predictions[0];
              console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
              console.log("Reading Text");
              console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

              const worker = await createWorker("eng");
              const ret = await worker.recognize(
                path.resolve("./", "output", "snapshot.jpg")
                // { rectangle: { left: x, top: y, width, height } }
              );

              console.log(ret.data.text);
              await worker.terminate();
              res.json({ ...response.data, image, text: ret.data.text });
            })
            .catch(function (error) {
              console.log(error.message);
              res.json(error.message);
            });
        } catch (err) {
          console.log("error with roboflow", err);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Error when writing snapshot");
    })
    .finally(() => {});
});

/**
 * This example streams to files, each with 10 seconds of video.
 * The output will be in output/part${part #}.mp4
 **/

// async function example() {
//   const ringApi = new RingApi({
//       // Replace with your refresh token
//       refreshToken:
//         "eyJydCI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW1wcmRTSTZJaTl2WVhWMGFDOXBiblJsY201aGJDOXFkMnR6SWl3aWEybGtJam9pTkdSak9EUXlaR0lpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBZWFFpT2pFM01EQTVOakEzTnpBc0ltbHpjeUk2SWxKcGJtZFBZWFYwYUZObGNuWnBZMlV0Y0hKdlpEcDFjeTFsWVhOMExURTZZVGc1T0daa1pEa2lMQ0p5WldaeVpYTm9YMk5wWkNJNkluSnBibWRmYjJabWFXTnBZV3hmWVc1a2NtOXBaQ0lzSW5KbFpuSmxjMmhmYzJOdmNHVnpJanBiSW1Oc2FXVnVkQ0pkTENKeVpXWnlaWE5vWDNWelpYSmZhV1FpT2pFeE5EVTRNVEV5T1N3aWNtNWtJam9pUjFaRVpIUktSRU5NVWlJc0luTmxjM05wYjI1ZmFXUWlPaUl6TW1ZeFpqYzVZeTA1TVRsaExUUXpZV1V0WVRsaU1pMWpabVJrTjJGak5EUmpORElpTENKMGVYQmxJam9pY21WbWNtVnphQzEwYjJ0bGJpSjkuU09uakhIVTZXd1B5ZDc2WEZIUDdqd3o4Smx0QW9TWllJT25XRFAxa1JRNm9ZQlJYcVA3dGc0VkhjQTE3YWdSNjZfdG5HT01RczUta3M1RzJEZGJGQVo1MW9GR2V4NEhxNnNZUXJxbWV0ZUdmRm4xNzJjLUpwX0pwSFd2Z2t0N1RsZ1dGWlliSWhlMzBReEdSdXVaZGNkbzNzOWtEVzJrUEJqVmN1aEc5YWlLelFvM003aS1XLUxxYmRpZ2pkSkpzYlRDX2xpV2RIM3p5eXVBeWFCdm9hVjJsMnI1YzlUOWdyc3B3RF9HUGZIUUlDSFlQOEs1S3lUNFZTY2xJekdZenA5Z1NYdG1VdmhUeHlWdHdkQnVGempSMm44WDF0NHN4WEEzREhYUDF5M3pGWmdvdGJrMU9iOFFZdVZTNGExamNiYy12cUViOUtQS09VdGhSbVplaGhnIiwiaGlkIjoiMGZhNGY4YmYtMTRmYS01M2U2LWIwNDUtMzNkZmZiZmY5YTQyIn0=",
//       debug: true,
//     }),
//     [camera] = await ringApi.getCameras();
//   const [locations] = await ringApi.getLocations();
//   const test = locations.cameras[0].streamVideo({
//     output: [path.join("./", "output", "part_2.mp4")],
//   });

//   const snapshot = locations.cameras[0].getSnapshot();

//   snapshot.then((imgBuff) => {
//     console.log(imgBuff);
//     fs.writeFile(path.join("./", "output", "snapshot.jpeg"), imgBuff, () => {
//       console.log(
//         "image added to:",
//         path.join("./", "output", "snapshot.jpeg")
//       );
//     });
//   });

//   test.then((val) => {
//     val.activateCameraSpeaker();
//     return val;
//   });
//   if (!camera) {
//     console.log("No cameras found");
//     return;
//   }

//   console.log("Starting Video...");
//   console.log(path.join("./", "output", "part.mp4"));
//   const call = await camera.streamVideo({
//     // save video 10 second parts so the mp4s are playable and not corrupted:
//     // https://superuser.com/questions/999400/how-to-use-ffmpeg-to-extract-live-stream-into-a-sequence-of-mp4
//     output: [
//       "-flags",
//       "+global_header",
//       "-f",
//       "segment",
//       "-segment_time",
//       "10", // 10 seconds
//       "-segment_format_options",
//       "movflags=+faststart",
//       "-reset_timestamps",
//       "1",
//       path.join("./", "output", "part.mp4"),
//     ],
//   });

//   //   sudo curl -Lf# https://github.com/homebridge/ffmpeg-for-homebridge/releases/latest/download/ffmpeg-alpine-arm32v7.tar.gz | sudo tar xzf - -C / --no-same-owner

//   console.log("Video started, streaming to part files...");

//   call.onCallEnded.subscribe(() => {
//     console.log("Call has ended");
//     process.exit();
//   });

//   setTimeout(function () {
//     console.log("Stopping call...");
//     call.stop();
//   }, 60 * 1000); // Stop after 1 minute
// }

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
