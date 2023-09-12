export const nextElementList = <T>(list: T[], value: T) => {
  const currentIndex = list.indexOf(value);
  const nextIndex = currentIndex + 1 === list.length ? 0 : currentIndex + 1;
  return list[nextIndex];
}
