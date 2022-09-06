const actualDate = new Date();
const arrayActualDate = [actualDate.getDate(), actualDate.getMonth(), actualDate.getFullYear()];
const listMonths = ['Janeiro','Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function isToday(compareDate) {
  let sumDate = 0;
  const NEGATIVE_NUM = -1;
  const arrayDate = [compareDate.date, compareDate.month, compareDate.year];

  arrayDate.forEach((currentDate, index) => {
    sumDate += currentDate - arrayActualDate[index];
  })

  if (sumDate < 0) 
    return NEGATIVE_NUM * sumDate;
  
  return sumDate;
}

function isInThisYear(compareYear) {
  return arrayActualDate[2] !== compareYear;
}

function formatWithZero(receivedNum) {
  return receivedNum < 10 ? `0${receivedNum}` : receivedNum;
}

function filterDate(receivedDate) {
  let moment = '';
  const NO_DIFF = 0;
  const DIFF = isToday(receivedDate);
  const formatHour = formatWithZero(receivedDate.hour);
  const formatMinute = formatWithZero(receivedDate.minutes);

  if (DIFF == NO_DIFF)
    moment = `${formatHour}:${formatMinute}`;

  if (DIFF == 1)
    moment = `Ontem ${formatHour}:${formatMinute}`;
  
  if (DIFF > 1)
    moment = `${receivedDate.date} de ${listMonths[receivedDate.month]}`;

  if (isInThisYear(receivedDate.year)) 
    moment = `${receivedDate.date} de ${listMonths[receivedDate.month]} de ${receivedDate.year}`;
  
  return moment;
}


export default filterDate;