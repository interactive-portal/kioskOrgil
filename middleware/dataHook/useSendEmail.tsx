import { useToggle } from "react-use";

export default function useSendEmail() {
  const [isProcessWorking, setIsProcessWorking] = useToggle(false);

  const sendEmail = async ({
    to,
    subject,
    text,
    cc,
    bc,
    replyTo
  }: {
    to: string,
    subject: string,
    text: string,
    cc?: string,
    bc?: string,
    replyTo?: string
  }) => {
    setIsProcessWorking(true);

    const emailData = {
      to,
      subject,
      text,
      cc, bc, replyTo,
    };

    try {
      const response = await fetch('/api/send-email-v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email:', await response.json());
      }
    } catch (error) {
      console.error('Network error:', error);
      setIsProcessWorking(false);
    } finally {
      setIsProcessWorking(false);
    }
  };
  return { sendEmail, isProcessWorking };
}
