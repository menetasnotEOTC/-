
import { UIContent, Scholar, SacredBook, Language } from './types';

export const UI_STRINGS: Record<Language, UIContent> = {
  en: {
    title: "Road to Damascus / RTD",
    subtitle: "Digital Deacon: Defending the Tewahedo Faith with Wisdom",
    chatPlaceholder: "Ask your Digital Deacon about EOTC dogma, history, or Church Fathers...",
    send: "Send",
    scholars: "Orthodox Scholars",
    books: "Sacred Texts",
    activeScholars: "Active Scholars",
    chat: "Apologetics Chat",
    learnMore: "Learn More",
    resetChat: "Clear Chat",
    switchLang: "አማርኛ",
    aiThinking: "Consulting sacred tradition...",
    missionStatement: "Our mission is to explain and defend the Ethiopian Orthodox Tewahedo faith, honoring our sister Oriental Orthodox churches.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contactScholar: "Contact Scholar",
    copyright: "Designed for the spiritual edification of the Orthodox faithful.",
    machineTranslated: "Machine Translated",
    calendar: "Church Calendar",
    majorObservances: "Major Observances (2026)",
    spiritualGuidance: "Spiritual Guidance",
    spiritualGuidanceDesc: "The Ethiopian Orthodox Tewahedo Church follows a unique calendar with 13 months. Fasting is a cornerstone of our spiritual life, with over 250 days of fasting annually for the devout.",
    feast: "Feast",
    fast: "Fast",
    listen: "Listen to Deacon",
    stop: "Stop Voice",
    voice: "Deacon Voice",
    autoSpeak: "Auto-Speak Answers",
    speed: "Speech Speed",
    sourceLabel: "Sacred Source / Reference",
    generatingAudio: "Preparing liturgical voice...",
  },
  am: {
    title: "በደማስቆ መንገድ / RTD",
    subtitle: "ዲጂታል ዲያቆን፡ የተዋሕዶ እምነትን በጥበብ መከላከል",
    chatPlaceholder: "ስለ ኢ/ኦ/ተ/ቤ ዶግማ፣ ታሪክ ወይም አባቶች ዲጂታል ዲያቆኑን ይጠይቁ...",
    send: "ላክ",
    scholars: "ሊቃውንተ ቤተክርስቲያን",
    books: "ቅዱሳት መጻሕፍት",
    activeScholars: "ወቅታዊ ሊቃውንት",
    chat: "የውይይት ማዕከል",
    learnMore: "ተጨማሪ ያንብቡ",
    resetChat: "ውይይቱን አጥፋ",
    switchLang: "Afaan Oromoo",
    aiThinking: "ከቅዱስ ትውፊት በመነሳት በማሰብ ላይ ነው...",
    missionStatement: "ተልዕኳችን የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ እምነትን ማስረዳትና መከላከል ሲሆን፣ ለሌሎች አኃት ኦሪየንታል ኦርቶዶክስ አብያተ ክርስቲያናትም እውቅና እንሰጣለን።",
    privacyPolicy: "የግላዊነት ፖሊሲ",
    termsOfService: "የአጠቃቀም ደንቦች",
    contactScholar: "ሊቃውንቱን ያግኙ",
    copyright: "ለኦርቶዶክስ ምእመናን መንፈሳዊ እድገት የተዘጋጀ።",
    machineTranslated: "በማሽን የተተረጎመ",
    calendar: "የቤተክርስቲያን የቀን መቁጠሪያ",
    majorObservances: "ዋና ዋና በዓላትና አጽዋማት (2018 ዓ.ም)",
    spiritualGuidance: "መንፈሳዊ መመሪያ",
    spiritualGuidanceDesc: "የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን 13 ወራት ያሉት የራሷ የሆነ የቀን መቁጠሪያ ትከተላለች። ጾም ለመንፈሳዊ ሕይወታችን መሰረት ሲሆን፣ ለጠንካራ ምእመናን በዓመት ውስጥ ከ250 በላይ የጾም ቀናት አሉ።",
    feast: "በዓል",
    fast: "ጾም",
    listen: "የዲያቆኑን ድምፅ ያዳምጡ",
    stop: "ድምፅ አቁም",
    voice: "የዲያቆን ድምፅ",
    autoSpeak: "በራስ-ሰር ድምፅ አንብብ",
    speed: "የንግግር ፍጥነት",
    sourceLabel: "ቅዱስ ምንጭ / ዋቢ መጽሐፍ",
    generatingAudio: "የተቀደሰ ድምፅ በመዘጋጀት ላይ...",
  },
  om: {
    title: "Karaa Damasqoo / RTD",
    subtitle: "Diyaaqonii Diijitaalaa: Amantaa Tawaahidoo Ogummaan Ittisuu",
    chatPlaceholder: "Waa'ee dogmaa, seenaa, ykn Abbootii Mana Kiristaanaa EOTC Diyaaqonii Diijitaalaa gaafadhu...",
    send: "Ergi",
    scholars: "Hayyoota Ortodoksii",
    books: "Barreeffamoota Qulqulluu",
    activeScholars: "Hayyoota Ammee",
    chat: "Haasawa Apoloojetikii",
    learnMore: "Dabalataan Dubbisi",
    resetChat: "Haasawa Haqi",
    switchLang: "ትግርኛ",
    aiThinking: "Aadaa qulqulluu irratti hundaa'uun yaadaa jira...",
    missionStatement: "Ergama keenya amantaa Ortodoksii Tawaahidoo Itoophiyaa ibsuu fi ittisuu, akkasumas manneen kiristaanaa obboloota keenyaa kabajuudha.",
    privacyPolicy: "Imaammata Dhuunfaa",
    termsOfService: "Tajaajila Seeraa",
    contactScholar: "Hayyoota Quunnamaa",
    copyright: "Guddina hafuuraa amantoota Ortodoksiitiif kan qophaa'e.",
    machineTranslated: "Maashiniin Kan Hiikame",
    calendar: "Kaalandara Mana Kiristaanaa",
    majorObservances: "Ayyaanota Gurguddoo (2026)",
    spiritualGuidance: "Qajeelfama Hafuuraa",
    spiritualGuidanceDesc: "Manni Kiristaanaa Ortodoksii Tawaahidoo Itoophiyaa kaalandara addaa ji'oota 13 qabu hordofti. Soumni utubaa jireenya hafuuraa keenyaati.",
    feast: "Ayyaana",
    fast: "Sooma",
    listen: "Sagalee Diyaaqonii Dhaggeeffadhu",
    stop: "Sagalee Dhaabi",
    voice: "Sagalee Diyaaqonii",
    autoSpeak: "Ofiin Dubbisi",
    speed: "Saffisa Sagalee",
    sourceLabel: "Madda Qulqulluu / Barreeffama",
    generatingAudio: "Sagaleen qophaa'aa jira...",
  },
  ti: {
    title: "መንገዲ ደማስቆ / RTD",
    subtitle: "ዲጂታል ዲያቆን፡ እምነት ተዋህዶ ብጥበብ ምክልኻል",
    chatPlaceholder: "ብዛዕባ ዶግማ፣ ታሪክ ወይ ኣቦታት ቤተ ክርስቲያን ኢ/ኦ/ተ/ቤ ንዲጂታል ዲያቆን ሕተቱ...",
    send: "ልኣኽ",
    scholars: "ሊቃውንቲ ኦርቶዶክስ",
    books: "ቅዱሳት መጻሕፍቲ",
    activeScholars: "ህሉዋት ሊቃውንቲ",
    chat: "ማእከል ዕላል",
    learnMore: "ተወሳኺ ኣንብብ",
    resetChat: "ዕላል ኣጥፍእ",
    switchLang: "Soomaali",
    aiThinking: "ካብ ቅዱስ ትውፊት ብምብጋስ ይሓስብ ኣሎ...",
    missionStatement: "ተልእኾና እምነት ኦርቶዶክስ ተዋህዶ ኢትዮጵያ ምግላጽን ምክልኻልን፡ ንኣኃት ኦሪየንታል ኦርቶዶክስ ኣብያተ ክርስቲያናት ድማ ክብሪ ምሃብ እዩ።",
    privacyPolicy: "ፖሊሲ ውልቃዊነት",
    termsOfService: "ውዕል ኣገልግሎት",
    contactScholar: "ንሊቃውንቲ ርኸቡ",
    copyright: "ንመንፈሳዊ ዕብየት ምእመናን ኦርቶዶክስ ዝተዳለወ።",
    machineTranslated: "ብማሽን ዝተተርጎመ",
    calendar: "ናይ ቤተ ክርስቲያን ዓውደ ኣዋርሕ",
    majorObservances: "ቀንዲ በዓላትን ኣጽዋማትን (2018 ዓ.ም)",
    spiritualGuidance: "መንፈሳዊ መምርሒ",
    spiritualGuidanceDesc: "ቤተ ክርስቲያን ኦርቶዶክስ ተዋህዶ ኢትዮጵያ 13 ኣዋርሕ ዘለዎ ፍሉይ ዓውደ ኣዋርሕ ትኽተል። ጾም መሰረት መንፈሳዊ ህይወትና እዩ።",
    feast: "በዓል",
    fast: "ጾም",
    listen: "ናይ ዲያቆን ድምጺ ስማዕ",
    stop: "ድምጺ ደው ኣብል",
    voice: "ናይ ዲያቆን ድምጺ",
    autoSpeak: "ብባዕሉ ምንባብ",
    speed: "ናህሪ ድምጺ",
    sourceLabel: "ቅዱስ ምንጪ / ዋቢ መጽሓፍ",
    generatingAudio: "ቅዱስ ድምጺ ይዳሎ ኣሎ...",
  },
  so: {
    title: "Waddada Dimishiq / RTD",
    subtitle: "Sheekh-ka Dijitaalka ah: Difaacidda Iimaanka Tawaahido oo xigmad leh",
    chatPlaceholder: "Weydii Sheekh-kaaga Dijitaalka ah ee ku saabsan dogma EOTC, taariikhda, ama Aabbayaasha Kaniisadda...",
    send: "Dir",
    scholars: "Culimada Ortodokska",
    books: "Qoraallada Xurmada leh",
    activeScholars: "Culimada Firfircoon",
    chat: "Xarunta Wadahadalka",
    learnMore: "Wax badan ka baro",
    resetChat: "Nadiifi Wadahadalka",
    switchLang: "English",
    aiThinking: "Isagoo ka duulaya dhaqanka suuban ayuu ka fikirayaa...",
    missionStatement: "Hadafkayagu waa inaan sharaxno oo difaacno iimaanka Ortodokska Itoobiya, annagoo ixtiraamayna kaniisadaha kale ee walaalaha ah.",
    privacyPolicy: "Siyaasadda Khaaska ah",
    termsOfService: "Shuruudaha Adeegga",
    contactScholar: "La xiriir Culimada",
    copyright: "Loogu talagalay dhisidda ruuxiga ah ee mu'miniinta Ortodokska.",
    machineTranslated: "Mashiin Lagu Turjumay",
    calendar: "Hadhka Kaniisadda",
    majorObservances: "Munaasabadaha Waaweyn (2026)",
    spiritualGuidance: "Hagid Ruuxi ah",
    spiritualGuidanceDesc: "Kaniisadda Ortodokska ee Itoobiya waxay raacdaa kalandarka u gaar ah oo ka kooban 13 bilood. Soonku waa laf-dhabarta nolosheena ruuxiga ah.",
    feast: "Ciid",
    fast: "Soon",
    listen: "Dhageyso Sheekha",
    stop: "Jooji Codka",
    voice: "Codka Sheekha",
    autoSpeak: "Si toos ah u akhri",
    speed: "Xawaaraha Hadalka",
    sourceLabel: "Xigashada Quduuska ah",
    generatingAudio: "Diyaarinta codka...",
  }
};

export const ACTIVE_SCHOLARS: Scholar[] = [
  {
    name: {
      en: "H.G. Archbishop Angaelos",
      am: "ብፁዕ አቡነ አንጌሎስ",
      om: "Archbishop Angaelos",
      ti: "ብፁዕ አቡነ አንጌሎስ",
      so: "Archbishop Angaelos"
    },
    description: {
      en: "Coptic Orthodox Archbishop of London, widely known for his advocacy for religious freedom and ecumenical dialogue.",
      am: "የለንደን ኮፕቲክ ኦርቶዶክስ ሊቀ ጳጳስ፣ ለሃይማኖት ነፃነትና ለክርስቲያናዊ አንድነት በሚያደርጉት ጥረት ይታወቃሉ።",
      om: "Archbishop Ortodoksii Kooptik Landan, kan bilisummaa amantaa fi tokkummaa kiristaanaaf hojjetan.",
      ti: "ሊቀ ጳጳስ ኮፕቲክ ኦርቶዶክስ ለንደን፡ ንናጽነት ሃይማኖትን ሕብረት ክርስትያንን ዝቃለሱ።",
      so: "Archbishop-ka Kaniisadda Coptic ee London, oo caan ku ah u doodista xorriyadda diinta."
    },
    era: "Contemporary (Coptic)",
    image: "https://www.copticorthodox.london/wp-content/uploads/2017/11/Archbishop-Angaelos-Portrait-Square.jpg"
  },
  {
    name: {
      en: "Dn. Henok Haile",
      am: "ዲያቆን ሄኖክ ኃይሌ",
      om: "Diyaaqon Heenok Haayilee",
      ti: "ዲያቆን ሄኖክ ኃይሌ",
      so: "Dn. Henok Haile"
    },
    description: {
      en: "A prominent EOTC teacher and apologist, known for his deep theological insights and engaging teaching style.",
      am: "ታዋቂ የኢ/ኦ/ተ/ቤ መምህርና አፖሎጂስት፣ በጥልቅ የሃይማኖት እውቀታቸውና በትምህርት አሰጣጣቸው ይታወቃሉ።",
      om: "Barsiisaa fi ittisa amantaa EOTC beekamaa, hayyummaa fi akkaataa barsiisa isaaniitiin beekamu.",
      ti: "ፍሉጥ መምህርን ተጣባቒ እምነትን ኢ/ኦ/ተ/ቤ፡ ብዕምቆት ትምህርቶም ዝፍለጡ።",
      so: "Macallin weyn oo EOTC ah, oo caan ku ah aqoontiisa diimeed ee qoto dheer."
    },
    era: "Contemporary (Ethiopian)",
    image: "https://yt3.googleusercontent.com/ytc/AIdro_m-y-y-y-y-y-y-y-y-y-y-y-y-y-y-y-y-y=s900-c-k-c0x00ffffff-no-rj"
  },
  {
    name: {
      en: "Fr. Daoud Lamei",
      am: "አባ ዳውድ ላሜይ",
      om: "Abbaa Daawud Laameey",
      ti: "አባ ዳውድ ላሜይ",
      so: "Fr. Daoud Lamei"
    },
    description: {
      en: "A renowned Coptic Orthodox priest and preacher, famous for his extensive Bible studies and spiritual guidance.",
      am: "ታዋቂ የኮፕቲክ ኦርቶዶክስ ካህንና ሰባኪ፣ በመጽሐፍ ቅዱስ ጥናታቸውና በመንፈሳዊ ምክራቸው ይታወቃሉ።",
      om: "Lubaa fi lallabaa Ortodoksii Kooptik beekamaa, qo'annoo Kitaaba Qulqulluutiin beekamu.",
      ti: "ፍሉጥ ቀሺን ሰባኽን ኮፕቲክ ኦርቶዶክስ፡ ብመጽናዕቲ መጽሓፍ ቅዱስ ዝፍለጡ።",
      so: "Wadaad caan ah oo ka tirsan Kaniisadda Coptic, oo ku takhasusay barashada Kitaabka Quduuska ah."
    },
    era: "Contemporary (Coptic)",
    image: "https://frdaoudlamei.com/wp-content/uploads/2020/05/Fr-Daoud-Lamei.jpg"
  },
  {
    name: {
      en: "Fr. Peter Farrington",
      am: "አባ ፒተር ፋሪንግተን",
      om: "Abbaa Piiter Faaringitan",
      ti: "አባ ፒተር ፋሪንግተን",
      so: "Fr. Peter Farrington"
    },
    description: {
      en: "A Coptic Orthodox priest and prolific writer, focused on explaining Orthodox theology to the Western world.",
      am: "የኮፕቲክ ኦርቶዶክስ ካህንና ጸሐፊ፣ የኦርቶዶክስን የሃይማኖት ትምህርት ለምዕራባውያን በማስረዳት ይታወቃሉ።",
      om: "Luba fi barreessaa Ortodoksii Kooptik, barumsa Ortodoksii warra lixaatti ibsuun beekamu.",
      ti: "ቀሺን ጸሓፍን ኮፕቲክ ኦርቶዶክስ፡ ንትምህርቲ ኦርቶዶክስ ንምዕራባውያን ብምግላጽ ዝፍለጡ።",
      so: "Wadaad iyo qoraa Coptic ah, oo u sharaxaya fiqiga Ortodokska dunida reer galbeedka."
    },
    era: "Contemporary (Coptic/British)",
    image: "https://www.stgeorgeministry.com/wp-content/uploads/2015/05/Fr-Peter-Farrington.jpg"
  },
  {
    name: {
      en: "Burning Bush YouTube Channel",
      am: "የነደደችው ቁጥቋጦ (Burning Bush)",
      om: "Burning Bush YouTube Channel",
      ti: "ዝነደደት ቁጥቋጦ (Burning Bush)",
      so: "Kanaalka YouTube-ka ee Burning Bush"
    },
    description: {
      en: "A popular EOTC YouTube channel dedicated to teaching the Orthodox faith, providing spiritual guidance, and defending the Tewahedo dogma through digital media.",
      am: "የኦርቶዶክስ ተዋሕዶ እምነትን ለማስተማር፣ መንፈሳዊ ምክር ለመስጠትና የቤተክርስቲያንን ዶግማ ለመከላከል የተቋቋመ ታዋቂ የዩቲዩብ ቻናል።",
      om: "Toora YouTube beekamaa barsiisa amantaa Ortodoksii fi gorsa hafuuraa kennuuf qophaa'e.",
      ti: "ትምህርቲ ኦርቶዶክስ ንምስፋሕን መንፈሳዊ ምኽሪ ንምሃብን ዝተዳለወ ፍሉጥ ናይ ዩቲዩብ ቻናል እዩ።",
      so: "Kanaal YouTube ah oo caan ah oo loogu talagalay barashada iimaanka Ortodokska iyo bixinta hagid ruuxi ah."
    },
    era: "Contemporary (Digital Media)",
    image: "https://yt3.googleusercontent.com/ytc/AIdro_n-y-y-y-y-y-y-y-y-y-y-y-y-y-y-y-y-y=s900-c-k-c0x00ffffff-no-rj"
  }
];

export const SCHOLARS: Scholar[] = [
  {
    name: {
      en: "St. Athanasius the Apostolic",
      am: "ቅዱስ አትናቴዎስ ሐዋርያዊ",
      om: "Qulqulluu Aataanaasiyoos",
      ti: "ቅዱስ አትናቴዎስ ሐዋርያዊ",
      so: "St. Athanasius"
    },
    description: {
      en: "The 20th Pope of Alexandria, defender of the Nicene Creed against Arianism.",
      am: "20ኛው የእስክንድርያ ፓትርያርክ፣ የአርዮስን ክህደት የተቃወመ የሃይማኖት አባት።",
      om: "Paappasii Iskindiriyaa 20ffaa, kan barumsa dogoggoraa Ariyoos morme.",
      ti: "በዓል 20 ፓትርያርክ እስክንድርያ፡ ንኽሕደት አርዮስ ዝተቓለሰ።",
      so: "Baaba-kii 20-aad ee Alexandria, difaacay iimaanka saxda ah."
    },
    era: "4th Century AD (Coptic)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Athanasius_of_Alexandria.jpg/400px-Athanasius_of_Alexandria.jpg"
  },
  {
    name: {
      en: "St. Cyril of Alexandria",
      am: "ቅዱስ ቄርሎስ ዘእስክንድርያ",
      om: "Qulqulluu Qerloos",
      ti: "ቅዱስ ቄርሎስ ዘእስክንድርያ",
      so: "St. Cyril"
    },
    description: {
      en: "The 'Seal of the Fathers', key figure in the Council of Ephesus and Miaphysite Christology.",
      am: "የአባቶች ማኅተም፣ በኤፌሶን ጉባኤ የታወቁ የሃይማኖት አባት።",
      om: "Mallattoo Abbootii, kan gubaa Efesoon irratti beekamu.",
      ti: "ማሕተም ኣቦታት፡ ኣብ ጉባኤ ኤፌሶን ዓቢ ተራ ዝነበሮ።",
      so: "Shaabadda Aabbayaasha, udub dhexaadkii Golaha Efesos."
    },
    era: "5th Century AD (Coptic)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Cyril_of_Alexandria.jpg/400px-Cyril_of_Alexandria.jpg"
  },
  {
    name: {
      en: "St. Severus of Antioch",
      am: "ቅዱስ ሳዊሮስ ዘአንጾኪያ",
      om: "Qulqulluu Saawiroos",
      ti: "ቅዱስ ሳዊሮስ ዘአንጾኪያ",
      so: "St. Severus"
    },
    description: {
      en: "A great theologian of the Syrian Orthodox Church and defender of the faith.",
      am: "የሶርያ ኦርቶዶክስ ቤተክርስቲያን ታላቅ ሊቅና የሃይማኖት ጠበቃ።",
      om: "Hayyuu Mana Kiristaanaa Ortodoksii Sooriyaa fi ittisa amantaa.",
      ti: "ዓቢ ሊቅ ቤተ ክርስቲያን ሶርያ ኦርቶዶክስን ተጣባቒ እምነትን።",
      so: "Aqoonyahan weyn oo ka tirsan Kaniisadda Suuriya."
    },
    era: "6th Century AD (Syrian)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Severus_of_Antioch.jpg/400px-Severus_of_Antioch.jpg"
  },
  {
    name: {
      en: "St. Yared",
      am: "ቅዱስ ያሬድ",
      om: "Qulqulluu Yaared",
      ti: "ቅዱስ ያሬድ",
      so: "St. Yared"
    },
    description: {
      en: "The father of Ethiopian sacred music and liturgical chant (Zema).",
      am: "የኢትዮጵያ ቤተክርስቲያን የዜማ አባት።",
      om: "Abbaa faaruu fi qooqa Mana Kiristaanaa Itoophiyaa.",
      ti: "ኣቦ ዜማ ቤተ ክርስቲያን ኢትዮጵያ።",
      so: "Aabbaha muusikada xurmada leh ee Itoobiya."
    },
    era: "6th Century AD (Ethiopian)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Saint_Yared.jpg/400px-Saint_Yared.jpg"
  },
  {
    name: {
      en: "St. Gregorios of Parumala",
      am: "ቅዱስ ግሪጎሪዮስ ዘፓሩማላ",
      om: "Qulqulluu Giriigooriyaos",
      ti: "ቅዱስ ግሪጎሪዮስ ዘፓሩማላ",
      so: "St. Gregorios"
    },
    description: {
      en: "The first declared saint of the Malankara Orthodox Syrian Church in India.",
      am: "የህንድ (ማላንካራ) ኦርቶዶክስ ቤተክርስቲያን የመጀመሪያው ቅዱስ።",
      om: "Qulqulluu jalqabaa Mana Kiristaanaa Ortodoksii Indiyaa.",
      ti: "ቀዳማይ ቅዱስ ቤተ ክርስቲያን ኦርቶዶክስ ህንዲ (ማላንካራ)።",
      so: "Awliyadii ugu horreysay ee Kaniisadda Hindiya."
    },
    era: "19th Century AD (Malankara)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Saint_Gregorios_of_Parumala.jpg/400px-Saint_Gregorios_of_Parumala.jpg"
  }
];

export const BOOKS: SacredBook[] = [
  {
    title: {
      en: "The Ante-Nicene Fathers",
      am: "የቀደሙ አባቶች መጻሕፍት",
      om: "Barreeffamoota Abbootii Durii",
      ti: "መጻሕፍቲ ቀደሞት ኣቦታት",
      so: "Aabbayaashii hore"
    },
    summary: {
      en: "A comprehensive collection of writings from the Early Church Fathers before 325 AD.",
      am: "ከኒቂያ ጉባኤ በፊት የነበሩ የቤተክርስቲያን አባቶች ጽሑፎች ስብስብ።",
      om: "Walitti qabaa barreeffamoota abbootii mana kiristaanaa bara 325 dura.",
      ti: "ቅድሚ ጉባኤ ኒቂያ ዝነበሩ ኣቦታት ዝጸሓፍዎም ጽሑፋት።",
      so: "Ururinta qoraallada Aabbayaashii hore ee kaniisadda."
    },
    category: 'Church Fathers'
  },
  {
    title: {
      en: "Haymanote Abew",
      am: "ሃይማኖተ አበው",
      om: "Haymaanota Abbootii",
      ti: "ሃይማኖተ አበው",
      so: "Iimaanka Aabbayaasha"
    },
    summary: {
      en: "The Faith of the Fathers, containing dogmatic writings of the Oriental Orthodox fathers.",
      am: "የቀደሙ አባቶች የሃይማኖት ትምህርቶች ስብስብ።",
      om: "Barumsa amantaa abbootii Ortodoksii Oriyeentaal.",
      ti: "ትምህርቲ ሃይማኖት ቀደሞት ኣቦታት ኦሪየንታል ኦርቶዶክስ።",
      so: "Iimaanka Aabbayaasha, oo ay ku jiraan qoraallada caqiidada."
    },
    category: 'Tradition'
  },
  {
    title: {
      en: "The 81 Books (EOTC Canon)",
      am: "81ዱ መጻሕፍት",
      om: "Kitaabota 81",
      ti: "81 መጻሕፍቲ",
      so: "81-ka Buug"
    },
    summary: {
      en: "The full biblical canon of the Ethiopian Orthodox Tewahedo Church.",
      am: "ሙሉው የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን የመጽሐፍ ቅዱስ ቀኖና።",
      om: "Qanonaa guutuu Mana Kiristaanaa Ortodoksii Itoophiyaa.",
      ti: "ምሉእ ቀኖና መጽሓፍ ቅዱስ ቤተ ክርስቲያን ኦርቶዶክስ ኢትዮጵያ።",
      so: "Xeerka kitaabka quduska ah ee Itoobiya."
    },
    category: 'Canon'
  },
  {
    title: {
      en: "The Coptic Agpeya",
      am: "የኮፕቲክ አግፔያ",
      om: "Agpeeyaa Kooptik",
      ti: "አግፔያ ኮፕቲክ",
      so: "Agpeya-da Coptic"
    },
    summary: {
      en: "The Coptic Orthodox Book of Hours, used for daily prayers.",
      am: "የኮፕቲክ ኦርቶዶክስ ቤተክርስቲያን የሰዓታት ጸሎት መጽሐፍ።",
      om: "Kitaaba kadhannaa sa'aatii Mana Kiristaanaa Kooptik.",
      ti: "መጽሓፍ ጸሎት ሰዓታት ቤተ ክርስቲያን ኮፕቲክ ኦርቶዶክስ።",
      so: "Buugga salaadda ee Kaniisadda Coptic."
    },
    category: 'Liturgical'
  }
];
