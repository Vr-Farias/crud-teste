import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ProfessionalModel, ProfessionalGet } from './src/app/models/professionals.model'

dotenv.config()

const connectDB = async() => {
  try {
    await mongoose.connect(process.env['MONGODB_URI'] || '');
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Sair do processo se a conexão falhar
  }
};



// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  server.get('/api/professionals', async (req, res) => {
    try {
      const professionals = await ProfessionalModel.find();
      const result: ProfessionalGet[] = professionals.map(professional => ({
        name: professional.name,
        specialty: professional.specialty,
        crm: professional.crm,
        phone: professional.phone ?? undefined, // Transformar null em undefined
        status: professional.status,
        actions: professional.actions ?? undefined, // Transformar null em undefined
      }));
      res.json(result);
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error);
      res.status(500).send('Erro ao buscar profissionais');
    }
  });

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['SSR_PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
