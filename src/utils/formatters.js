const formatCurrency = (value, locales = 'en-GB', currency = 'GBP') => {
  const formatter = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currency
  });

  return formatter.format(value);
};

export {
  formatCurrency
};
