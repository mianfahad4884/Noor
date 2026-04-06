
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
  // Faith & Intentions
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
  // Parents & Mothers
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
    id: 23,
    text: "The pleasure of the Lord is in the pleasure of the parents, and the displeasure of the Lord is in the displeasure of the parents.",
    arabic: "رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ وَسُخْطُ الرَّبِّ فِي سُخْطِ الْوَالِدِ",
    source: "Jami` at-Tirmidhi",
    narrator: "Abdullah bin Amr",
    reference: "Hadith 1899",
    grade: "Sahih",
    category: "Parents"
  },
  // Character & Manners
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
  // Knowledge
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
    id: 13,
    text: "Seeking knowledge is an obligation upon every Muslim.",
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    source: "Sunan Ibn Majah",
    narrator: "Anas bin Malik",
    reference: "Hadith 224",
    grade: "Sahih",
    category: "Knowledge"
  },
  // Mercy & Social
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
    id: 18,
    text: "The parable of the believers in their mutual love, mercy and compassion is that of a body; when any limb aches, the whole body reacts with sleeplessness and fever.",
    arabic: "مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى",
    source: "Sahih Muslim",
    narrator: "Nu'man bin Bashir",
    reference: "Hadith 2586",
    grade: "Sahih",
    category: "Social"
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
