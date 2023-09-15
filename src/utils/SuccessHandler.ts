import { Response } from "express";

const SuccessHandler = (data: any, statusCode: number, res: Response) => {
  return res.status(statusCode).json({
    success: true,
    data: data,
  });
};

export default SuccessHandler;
