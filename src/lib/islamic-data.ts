
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
  { name: "Islamic New Year", hijriDate: "1 Muharram", description: "Beginning of the Hijri year 1447." },
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
    id: 5,
    text: "Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.",
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    source: "Sahih Muslim",
    narrator: "Abu Hurairah",
    reference: "Hadith 2699",
    grade: "Sahih",
    category: "Knowledge"
  },
  {
    id: 6,
    text: "Cleanliness is half of faith.",
    arabic: "الطُّهُورُ شَطْرُ الإِيمَانِ",
    source: "Sahih Muslim",
    narrator: "Abu Malik al-Ash'ari",
    reference: "Hadith 223",
    grade: "Sahih",
    category: "Purity"
  },
  {
    id: 7,
    text: "The powerful man is not the one who can wrestle, but the one who can control himself in a fit of anger.",
    arabic: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
    source: "Sahih al-Bukhari",
    narrator: "Abu Hurairah",
    reference: "Hadith 6114",
    grade: "Sahih",
    category: "Character"
  },
  {
    id: 8,
    text: "A true Muslim is one from whose tongue and hand other Muslims are safe.",
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    source: "Sahih al-Bukhari",
    narrator: "Abdullah bin Amr",
    reference: "Hadith 10",
    grade: "Sahih",
    category: "Brotherhood"
  },
  {
    id: 9,
    text: "Allah does not look at your appearances or your wealth, but He looks at your hearts and your actions.",
    arabic: "إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
    source: "Sahih Muslim",
    narrator: "Abu Hurairah",
    reference: "Hadith 2564",
    grade: "Sahih",
    category: "Spirituality"
  },
  {
    id: 10,
    text: "Be in this world as if you were a stranger or a traveler.",
    arabic: "كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ",
    source: "Sahih al-Bukhari",
    narrator: "Ibn Umar",
    reference: "Hadith 6416",
    grade: "Sahih",
    category: "Worldliness"
  },
  {
    id: 11,
    text: "The seeking of knowledge is obligatory for every Muslim.",
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    source: "Sunan Ibn Majah",
    narrator: "Anas bin Malik",
    reference: "Hadith 224",
    grade: "Sahih",
    category: "Knowledge"
  },
  {
    id: 12,
    text: "Every religion has a distinct characteristic, and the characteristic of Islam is modesty (Haya).",
    arabic: "إِنَّ لِكُلِّ دِينٍ خُلُقًا وَخُلُقُ الإِسْلاَمِ الْحَيَاءُ",
    source: "Sunan Ibn Majah",
    narrator: "Anas bin Malik",
    reference: "Hadith 4181",
    grade: "Hasan",
    category: "Character"
  },
  {
    id: 13,
    text: "He is not a believer whose stomach is filled while his neighbor goes hungry.",
    arabic: "لَيْسَ الْمُؤْمِنُ بِالَّذِي يَشْبَعُ وَجَارُهُ جَائِعٌ إِلَى جَنْبِهِ",
    source: "Al-Adab Al-Mufrad",
    narrator: "Ibn Abbas",
    reference: "Hadith 112",
    grade: "Sahih",
    category: "Community"
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
