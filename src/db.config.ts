import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const professionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  crm: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: Boolean, required: true }
});

const ProfessionalModel = mongoose.model('Professional', professionalSchema);

export const connectDB = async () => {
  const mongoURI = process.env['MONGO_URI'];

  if (!mongoURI) {
    console.error("MONGO_URI não está definido no arquivo .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export const readProfessionals = async (): Promise<any[]> => {
  try {
    const professionals = await ProfessionalModel.find();
    return professionals;
  } catch (error:any) {
    throw new Error('Erro ao buscar profissionais: ' + error.message);
  }
};

export const writeProfessional = async (professionalData: any): Promise<void> => {
  try {
    const professional = new ProfessionalModel(professionalData);
    await professional.save();
  } catch (error:any) {
    throw new Error('Erro ao salvar o profissional: ' + error.message);
  }
};
