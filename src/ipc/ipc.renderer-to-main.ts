import { BrowserWindow, IpcMain } from "electron";
import { IAWSCredentials, IRekognitionFile } from "interfaces";
import { AWS__SET_CREDENTIALS, START_IMAGES_REKOGNITION } from "./ipc.messages.constants";
import * as store from "../services/store.service";
import { notifyError, notifyRekognitionFinish, notifyRekognitionProgress } from "./ipc.main-to-renderer";
import * as rekognitionSvc from "../services/rekognition.service";

// IPC Renderer to main (one-way)
export function addIpcMainListeners__RendererToMain(
  ipcMain: IpcMain,
  browserWindow: BrowserWindow
): void {
  ipcMain.on(AWS__SET_CREDENTIALS, (_event, credentials: IAWSCredentials) => {
    try {
      store.setAWSCredentials(credentials);
    } catch(error) {
      console.log(error);
    }
  });
  ipcMain.on(START_IMAGES_REKOGNITION, (event, files: IRekognitionFile[]) => {
    const imagesAmount = files.length;
    let rekognizedImagesCounter = 0;
    rekognitionSvc.rekognizeImages(
      files,
      () => {
        rekognizedImagesCounter++;
        const progress = (rekognizedImagesCounter * 100) / imagesAmount;
        notifyRekognitionProgress(browserWindow, progress);
      },
      () => notifyRekognitionFinish(browserWindow),
      (error: Error) => {
        notifyError(browserWindow, error);
      }
    )
  });
}
