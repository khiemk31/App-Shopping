export type TYPE_MONEY = '100,000.00' | '100.000,00';

export const getMoneyFormat = (
  str: string,
  typeMoneyFormat: TYPE_MONEY = '100,000.00',
): string => {
  return dotMoney(str, typeMoneyFormat);
};

const dotMoney = (str: string, typeMoneyFormat: TYPE_MONEY): string => {
  try {
    let thousandsSeparator = '';
    let decimalSeparator = '.';

    let temp = String(str).split('.');

    if (typeMoneyFormat == '100.000,00') {
      thousandsSeparator = '.';
      decimalSeparator = ',';
    } else if (typeMoneyFormat == '100,000.00') {
      thousandsSeparator = ',';
      decimalSeparator = '.';
    }

    if (temp.length < 2) {
      return String(str)
        .replace(/[^\d-]/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    } else {
      if (temp[1].length > 0) {
        return (
          temp[0]
            .replace(/[^\d-]/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator) +
          decimalSeparator +
          temp[1]
        );
      } else {
        return temp[0]
          .replace(/[^\d-]/g, '')
          .replace(/\B(?=(\\d{3})+(?!\d))/g, thousandsSeparator);
      }
    }
  } catch (error) {
    console.log(error);
    return str;
  }
};
export const currencyFormat = (num: number) => {
  if (num === null || num === undefined || num === -1) {
    return '0';
  } else {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
};
