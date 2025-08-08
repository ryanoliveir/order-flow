export interface Order {
  id: string;
  studentName: string;
  orderType: string;
  details: string;
  status: string;
  createdAt: Date | string;
}


export interface OrderRaw {
    request_ID: string;
    nome_aluno: string;
    matricula: string;
    opcao: string;
    horario: Date;
    data: Date
}