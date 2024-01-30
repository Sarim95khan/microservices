import express from 'express';

const uploadImage = async (req: express.Request, res: express.Response) => {
  const { identity } = req.body;
  console.log(identity);
  res.json(identity);
};
