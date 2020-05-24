import Mail from '../../lib/Mail';

interface IHandle {
  to: string;
  token: string;
  name: string;
}

class PasswordRecovery {
  get key(): string {
    return 'PasswordRecovery';
  }

  async handle({ to, token, name }: IHandle): Promise<void> {
    await Mail.sendMail({
      to,
      name,
      token,
      subject: 'Recuperação de senha',
      template: 'PasswordRecovery',
      context: {
        to,
        token,
        name,
      },
    });
  }
}

export default new PasswordRecovery();
