export const planPayload = {
  product_id: "PROD-7TL326533E694871F",
  name: "Humans design subscription plan",
  status: "ACTIVE",
  billing_cycles: [
    {
      tenure_type: "TRIAL",
      sequence: 1,
      total_cycles: 1,
      pricing_scheme: {
        fixed_price: {
          value: "0.99",
          currency_code: "USD",
        },
      },
      frequency: {
        interval_unit: "WEEK",
        interval_count: 1,
      },
    },
    {
      tenure_type: "REGULAR",
      sequence: 2,
      total_cycles: 0,
      pricing_scheme: {
        fixed_price: {
          value: "39.99",
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
