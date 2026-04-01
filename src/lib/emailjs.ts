interface ContactEmailPayload {
  fullName: string;
  email: string;
  whatsapp?: string;
  message: string;
}

function getEmailJsConfig() {
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
  };
}

export async function sendContactNotification(payload: ContactEmailPayload) {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS is not configured. Missing service/template/public key.');
  }

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        full_name: payload.fullName,
        email: payload.email,
        whatsapp: payload.whatsapp || 'Not provided',
        message: payload.message,
        submitted_at: new Date().toISOString(),
      },
    }),
  });

  if (!response.ok) {
    const raw = await response.text();
    throw new Error(`EmailJS request failed: ${raw}`);
  }
}
