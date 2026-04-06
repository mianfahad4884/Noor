
export async function getDailyAyah() {
  try {
    const response = await fetch('https://api.alquran.cloud/v1/ayah/random/editions/quran-uthmani,en.sahih');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching random ayah:', error);
    return null;
  }
}

export function getHijriDate() {
  return new Intl.DateTimeFormat('en-u-ca-islamic-uma', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());
}

export const HADITHS = [
  {
    text: "Actions are judged by intentions, and every person will get what they intended.",
    source: "Sahih Bukhari",
    narrator: "Umar bin Al-Khattab"
  },
  {
    text: "The best among you are those who have the best manners and character.",
    source: "Sahih Bukhari",
    narrator: "Abdullah ibn Amr"
  },
  {
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    source: "Sahih Bukhari",
    narrator: "Anas bin Malik"
  }
];

export function getRandomHadith() {
  return HADITHS[Math.floor(Math.random() * HADITHS.length)];
}
