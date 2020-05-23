import Mail from '../../lib/Mail';

interface IHandle {
  to: string;
  token: string;
}

class PasswordRecovery {
  get key(): string {
    return 'PasswordRecovery';
  }

  async handle({ to, token }: IHandle): Promise<void> {
    console.log('a fila executou');

    await Mail.sendMail({
      to,
      token,
      subject: 'Recuperação de senha',
      template: 'PasswordRecovery',
    });
  }
}

export default new PasswordRecovery();
