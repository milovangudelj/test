import type { NextApiRequest, NextApiResponse } from "next";
import contentType from "content-type";
import getRawBody from "raw-body";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  getRawBody(
    req,
    {
      length: req.headers["content-length"],
      limit: "1mb",
      encoding: contentType.parse(req).parameters.charset,
    },
    function (err, rawBody) {
      if (err) return res.status(500).send(err);

      console.log(rawBody.toString());

      // Once you have your rawBody, you can do whatever you need to do with it
    }
  );

  return res.status(200).json({ value: "ok" });
}
