export function formatCurrency(
  amount,
  symbol = "₹",
  position = "before",
  decimals = 2
) {
  const value = Number(amount || 0).toFixed(decimals);

  return position === "before"
    ? `${symbol}${value}`
    : `${value}${symbol}`;
}
