
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

export async function getSurahDetail(surahNumber: number, edition: string = 'en.sahih') {
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,${edition}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching surah detail:', error);
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

export const HADITHS: Hadith[] = [
  {
    id: 1,
    text: "Actions are judged by intentions, and every person will get what they intended.",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    source: "Sahih Bukhari",
    narrator: "Umar bin Al-Khattab",
    reference: "Book 1, Hadith 1",
    grade: "Sahih",
    category: "Faith"
  },
  {
    id: 2,
    text: "The best among you are those who have the best manners and character.",
    arabic: "خِيَارُكُمْ أَحْسَنُكُمْ أَخْلاَقًا",
    source: "Sahih Bukhari",
    narrator: "Abdullah ibn Amr",
    reference: "Book 78, Hadith 61",
    grade: "Sahih",
    category: "Character"
  },
  {
    id: 3,
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    source: "Sahih Bukhari",
    narrator: "Anas bin Malik",
    reference: "Book 2, Hadith 6",
    grade: "Sahih",
    category: "Faith"
  },
  {
    id: 4,
    text: "Allah does not look at your appearances or your wealth, but He looks at your hearts and your actions.",
    arabic: "إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
    source: "Sahih Muslim",
    narrator: "Abu Hurairah",
    reference: "Book 45, Hadith 43",
    grade: "Sahih",
    category: "Sincerity"
  },
  {
    id: 5,
    text: "Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.",
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    source: "Sahih Muslim",
    narrator: "Abu Hurairah",
    reference: "Book 35, Hadith 48",
    grade: "Sahih",
    category: "Knowledge"
  },
  {
    id: 6,
    text: "Cleanliness is half of faith.",
    arabic: "الطَّهُورُ شَطْرُ الإِيمَانِ",
    source: "Sahih Muslim",
    narrator: "Abu Malik al-Ash'ari",
    reference: "Book 2, Hadith 1",
    grade: "Sahih",
    category: "Purity"
  },
  {
    id: 7,
    text: "Be in this world as if you were a stranger or a traveler.",
    arabic: "كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ",
    source: "Sahih Bukhari",
    narrator: "Ibn Umar",
    reference: "Book 81, Hadith 5",
    grade: "Sahih",
    category: "Spirituality"
  },
  {
    id: 8,
    text: "A Muslim is one from whose tongue and hands the Muslims are safe.",
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    source: "Sahih Bukhari",
    narrator: "Abdullah ibn Amr",
    reference: "Book 2, Hadith 10",
    grade: "Sahih",
    category: "Social"
  },
  {
    id: 9,
    text: "The most beloved of deeds to Allah are those that are most consistent, even if they are small.",
    arabic: "أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
    source: "Sahih Bukhari",
    narrator: "Aisha (RA)",
    reference: "Book 81, Hadith 21",
    grade: "Sahih",
    category: "Consistency"
  },
  {
    id: 10,
    text: "Verily, Allah is Kind and He loves kindness in all matters.",
    arabic: "إِنَّ اللَّهَ رَفِيقٌ يُحِبُّ الرِّفْقَ فِي الأَمْرِ كُلِّهِ",
    source: "Sahih Bukhari",
    narrator: "Aisha (RA)",
    reference: "Book 88, Hadith 2",
    grade: "Sahih",
    category: "Mercy"
  },
  {
    id: 11,
    text: "He who does not show mercy to our young and honor our old is not one of us.",
    arabic: "لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَيَعْرِفْ شَرَفَ كَبِيرِنَا",
    source: "Sunan Tirmidhi",
    narrator: "Abdullah ibn Amr",
    reference: "Hadith 1919",
    grade: "Hasan",
    category: "Character"
  },
  {
    id: 12,
    text: "The signs of a hypocrite are three: whenever he speaks, he tells a lie; whenever he promises, he breaks it; and whenever he is entrusted, he betrays that trust.",
    arabic: "آيَةُ الْمُنَافِقِ ثَلاَثٌ إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ",
    source: "Sahih Bukhari",
    narrator: "Abu Hurairah",
    reference: "Book 2, Hadith 33",
    grade: "Sahih",
    category: "Faith"
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
  { id: 'fa.ansarian', name: 'Farsi (Ansarian)', flag: '🇮🇷' },
  { id: 'ms.basmeih', name: 'Malay (Basmeih)', flag: '🇲🇾' },
  { id: 'fr.hamidullah', name: 'French (Hamidullah)', flag: '🇫🇷' },
  { id: 'ru.kuliev', name: 'Russian (Kuliev)', flag: '🇷🇺' },
  { id: 'uz.sodik', name: 'Uzbek (Sodik)', flag: '🇺🇿' },
];
