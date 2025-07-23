import { Letter } from "../types/common";

export const availableLetters: Letter[] = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .map(char => {
    return char as Letter;
  });
