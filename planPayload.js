export const planPayload = {
  product_id: "PROD-1T5972390R257015G", // берется из респонса запроса create product
  name: "Humans design subscription plan",
  status: "ACTIVE",
  billing_cycles: [
    {
      tenure_type: "TRIAL",
      sequence: 1,
      total_cycles: 1,
      pricing_scheme: {
        fixed_price: {
          value: "1.99",
          currency_code: "USD",
        },
      },
      frequency: {
        interval_unit: "DAY",
        interval_count: 3,
      },
    },
    {
      tenure_type: "REGULAR",
      sequence: 2,
      total_cycles: 0,
      pricing_scheme: {
        fixed_price: {
          value: "29.99",
          currency_code: "USD",
        },
      },
      frequency: {
        interval_unit: "MONTH",
        interval_count: 1,
      },
    },
  ],
  payment_preferences: {
    auto_bill_outstanding: true,
    payment_failure_threshold: 3,
  },
  taxes: { percentage: "0" }
};
