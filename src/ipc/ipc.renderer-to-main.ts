import { BrowserWindow, IpcMain } from "electron";
import { IAWSCredentials } from "interfaces";
import { AWS__SET_CREDENTIALS } from "./ipc.messages.constants";
import * as store from "../services/store.service";

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
}
