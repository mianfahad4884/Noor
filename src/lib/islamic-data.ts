
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

export async function getSurahList() {
  try {
    const response = await fetch('https://api.alquran.cloud/v1/surah');
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
    
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/${editions.join(',')}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching surah detail:', error);
    return null;
  }
}

export function getHijriDate(date: Date = new Date()) {
  return new Intl.DateTimeFormat('en-u-ca-islamic-uma', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function getHijriMonthName(date: Date = new Date()) {
  return new Intl.DateTimeFormat('en-u-ca-islamic-uma', {
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
  { name: "Ashura", hijriDate: "10 Muharram", description: "Day of fasting and remembrance." },
  { name: "Mawlid al-Nabi", hijriDate: "12 Rabi' al-Awwal", description: "Birth of Prophet Muhammad (ﷺ)." },
  { name: "Isra' and Mi'raj", hijriDate: "27 Rajab", description: "The Night Journey and Ascension." },
  { name: "Ramadan Start", hijriDate: "1 Ramadan", description: "Month of fasting begins." },
  { name: "Laylat al-Qadr", hijriDate: "27 Ramadan", description: "The Night of Power." },
  { name: "Eid al-Fitr", hijriDate: "1 Shawwal", description: "Festival of breaking the fast." },
  { name: "Hajj Season", hijriDate: "8-13 Dhu al-Hijjah", description: "The annual pilgrimage to Makkah." },
  { name: "Day of Arafah", hijriDate: "9 Dhu al-Hijjah", description: "The pinnacle of Hajj." },
  { name: "Eid al-Adha", hijriDate: "10 Dhu al-Hijjah", description: "Festival of Sacrifice." },
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
    id: 21,
    text: "Heaven lies under the feet of mothers.",
    arabic: "الْجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ",
    source: "Sunan an-Nasa'i",
    narrator: "Mu'awiyah bin Jahimah",
    reference: "Hadith 3106",
    grade: "Hasan",
    category: "Parents"
  },
  {
    id: 22,
    text: "A man asked: 'O Messenger of Allah! Who is most deserving of my fine treatment?' He said: 'Your mother, then your mother, then your mother, then your father.'",
    arabic: "يَا رَسُولَ اللَّهِ مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي قَالَ ‏أُمُّكَ‏ ثُمَّ أُمُّكَ ثُمَّ أُمُّكَ ثُمَّ أَبُوكَ",
    source: "Sahih al-Bukhari",
    narrator: "Abu Hurairah",
    reference: "Hadith 5971",
    grade: "Sahih",
    category: "Parents"
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
    id: 3,
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    source: "Sahih al-Bukhari",
    narrator: "Anas bin Malik",
    reference: "Hadith 13",
    grade: "Sahih",
    category: "Faith"
  },
  {
    id: 5,
    text: "Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.",
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    source: "Sahih Muslim",
    narrator: "Abu Hurairah",
    reference: "Hadith 2699",
    grade: "Sahih",
    category: "Knowledge"
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
  { id: 'bn.bengali', name: 'Bengali', flag: '🇧🇩' },
];

export const QURAN_TAFSEERS = [
  { id: 'en.ibnkathir', name: 'Ibn Kathir (English)', author: 'Ibn Kathir', lang: 'English' },
  { id: 'ur.kanzuliman', name: 'Kanzul Iman (Urdu)', author: 'Ahmed Raza Khan', lang: 'Urdu' },
  { id: 'tr.diyanet', name: 'Diyanet (Turkish)', author: 'Diyanet', lang: 'Turkish' },
  { id: 'ar.jalalayn', name: 'Jalalayn (Arabic)', author: 'Al-Siyuti & Al-Mahalli', lang: 'Arabic' },
];
