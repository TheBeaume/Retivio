export function openWhatsApp(phone, message) {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);

  window.open(
    `https://wa.me/91${cleanPhone}?text=${encodedMessage}`,
    "_blank"
  );
}
