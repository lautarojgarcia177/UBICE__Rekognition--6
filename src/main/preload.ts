import { contextBridge, ipcRenderer } from 'electron';
import { IAWSCredentials, IAWSRekognitionSettings } from 'interfaces';
import { AWS__GET_CREDENTIALS, AWS__GET_REKOGNITION_SETTINGS, AWS__SET_CREDENTIALS, AWS__SET_REKOGNITION_SETTINGS } from 'ipc/ipc.messages.constants';

contextBridge.exposeInMainWorld('electron', {
  setAWSCredentials: (credentials: IAWSCredentials) => ipcRenderer.send(AWS__SET_CREDENTIALS, credentials),
  getAWSCredentials: () => ipcRenderer.invoke(AWS__GET_CREDENTIALS),
  setAWSRekognitionSettings: (settings: IAWSRekognitionSettings) => ipcRenderer.send(AWS__SET_REKOGNITION_SETTINGS, settings),
  getAWSRekognitionSettings: () => ipcRenderer.invoke(AWS__GET_REKOGNITION_SETTINGS),
});
