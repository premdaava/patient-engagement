export async function sendSms(to: string, body: string): Promise<{ success: boolean; sid?: string; error?: string }> {
  // Stub SMS provider integration (e.g. Twilio / Plivo)
  console.log(`[SMS Gateway STUB] Sending to ${to}: "${body}"`);

  if (!to) {
    return { success: false, error: "Recipient phone number is missing." };
  }

  // Simulate network latency / success
  return { success: true, sid: `SM_${Math.random().toString(36).substring(2, 12)}` };
}
