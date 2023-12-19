export const getNowDate = () => {
  const nowDate = new Date();
  const day = nowDate.getDate();
  const month = nowDate.getMonth();
  const year = nowDate.getFullYear();

  return `${year}-${month + 1}-${day}`;
};
