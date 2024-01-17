import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import { productPayload } from "./productPayload.js";
import { planPayload } from "./planPayload.js";
import cors from 'cors';

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;
const base = "https://api-m.sandbox.paypal.com";
const app = express();

const planId = "P-62T90999WU382154HMWTENHA"; // взято из ответа после создания плана: responses/plan.json
app.use(cors());

app.use(express.json());

const handleResponse = async (response) => {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
};

const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

const createSubscription = async (userAction = "SUBSCRIBE_NOW") => {
  const url = `${base}/v1/billing/subscriptions`;
  const accessToken = await generateAccessToken();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      plan_id: planId,
      application_context: {
        user_action: userAction,
      },
    }),
  });

  return handleResponse(response);
};

app.get("/", (req, res) => {
  res.send({ success: true });
});


//только чтобы один раз создать продукт и план подписки
app.post("/api/create-product", async (req, res) => {
  try {
    const accessToken = await generateAccessToken();

    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/catalogs/products",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          // "PayPal-Request-Id": "PRODUCT-18062019-001",
          Prefer: "return=representation",
        },
        body: JSON.stringify(productPayload),
      },
    );
    const product = await response.json();
    res.send(product);
  } catch (err) {
    res.send(err);
  }
});
app.post("/api/create-plan", async (req, res) => {
  try {
    const accessToken = await generateAccessToken();

    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/billing/plans",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(planPayload),
      },
    );

    const plan = await response.json();
    console.log(plan);
    res.send(plan);
  } catch (err) {
    res.send(err);
  }
});
//

//  для фронта только этот запрос нужен
app.post("/api/buy-with-paypal", async (req, res) => {
  try {
    const { jsonResponse, httpStatusCode } = await createSubscription();
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
});
