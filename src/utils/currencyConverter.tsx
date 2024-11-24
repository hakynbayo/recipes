export const convertToUSD = async (naira: number): Promise<number> => {
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/NGN");
  const data = await response.json();
  const rate = data.rates.USD;
  return parseFloat((naira * rate).toFixed(2));
};