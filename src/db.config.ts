import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(__dirname, 'data.json');

export interface Professional {
  name: string;
  specialty: string;
  crm: string;
  contact: string;
  email: string;
  status: boolean; // Ativo/Inativo
}

// Função para ler os profissionais do arquivo JSON
export const readProfessionals = (): Promise<Professional[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        reject('Erro ao ler o arquivo.');
      }
      resolve(JSON.parse(data || '[]'));
    });
  });
};

// Função para escrever profissionais no arquivo JSON
export const writeProfessionals = (professionals: Professional[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dataFilePath, JSON.stringify(professionals, null, 2), (err) => {
      if (err) {
        reject('Erro ao salvar o arquivo.');
      }
      resolve();
    });
  });
};
