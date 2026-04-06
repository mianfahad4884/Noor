
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
  // Sahih al-Bukhari
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
    text: "Verily, Allah does not look at your appearances or your wealth, but He looks at your hearts and your actions.",
    arabic: "إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
    source: "Sahih Muslim",
    narrator: "Abu Hurairah",
    reference: "Hadith 2564",
    grade: "Sahih",
    category: "Sincerity"
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
    arabic: "الطَّهُورُ شَطْرُ الإِيمَانِ",
    source: "Sahih Muslim",
    narrator: "Abu Malik al-Ash'ari",
    reference: "Hadith 223",
    grade: "Sahih",
    category: "Purity"
  },
  // Sunan Abi Dawud
  {
    id: 7,
    text: "The merciful will be shown mercy by the Most Merciful. Be merciful to those on the earth and the One in the heavens will have mercy upon you.",
    arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
    source: "Sunan Abi Dawud",
    narrator: "Abdullah ibn Amr",
    reference: "Hadith 4941",
    grade: "Sahih",
    category: "Mercy"
  },
  {
    id: 8,
    text: "A believer is not one who eats his fill while his neighbor beside him goes hungry.",
    arabic: "لَيْسَ الْمُؤْمِنُ الَّذِي يَشْبَعُ وَجَارُهُ جَائِعٌ إِلَى جَنْبِهِ",
    source: "Sunan Abi Dawud",
    narrator: "Ibn Abbas",
    reference: "Hadith 3501",
    grade: "Sahih",
    category: "Social"
  },
  // Jami` at-Tirmidhi
  {
    id: 9,
    text: "Fear Allah wherever you are, follow up a bad deed with a good deed and it will wipe it out, and behave well towards people.",
    arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
    source: "Jami` at-Tirmidhi",
    narrator: "Abu Dharr",
    reference: "Hadith 1987",
    grade: "Hasan",
    category: "Character"
  },
  {
    id: 10,
    text: "He who does not show mercy to our young ones or recognize the rights of our elders is not one of us.",
    arabic: "لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَيَعْرِفْ شَرَفَ كَبِيرَنَا",
    source: "Jami` at-Tirmidhi",
    narrator: "Abdullah ibn Amr",
    reference: "Hadith 1920",
    grade: "Sahih",
    category: "Social"
  },
  // Sunan an-Nasa'i
  {
    id: 11,
    text: "Islam is built on five: Testifying that there is no god but Allah and Muhammad is the Messenger of Allah...",
    arabic: "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
    source: "Sunan an-Nasa'i",
    narrator: "Ibn Umar",
    reference: "Hadith 5001",
    grade: "Sahih",
    category: "Faith"
  },
  {
    id: 12,
    text: "The prayer of one who is in a state of impurity is not accepted until he performs ablution.",
    arabic: "لَا تُقْبَلُ صَلَاةٌ بِغَيْرِ طُهُورٍ",
    source: "Sunan an-Nasa'i",
    narrator: "Abu Hurairah",
    reference: "Hadith 139",
    grade: "Sahih",
    category: "Purity"
  },
  // Sunan Ibn Majah
  {
    id: 13,
    text: "Seeking knowledge is an obligation upon every Muslim.",
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    source: "Sunan Ibn Majah",
    narrator: "Anas bin Malik",
    reference: "Hadith 224",
    grade: "Sahih",
    category: "Knowledge"
  },
  {
    id: 14,
    text: "Two characteristics are never found together in a believer: Misery and bad manners.",
    arabic: "خَصْلَتَانِ لَا تَجْتَمِعَانِ فِي مُؤْمِنٍ الْبُخْلُ وَسُوءُ الْخُلُقِ",
    source: "Sunan Ibn Majah",
    narrator: "Abu Hurairah",
    reference: "Hadith 3979",
    grade: "Hasan",
    category: "Character"
  },
  {
    id: 15,
    text: "Allah is Beautiful and He loves beauty.",
    arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
    source: "Sahih Muslim",
    narrator: "Abdullah ibn Mas'ud",
    reference: "Hadith 172",
    grade: "Sahih",
    category: "Spirituality"
  },
  {
    id: 16,
    text: "The most beloved of deeds to Allah are those that are most consistent, even if they are small.",
    arabic: "أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
    source: "Sahih al-Bukhari",
    narrator: "Aisha",
    reference: "Hadith 6465",
    grade: "Sahih",
    category: "Worship"
  },
  {
    id: 17,
    text: "A Muslim is the one from whose tongue and hands the Muslims are safe.",
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    source: "Sahih al-Bukhari",
    narrator: "Abdullah bin Amr",
    reference: "Hadith 10",
    grade: "Sahih",
    category: "Social"
  },
  {
    id: 18,
    text: "The parable of the believers in their mutual love, mercy and compassion is that of a body; when any limb aches, the whole body reacts with sleeplessness and fever.",
    arabic: "مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى",
    source: "Sahih Muslim",
    narrator: "Nu'man bin Bashir",
    reference: "Hadith 2586",
    grade: "Sahih",
    category: "Social"
  },
  {
    id: 19,
    text: "Every religion has a character and the character of Islam is modesty (Haya).",
    arabic: "إِنَّ لِكُلِّ دِينٍ خُلُقًا وَخُلُقُ الإِسْلاَمِ الْحَيَاءُ",
    source: "Sunan Ibn Majah",
    narrator: "Anas bin Malik",
    reference: "Hadith 4181",
    grade: "Hasan",
    category: "Character"
  },
  {
    id: 20,
    text: "Whoever believes in Allah and the Last Day, let him speak good or remain silent.",
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    source: "Sahih al-Bukhari",
    narrator: "Abu Hurairah",
    reference: "Hadith 6018",
    grade: "Sahih",
    category: "Character"
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
