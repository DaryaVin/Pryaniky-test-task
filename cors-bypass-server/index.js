import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const PORT = 5000;
const app = express();

app.use(cors());
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(express.json());
const HOST = "https://test.v5.pryaniky.com";

// login
app.post(
  "/ru/data/v3/testmethods/docs/login",
  cors(corsOptions),
  async (req, res) => {
    const currentRequtstEndPoint = HOST + "/ru/data/v3/testmethods/docs/login";
    console.log("currentRequtstEndPoint", currentRequtstEndPoint);

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(req.body),
    };

    const response = await fetch(currentRequtstEndPoint, fetchOptions);

    const jsonResponse = await response.json();
    res.json(jsonResponse);
  }
);

// readAll
app.get(
  "/ru/data/v3/testmethods/docs/userdocs/get",
  cors(corsOptions),
  async (req, res) => {
    const currentRequtstEndPoint =
      HOST + "/ru/data/v3/testmethods/docs/userdocs/get";

    const fetchOptions = {
      method: "GET",
      headers: { "x-auth": req.headers["x-auth"] },
    };

    const response = await fetch(currentRequtstEndPoint, fetchOptions);

    const jsonResponse = await response.json();
    res.json(jsonResponse);
  }
);

// create
app.post(
  "/ru/data/v3/testmethods/docs/userdocs/create",
  cors(corsOptions),
  async (req, res) => {
    const currentRequtstEndPoint =
      HOST + "/ru/data/v3/testmethods/docs/userdocs/create";

    const fetchOptions = {
      method: "POST",
      headers: {
        "x-auth": req.headers["x-auth"],
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(req.body),
    };

    const response = await fetch(currentRequtstEndPoint, fetchOptions);

    const jsonResponse = await response.json();
    res.json(jsonResponse);
  }
);
// update
app.post(
  "/ru/data/v3/testmethods/docs/userdocs/set/:id",
  cors(corsOptions),
  async (req, res) => {
    const currentRequtstEndPoint =
      HOST + "/ru/data/v3/testmethods/docs/userdocs/set/" + req.params.id;

    const fetchOptions = {
      method: "POST",
      headers: {
        "x-auth": req.headers["x-auth"],
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(req.body),
    };

    const response = await fetch(currentRequtstEndPoint, fetchOptions);

    const jsonResponse = await response.json();
    res.json(jsonResponse);
  }
);
// delete
app.post(
  "/ru/data/v3/testmethods/docs/userdocs/delete/:id",
  cors(corsOptions),
  async (req, res) => {
    const currentRequtstEndPoint =
      HOST + "/ru/data/v3/testmethods/docs/userdocs/delete/" + req.params.id;

    const fetchOptions = {
      method: "POST",
      headers: {
        "x-auth": req.headers["x-auth"],
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(req.body),
    };

    const response = await fetch(currentRequtstEndPoint, fetchOptions);

    const jsonResponse = await response.json();
    res.json(jsonResponse);
  }
);

app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
