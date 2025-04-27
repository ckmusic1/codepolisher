export class AIInstance {
  ask(question: string): string {
    return question;
 }

  static definePrompt({
      prompt,
  }: {
      prompt: string;
  }): string {
      return prompt;
  }

  static defineFlow({
      prompt,
  }: {
      prompt: string;
  }): (input: string) => { question: string } {
      return (input: string): string => {
          return { question : input };
      };
  }
}
