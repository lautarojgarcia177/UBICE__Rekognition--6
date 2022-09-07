import { selector } from "recoil";
import { filesState } from "./atoms";

export const filesStateLengthSelector = selector({
  key: 'filesStateLength',
  get: ({get}) => {
    const length = get(filesState).length;
    return length;
  },
});
