import { Schema, model } from 'mongoose';

export interface ProfessionalPost {
  id?: number;
  name: string;
  specialty: string;
  crm: string;
  phone?: string;
  email: string;
  hireDate?: Date;
  startHour?: string;
  endHour?: string;
  status: boolean;
  actions?: boolean;
}

export interface ProfessionalGet {
  name: string;
  specialty: string;
  crm: string;
  phone?: string;
  status: boolean;
  actions?: boolean;
}


const professionalSchema = new Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  crm: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: true },
  hireDate: { type: Date, required: false },
  startHour: { type: String, required: false },
  endHour: { type: String, required: false },
  status: { type: Boolean, required: true },
  actions: { type: Boolean, required: false }
});


export const ProfessionalModel = model('Professional', professionalSchema);


