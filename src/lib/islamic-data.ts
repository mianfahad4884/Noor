
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
    text: "Religion is easy, and no one overburdens himself in religion except that it will overcome him. So be moderate and follow the middle path.",
    arabic: "إِنَّ الدِّينَ يُسْرٌ ، وَلَنْ يُشَادَّ الدِّينَ أَحَدٌ إِلاَّ غَلَبَهُ ، فَسَدِّدُوا وَقَارِبُوا",
    source: "Sahih Bukhari",
    narrator: "Abu Hurairah",
    reference: "Book 2, Hadith 32",
    grade: "Sahih",
    category: "Moderation"
  },
  {
    id: 8,
    text: "The merciful will be shown mercy by the Most Merciful. Be merciful to those on the earth and the One in the heavens will have mercy upon you.",
    arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
    source: "Sunan Abi Dawud",
    narrator: "Abdullah ibn Amr",
    reference: "Hadith 4941",
    grade: "Sahih",
    category: "Mercy"
  },
  {
    id: 9,
    text: "The strongest among you is not the one who can wrestle, but the one who can control his anger.",
    arabic: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
    source: "Sahih Bukhari",
    narrator: "Abu Hurairah",
    reference: "Book 78, Hadith 141",
    grade: "Sahih",
    category: "Character"
  },
  {
    id: 10,
    text: "Allah is Beautiful and He loves beauty.",
    arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
    source: "Sahih Muslim",
    narrator: "Abdullah ibn Mas'ud",
    reference: "Book 1, Hadith 172",
    grade: "Sahih",
    category: "Spirituality"
  },
  {
    id: 11,
    text: "The most beloved of people to Allah is the one who brings most benefit to people.",
    arabic: "أَحَبُّ النَّاسِ إِلَى اللَّهِ أَنْفَعُهُمْ لِلنَّاسِ",
    source: "Jami` at-Tirmidhi",
    narrator: "Ibn Umar",
    reference: "Hadith 1565",
    grade: "Hasan",
    category: "Social"
  },
  {
    id: 12,
    text: "Modesty is part of faith.",
    arabic: "الْحَيَاءُ مِنَ الإِيمَانِ",
    source: "Sahih Bukhari",
    narrator: "Abu Hurairah",
    reference: "Book 2, Hadith 2",
    grade: "Sahih",
    category: "Character"
  },
  {
    id: 13,
    text: "Take advantage of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your busy-ness, and your life before your death.",
    arabic: "اغْتَنِمْ خَمْسًا قَبْلَ خَمْسٍ",
    source: "Sunan an-Nasa'i",
    narrator: "Ibn Abbas",
    reference: "Hadith 586",
    grade: "Sahih",
    category: "Spirituality"
  },
  {
    id: 14,
    text: "Seeking knowledge is an obligation upon every Muslim.",
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    source: "Sunan Ibn Majah",
    narrator: "Anas bin Malik",
    reference: "Book 1, Hadith 224",
    grade: "Sahih",
    category: "Knowledge"
  },
  {
    id: 15,
    text: "The world is a prison for the believer and a paradise for the disbeliever.",
    arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ",
    source: "Sahih Muslim",
    narrator: "Abu Hurairah",
    reference: "Book 42, Hadith 7058",
    grade: "Sahih",
    category: "Spirituality"
  },
  {
    id: 16,
    text: "The sign of a person's being a good Muslim is that he should leave alone that which does not concern him.",
    arabic: "مِنْ حُسْنِ إِسْلاَمِ الْمَرْءِ تَرْكُهُ مَا لاَ يَعْنِيهِ",
    source: "Sunan Tirmidhi",
    narrator: "Abu Hurairah",
    reference: "Hadith 2317",
    grade: "Hasan",
    category: "Character"
  },
  {
    id: 17,
    text: "A kind word is a form of charity.",
    arabic: "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
    source: "Sahih Bukhari",
    narrator: "Abu Hurairah",
    reference: "Book 56, Hadith 101",
    grade: "Sahih",
    category: "Character"
  },
  {
    id: 18,
    text: "Richness is not having many possessions, but richness is being content with oneself.",
    arabic: "لَيْسَ الْغِنَى عَنْ كَثْرَةِ الْعَرَضِ، وَلَكِنَّ الْغِنَى غِنَى النَّفْسِ",
    source: "Sahih Bukhari",
    narrator: "Abu Hurairah",
    reference: "Book 81, Hadith 35",
    grade: "Sahih",
    category: "Spirituality"
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

export const QURAN_TAFSEERS = [
  { id: 'en.ibnkathir', name: 'Ibn Kathir (English)', author: 'Ibn Kathir' },
  { id: 'ar.jalalayn', name: 'Jalalayn (Arabic)', author: 'Al-Siyuti & Al-Mahalli' },
  { id: 'ar.muyassar', name: 'Al-Muyassar (Arabic)', author: 'Various' },
];
