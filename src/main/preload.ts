import { contextBridge, ipcRenderer } from 'electron';
import { IAWSCredentials } from 'interfaces';
import { AWS__GET_CREDENTIALS, AWS__SET_CREDENTIALS } from 'ipc/ipc.messages.constants';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  setAWSCredentials: (credentials: IAWSCredentials) => ipcRenderer.send(AWS__SET_CREDENTIALS, credentials),
  getAWSCredentials: () => ipcRenderer.invoke(AWS__GET_CREDENTIALS),
});
