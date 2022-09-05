import { IpcMain } from "electron";
import { AWS__GET_CREDENTIALS } from "./ipc.messages.constants";
import * as store from "../services/store.service";

export function addIpcMainListeners__TwoWay(ipcMain: IpcMain): void {
  ipcMain.handle(AWS__GET_CREDENTIALS, () => {
    return store.getAWSCredentials();
  });
}
