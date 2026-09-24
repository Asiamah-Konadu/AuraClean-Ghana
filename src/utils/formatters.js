// Utilities for AuraClean Ghana

export const WHATSAPP_NUMBER = '233548877173';
export const DISPLAY_PHONE = '054 887 7173';
export const DISPLAY_PHONE_INTL = '+233 54 887 7173';
export const COMPANY_EMAIL = 'info@auraclean.gh';
export const COMPANY_LOCATION = 'East Legon, Accra - Ghana';

export const formatGHS = (amount) => {
  return `GH₵ ${Number(amount || 0).toLocaleString('en-GH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
};

export const getWhatsAppLink = (message = '') => {
  const defaultMsg = 'Hello AuraClean Ghana! I would like to inquire about booking a cleaning service.';
  const text = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};
