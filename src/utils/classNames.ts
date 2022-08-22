export type ClassNames = {
  [index: string]: boolean;
};

export function classNames(names: ClassNames): string {
  return Object.keys(names)
    .filter((key) => names[key])
    .join(" ");
}
