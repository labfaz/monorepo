import { api } from '.';

interface ResendEmailProps {
  status: string;
  code: number;
  data: {
    message: string;
  };
}

export const ResendEmail = (email: string) =>
  api
    .post<ResendEmailProps>('user/confirm-mail', { email })
    .then(({ data }) => data)
    .then(({ data }) => data.message);
