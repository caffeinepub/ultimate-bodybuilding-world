/**
 * Single source of truth for approved contact phone numbers.
 * Only these numbers should be used throughout the application.
 */

export const CONTACT_NUMBERS = {
  massage: {
    display: '+91 8652320325',
    tel: '+918652320325',
    whatsapp: '918652320325',
  },
} as const;

/**
 * Generate a tel: link for phone calls
 */
export function getTelLink(type: 'massage'): string {
  return `tel:${CONTACT_NUMBERS[type].tel}`;
}

/**
 * Generate a WhatsApp link with optional pre-filled message
 */
export function getWhatsAppLink(type: 'massage', message?: string): string {
  const number = CONTACT_NUMBERS[type].whatsapp;
  if (message) {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }
  return `https://wa.me/${number}`;
}

/**
 * Get display-formatted phone number
 */
export function getDisplayNumber(type: 'massage'): string {
  return CONTACT_NUMBERS[type].display;
}
