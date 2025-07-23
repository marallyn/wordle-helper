export type Letter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";
export type LetterOrEmpty = Letter | "";
export type LetterOrEmptyArray = [
  LetterOrEmpty,
  LetterOrEmpty,
  LetterOrEmpty,
  LetterOrEmpty,
  LetterOrEmpty
];

export type Word = string;

export type LetterPoolTypes =
  | "available"
  | "not-used"
  | "correct-position"
  | "wrong-place";
