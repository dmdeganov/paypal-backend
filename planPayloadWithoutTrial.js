export const planPayloadWithoutTrial = {
  product_id: "PROD-1T5972390R257015G", // берется из респонса запроса create product
  name: "Humans design subscription plan",
  status: "ACTIVE",
  billing_cycles: [
    {
      tenure_type: "REGULAR",
      sequence: 1,
      total_cycles: 0,
      pricing_scheme: {
        fixed_price: {
          value: "14.99",
          currency_code: "USD",
        },
      },
      frequency: {
        interval_unit: "WEEK",
        interval_count: 2,
      },
    },
  ],
  payment_preferences: {
    auto_bill_outstanding: true,
    payment_failure_threshold: 3,
  },
  taxes: { percentage: "0" }
};
