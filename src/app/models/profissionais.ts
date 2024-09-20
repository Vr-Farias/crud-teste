export interface Profissional {
  id?: number;
  name: string;
  specialty: string;
  crm: string;
  phone?: string;
  email?: string;
  hireDate?: Date;
  startHour?: string;
  endHour?: string;
  status: boolean;
  actions?: boolean;
}

