import { BrowserWindow } from "electron";
import { NOTIFY_ERROR, REKOGNITION_FINISH, REKOGNITION_PROGRESS } from "./ipc.messages.constants";

// Main to Renderer (one-way)
export function notifyRekognitionProgress(
  browserWindow: BrowserWindow,
  progress: number
) {
  browserWindow.webContents.send(REKOGNITION_PROGRESS, progress);
}
/* Notifies rekognition finish */
export function notifyRekognitionFinish(browserWindow: BrowserWindow) {
  browserWindow.webContents.send(REKOGNITION_FINISH);
}

/* Notifies error */
export function notifyError(browserWindow: BrowserWindow, err) {
  browserWindow.webContents.send(NOTIFY_ERROR, err);
}
