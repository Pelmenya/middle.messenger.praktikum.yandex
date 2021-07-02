export default function getDateOfMessages(str: string, full = true): string {
  const strObj = str.split("-");
  const year = strObj[0];
  const month = strObj[1];
  const day = strObj[2];
  const objMonth = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  if (full) return `${day} ${objMonth[Number(month) - 1]} ${year}г.`;
  else return `${day} ${objMonth[Number(month) - 1]}`;
}
