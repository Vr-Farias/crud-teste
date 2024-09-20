
import { Request, Response } from 'express';
import { ProfessionalModel } from '../models/professionals.model';
import path from 'path';
import fs from 'fs/promises'


export const createProfessional = async (req: Request, res: Response) => {
  try {
    const professional = new ProfessionalModel(req.body);
    await professional.save();
    res.status(201).json(professional);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllProfessionals = async (req: Request, res: Response) => {
  try {

    // const filePath = path.join(__dirname, '../../assets/professionals.json');


    // const data = await fs.readFile(filePath, 'utf-8');
    const professionals = await ProfessionalModel.find();

    res.status(200).json(professionals);
  } catch (error: any) {;
    res.status(500).json({ error: error.message });
  }
};
