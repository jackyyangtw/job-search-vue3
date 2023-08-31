export const nextElementList = (list, value) => {
  const currentIndex = list.indexOf(value);
  const nextIndex = currentIndex + 1 === list.length ? 0 : currentIndex + 1;
  return list[nextIndex];
}
