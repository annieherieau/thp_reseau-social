
export default function toHomePage() {
  const basename = import.meta.env.VITE_BASENAME;
  window.location.replace(`${basename}/`);
}
