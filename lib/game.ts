export function getKrishnaTitle(score: number) {
  if (score >= 20) return "Maha Makhan Chor";
  if (score >= 15) return "Makhan Chor";
  if (score >= 10) return "Natkhat Kanha";
  if (score >= 5) return "Nandlal";

  return "Bal Gopal";
}