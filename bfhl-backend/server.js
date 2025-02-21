import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const userId = "Akash-1";
const email = "22bcs11135@cuchd.in";
const rollNumber = "22BCS11135";

// POST endpoint
app.post("/bfhl", (req, res) => {
  const { data } = req.body;
  if (!Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid input" });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));
  const highestAlphabet =
    alphabets.length > 0 ? [alphabets.reduce((a, b) => (a > b ? a : b))] : [];

  res.json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highestAlphabet,
  });
});

// GET endpoint

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
