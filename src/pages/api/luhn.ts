// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  isValid: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { number } = req.body;
  const isValid = checkLuhnNumber(number)
  res.status(200).json({ "isValid": isValid });
}

export function checkLuhnNumber(input: string): boolean {
  let sum = 0;
  let alternate = false;

  for (let i = input.length - 1; i >= 0; i--) {
    let digit = parseInt(input.charAt(i), 10);

    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;

    alternate = !alternate;
  }

  return sum % 10 === 0;
}
