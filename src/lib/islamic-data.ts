
export const UMMAH_API_KEY = 'umh_316473711ce8b29689d2548be3a64eee0f39fb53';
export const UMMAH_SECOND_KEY = 'HeZy5vFwbJb9qwVhrw9gYA752qnAZR8K3hikElZLU9zsRFF9';
export const UMMAH_BASE_URL = 'https://api.alquran.cloud/v1';
export const ALADHAN_BASE_URL = 'https://api.aladhan.com/v1';

export async function getDailyAyah() {
  try {
    const response = await fetch(`${UMMAH_BASE_URL}/ayah/random/editions/quran-uthmani,en.sahih`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching random ayah:', error);
    return null;
  }
}

export async function getSurahList() {
  try {
    const response = await fetch(`${UMMAH_BASE_URL}/surah`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching surah list:', error);
    return [];
  }
}

export async function getSurahDetail(surahNumber: number, edition: string = 'en.sahih', tafseerEdition: string | null = null) {
  try {
    const editions = ['quran-uthmani', edition];
    if (tafseerEdition) editions.push(tafseerEdition);
    
    const response = await fetch(`${UMMAH_BASE_URL}/surah/${surahNumber}/editions/${editions.join(',')}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching surah detail:', error);
    return null;
  }
}

export async function getAyahAudio(ayahNumber: number, edition: string = 'ar.alafasy') {
  try {
    const response = await fetch(`${UMMAH_BASE_URL}/ayah/${ayahNumber}/${edition}`);
    const data = await response.json();
    return data.data.audio;
  } catch (error) {
    console.error('Error fetching ayah audio:', error);
    return null;
  }
}

export async function getPrayerTimes(latitude: number, longitude: number, date: string) {
  try {
    // Format date as DD-MM-YYYY
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    const response = await fetch(`${ALADHAN_BASE_URL}/timings/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=2`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
}

export async function getZakatNisab() {
  try {
    // Note: In a real app, this would hit a live gold/silver rate API
    // Placeholder values representing current approximate rates
    return {
      goldPricePerGram: 65.50, // USD
      silverPricePerGram: 0.85, // USD
      nisabGoldGrams: 87.48,
      nisabSilverGrams: 612.36,
    };
  } catch (error) {
    console.error('Error fetching zakat nisab:', error);
    return null;
  }
}

export async function getAsmaUlHusna() {
  try {
    const response = await fetch(`${ALADHAN_BASE_URL}/asmaAlHusna`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching names of Allah:', error);
    return [];
  }
}

export function getHijriDate(date: Date = new Date()) {
  return new Intl.DateTimeFormat('en-u-ca-islamic-uma', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function getHijriMonthName(date: Date = new Date(), locale: string = 'en') {
  return new Intl.DateTimeFormat(`${locale}-u-ca-islamic-uma`, {
    month: 'long',
  }).format(date);
}

export function getHijriYear(date: Date = new Date()) {
  return new Intl.DateTimeFormat('en-u-ca-islamic-uma', {
    year: 'numeric',
  }).format(date);
}

export interface IslamicEvent {
  name: string;
  hijriDate: string;
  description: string;
}

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  { name: "Islamic New Year", hijriDate: "1 Muharram", description: "Beginning of the Hijri year." },
  { name: "Ashura", hijriDate: "10 Muharram", description: "Day of fasting and remembrance of Prophet Musa (AS)." },
  { name: "Mawlid al-Nabi", hijriDate: "12 Rabi' al-Awwal", description: "Commemoration of the birth of Prophet Muhammad (ﷺ)." },
  { name: "Isra' and Mi'raj", hijriDate: "27 Rajab", description: "The miraculous Night Journey and Ascension." },
  { name: "Ramadan Start", hijriDate: "1 Ramadan", description: "The holy month of fasting begins." },
  { name: "Laylat al-Qadr", hijriDate: "27 Ramadan", description: "The Night of Power, better than a thousand months." },
  { name: "Eid al-Fitr", hijriDate: "1 Shawwal", description: "Festival of breaking the fast." },
  { name: "Hajj Season", hijriDate: "8 Dhu al-Hijjah", description: "The start of the annual pilgrimage to Makkah." },
  { name: "Day of Arafah", hijriDate: "9 Dhu al-Hijjah", description: "The pinnacle day of the Hajj pilgrimage." },
  { name: "Eid al-Adha", hijriDate: "10 Dhu al-Hijjah", description: "Festival of Sacrifice honoring Prophet Ibrahim (AS)." },
];

export interface Hadith {
  id: number;
  text: string;
  arabic?: string;
  source: string;
  narrator: string;
  reference: string;
  grade: 'Sahih' | 'Hasan' | 'Da\'if';
  category: string;
}

export const HADITH_BOOKS = [
  { id: 'bukhari', name: 'Sahih al-Bukhari', author: 'Imam Bukhari', count: '7,563' },
  { id: 'muslim', name: 'Sahih Muslim', author: 'Imam Muslim', count: '3,033' },
  { id: 'tirmidhi', name: 'Jami` at-Tirmidhi', author: 'Imam Tirmidhi', count: '3,956' },
  { id: 'abudawud', name: 'Sunan Abi Dawud', author: 'Imam Abu Dawud', count: '5,274' },
  { id: 'nasai', name: 'Sunan an-Nasa\'i', author: 'Imam an-Nasa\'i', count: '5,758' },
  { id: 'ibnmajah', name: 'Sunan Ibn Majah', author: 'Imam Ibn Majah', count: '4,341' },
];

export const HADITHS: Hadith[] = [
  {
    id: 1,
    text: "Actions are judged by intentions, and every person will get what they intended.",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    source: "Sahih al-Bukhari",
    narrator: "Umar bin Al-Khattab",
    reference: "Hadith 1",
    grade: "Sahih",
    category: "Faith"
  },
  {
    id: 2,
    text: "The best among you are those who have the best manners and character.",
    arabic: "خِيَارُكُمْ أَحْسَنُكُمْ أَخْلاَقًا",
    source: "Sahih al-Bukhari",
    narrator: "Abdullah ibn Amr",
    reference: "Hadith 6035",
    grade: "Sahih",
    category: "Character"
  },
  {
    id: 4,
    text: "The Prophet (ﷺ) said, 'The most beloved of deeds to Allah are those that are most consistent, even if they are small.'",
    arabic: "أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
    source: "Sahih al-Bukhari",
    narrator: "Aisha (RA)",
    reference: "Hadith 6465",
    grade: "Sahih",
    category: "Consistency"
  },
  {
    id: 21,
    text: "Heaven lies under the feet of mothers.",
    arabic: "الْجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ",
    source: "Sunan an-Nasa'i",
    narrator: "Mu'awiyah bin Jahimah",
    reference: "Hadith 3106",
    grade: "Hasan",
    category: "Parents"
  }
];

export function getRandomHadith() {
  return HADITHS[Math.floor(Math.random() * HADITHS.length)];
}

export const QURAN_EDITIONS = [
  { id: 'en.sahih', name: 'English (Sahih Int.)', flag: '🇺🇸' },
  { id: 'ur.ahmedali', name: 'Urdu (Ahmed Ali)', flag: '🇵🇰' },
  { id: 'tr.diyanet', name: 'Turkish (Diyanet)', flag: '🇹🇷' },
  { id: 'id.indonesian', name: 'Indonesian', flag: '🇮🇩' },
  { id: 'fr.hamidullah', name: 'French (Hamidullah)', flag: '🇫🇷' },
  { id: 'de.aburida', name: 'German (Abu Rida)', flag: '🇩🇪' },
  { id: 'bn.bengali', name: 'Bengali', flag: '🇧🇩' },
];

export const QURAN_TAFSEERS = [
  { id: 'en.ibnkathir', name: 'Ibn Kathir', author: 'Ibn Kathir', lang: 'English' },
  { id: 'ar.jalalayn', name: 'Jalalayn', author: 'Al-Siyuti & Al-Mahalli', lang: 'Arabic' },
  { id: 'ar.muyassar', name: 'Al-Muyassar', author: 'Muyassar', lang: 'Arabic' },
  { id: 'ur.kanzuliman', name: 'Kanzul Iman', author: 'Ahmed Raza Khan', lang: 'Urdu' },
];

export const QURAN_RECITERS = [
  { id: 'ar.alafasy', name: 'Mishary Alafasy' },
  { id: 'ar.sudais', name: 'Abdurrahman Sudais' },
  { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)' },
  { id: 'ar.minshawi', name: 'Muhammad Al-Minshawi' },
  { id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary' },
  { id: 'ar.shuraym', name: 'Saud Al-Shuraim' },
  { id: 'ar.saoodshuraym', name: 'Saud Al-Shuraim' },
  { id: 'ar.hanirifai', name: 'Hani ar-Rifai' },
];
