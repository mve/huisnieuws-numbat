const errorRouter = (err: any, req: any, res: any, next: any) => {
  next();

  return res.status(400).send(JSON.stringify(err));
};

export default errorRouter;
