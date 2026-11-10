
import { Language } from '../types';

export interface FeastInfo {
  name: Record<Language, string>;
  greeting: Record<Language, string>;
  type: 'feast' | 'fast';
}

export const MAJOR_EVENTS_2026 = [
  { date: 'Jan 6', name: { en: 'Gahad of Christmas', am: 'ጋድ (የልደት ዋዜማ)', om: 'Gahada Qillee', ti: 'ጋድ (ዋዜማ ልደት)', so: 'Gahad of Christmas' }, type: 'fast' },
  { date: 'Jan 7', name: { en: 'Genna (Christmas)', am: 'ልደት', om: 'Qillee', ti: 'ልደት', so: 'Kirismas' }, type: 'feast' },
  { date: 'Jan 14', name: { en: 'Gezret (Circumcision)', am: 'ግዝረት', om: 'Gezret', ti: 'ግዝረት', so: 'Gezret' }, type: 'feast' },
  { date: 'Jan 18', name: { en: 'Gahad of Epiphany', am: 'ጋድ (የጥምቀት ዋዜማ)', om: 'Gahada Cuuphaa', ti: 'ጋድ (ዋዜማ ጥምቀት)', so: 'Gahad of Epiphany' }, type: 'fast' },
  { date: 'Jan 19', name: { en: 'Timkat (Epiphany)', am: 'ጥምቀት', om: 'Cuuphaa', ti: 'ጥምቀት', so: 'Timkat' }, type: 'feast' },
  { date: 'Jan 20', name: { en: 'Kana Ze-Galila', am: 'ቃና ዘገሊላ', om: 'Qaanaa Ze-Galiilaa', ti: 'ቃና ዘገሊላ', so: 'Kana Ze-Galila' }, type: 'feast' },
  { date: 'Feb 2', name: { en: 'Fast of Nineveh', am: 'ጾመ ነነዌ', om: 'Sooma Nanawwee', ti: 'ጾመ ነነዌ', so: 'Soonka Ninawa' }, type: 'fast' },
  { date: 'Feb 16', name: { en: 'Start of Great Lent', am: 'የዓቢይ ጾም መጀመሪያ', om: 'Sooma Guddaa', ti: 'መጀመርታ ዓቢይ ጾም', so: 'Soonka Weyn' }, type: 'fast' },
  { date: 'March 15', name: { en: 'Debre Zeit', am: 'ደብረ ዘይት', om: 'Debre Zeyit', ti: 'ደብረ ዘይት', so: 'Debre Zeit' }, type: 'feast' },
  { date: 'April 5', name: { en: 'Hosanna (Palm Sunday)', am: 'ሆሳዕና', om: 'Hoosaa’inaa', ti: 'ሆሳዕና', so: 'Hosanna' }, type: 'feast' },
  { date: 'April 7', name: { en: 'Tishbit (Annunciation)', am: 'ትስብእት', om: 'Tishbit', ti: 'ትስብእት', so: 'Tishbit' }, type: 'feast' },
  { date: 'April 10', name: { en: 'Siklet (Good Friday)', am: 'ስቅለት', om: 'Sikliitii', ti: 'ስቅለት', so: 'Jimcaha Wanaagsan' }, type: 'feast' },
  { date: 'April 12', name: { en: 'Fasika (Easter)', am: 'ፋሲካ', om: 'Faasikaa', ti: 'ፋሲካ', so: 'Ciidda Fasika' }, type: 'feast' },
  { date: 'May 21', name: { en: 'Erget (Ascension)', am: 'ዕርገት', om: 'Ol-ba’iinsa', ti: 'ዕርገት', so: 'Erget' }, type: 'feast' },
  { date: 'May 31', name: { en: 'Paracletos (Pentecost)', am: 'ጰራቅሊጦስ', om: 'Pharaaqiliixoos', ti: 'ጰራቅሊጦስ', so: 'Paracletos' }, type: 'feast' },
  { date: 'June 1', name: { en: 'Fast of the Apostles', am: 'ጾመ ሐዋርያት', om: 'Sooma Hawariyaat', ti: 'ጾመ ሐዋርያት', so: 'Soonka Hawaryat' }, type: 'fast' },
  { date: 'Aug 7', name: { en: 'Fast of Assumption', am: 'ጾመ ፍልሰታ', om: 'Sooma Filsetaa', ti: 'ጾመ ፍልሰታ', so: 'Soonka Filseta' }, type: 'fast' },
  { date: 'Aug 19', name: { en: 'Debre Tabor', am: 'ደብረ ታቦር', om: 'Debre Taabor', ti: 'ደብረ ታቦር', so: 'Debre Tabor' }, type: 'feast' },
  { date: 'Sept 11', name: { en: 'Enkutatash (New Year)', am: 'እንቁጣጣሽ', om: 'Enkutaataash', ti: 'እንቁጣጣሽ', so: 'Enkutatash' }, type: 'feast' },
  { date: 'Sept 27', name: { en: 'Meskel', am: 'መስቀል', om: 'Masqala', ti: 'መስቀል', so: 'Meskel' }, type: 'feast' },
  { date: 'Nov 24', name: { en: 'Fast of the Prophets', am: 'ጾመ ነቢያት', om: 'Sooma Nabiyyootaa', ti: 'ጾመ ነቢያት', so: 'Soonka Nebiyat' }, type: 'fast' },
];

export const getEOTCCalendarGreeting = (date: Date): FeastInfo | null => {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();
  const year = date.getFullYear();

  const matches: FeastInfo[] = [];
  const add = (info: FeastInfo) => matches.push(info);

  // Simple hardcoded dates for major fixed feasts
  if (month === 1 && day === 6) {
    add({
      name: { en: 'Gahad of Christmas', am: 'ጋድ (የልደት ዋዜማ)', om: 'Gahada Qillee', ti: 'ጋድ (ዋዜማ ልደት)', so: 'Gahad of Christmas' },
      greeting: { en: 'Blessed Gahad of Christmas.', am: 'እንኳን ለልደት ዋዜማ (ጋድ) በሰላም አደረሳችሁ።', om: 'Baga Gahada Qillee Geessan.', ti: 'ንዋዜማ ልደት ብሰላም ኣብጽሓኩም!', so: 'Gahad barakaysan.' },
      type: 'fast'
    });
  }

  if (month === 1 && day === 7) {
    add({
      name: { en: 'Genna (Christmas)', am: 'ልደት', om: 'Qillee', ti: 'ልደት', so: 'Kirismas' },
      greeting: { en: 'Melkam Genna!', am: 'መልካም የልደት በዓል!', om: 'Baga Ayyaana Qillee Geessan!', ti: 'ርሑስ በዓል ልደት!', so: 'Hambalyo Kirismas!' },
      type: 'feast'
    });
  }

  if (month === 1 && day === 14) {
    add({
      name: { en: 'Gezret (Circumcision)', am: 'ግዝረት', om: 'Gezret', ti: 'ግዝረት', so: 'Gezret' },
      greeting: { en: 'Blessed Feast of Circumcision.', am: 'እንኳን ለጌታችን የግዝረት በዓል በሰላም አደረሳችሁ።', om: 'Baga Ayyaana Gezret Geessan.', ti: 'ንበዓል ግዝረት ብሰላም ኣብጽሓኩም!', so: 'Gezret barakaysan.' },
      type: 'feast'
    });
  }

  if (month === 1 && day === 18) {
    add({
      name: { en: 'Gahad of Epiphany', am: 'ጋድ (የጥምቀት ዋዜማ)', om: 'Gahada Cuuphaa', ti: 'ጋድ (ዋዜማ ጥምቀት)', so: 'Gahad of Epiphany' },
      greeting: { en: 'Blessed Gahad of Epiphany.', am: 'እንኳን ለጥምቀት ዋዜማ (ጋድ) በሰላም አደረሳችሁ።', om: 'Baga Gahada Cuuphaa Geessan.', ti: 'ንዋዜማ ጥምቀት ብሰላም ኣብጽሓኩም!', so: 'Gahad barakaysan.' },
      type: 'fast'
    });
  }

  if (month === 1 && day === 19) {
    add({
      name: { en: 'Timkat (Epiphany)', am: 'ጥምቀት', om: 'Cuuphaa', ti: 'ጥምቀት', so: 'Timkat' },
      greeting: { en: 'Melkam Timkat!', am: 'መልካም የጥምቀት በዓል!', om: 'Baga Ayyaana Cuuphaa Geessan!', ti: 'ርሑስ በዓል ጥምቀት!', so: 'Hambalyo Timkat!' },
      type: 'feast'
    });
  }

  if (month === 1 && day === 20) {
    add({
      name: { en: 'Kana Ze-Galila', am: 'ቃና ዘገሊላ', om: 'Qaanaa Ze-Galiilaa', ti: 'ቃና ዘገሊላ', so: 'Kana Ze-Galila' },
      greeting: { en: 'Blessed Feast of Kana Ze-Galila.', am: 'እንኳን ለቃና ዘገሊላ በዓል በሰላም አደረሳችሁ።', om: 'Baga Ayyaana Qaanaa Ze-Galiilaa Geessan.', ti: 'ንበዓል ቃና ዘገሊላ ብሰላም ኣብጽሓኩም!', so: 'Kana Ze-Galila barakaysan.' },
      type: 'feast'
    });
  }

  if (month === 4 && day === 7) {
    add({
      name: { en: 'Tishbit (Annunciation)', am: 'ትስብእት', om: 'Tishbit', ti: 'ትስብእት', so: 'Tishbit' },
      greeting: { en: 'Blessed Feast of Annunciation.', am: 'እንኳን ለጌታችን የትስብእት (ብስራት) በዓል በሰላም አደረሳችሁ።', om: 'Baga Ayyaana Tishbit Geessan.', ti: 'ንበዓል ትስብእት ብሰላም ኣብጽሓኩም!', so: 'Tishbit barakaysan.' },
      type: 'feast'
    });
  }

  if (month === 8 && day >= 7 && day <= 21) {
    add({
      name: { en: 'Fast of the Assumption', am: 'ጾመ ፍልሰታ', om: 'Sooma Filsetaa', ti: 'ጾመ ፍልሰታ', so: 'Soonka Filseta' },
      greeting: { en: 'Blessed Fast of the Assumption.', am: 'እንኳን ለጾመ ፍልሰታ በሰላም አደረሳችሁ።', om: 'Baga Sooma Filsetaa Geessan.', ti: 'ንጾመ ፍልሰታ ብሰላም ኣብጽሓኩም!', so: 'Soonka Filseta barakaysan.' },
      type: 'fast'
    });
  }

  if (month === 8 && day === 19) {
    add({
      name: { en: 'Debre Tabor', am: 'ደብረ ታቦር', om: 'Debre Taabor', ti: 'ደብረ ታቦር', so: 'Debre Tabor' },
      greeting: { en: 'Melkam Debre Tabor!', am: 'መልካም የደብረ ታቦር በዓል!', om: 'Baga Ayyaana Debre Taabor Geessan!', ti: 'ርሑስ በዓል ደብረ ታቦር!', so: 'Hambalyo Debre Tabor!' },
      type: 'feast'
    });
  }

  if (month === 9 && day === 27) {
    add({
      name: { en: 'Meskel', am: 'መስቀል', om: 'Masqala', ti: 'መስቀል', so: 'Meskel' },
      greeting: { en: 'Melkam Meskel!', am: 'መልካም የመስቀል በዓል!', om: 'Baga Ayyaana Masqala Geessan!', ti: 'ርሑስ በዓል መስቀል!', so: 'Hambalyo Meskel!' },
      type: 'feast'
    });
  }

  if ((month === 11 && day >= 24) || month === 12 || (month === 1 && day <= 6)) {
    add({
      name: { en: 'Fast of the Prophets', am: 'ጾመ ነቢያት', om: 'Sooma Nabiyyootaa', ti: 'ጾመ ነቢያት', so: 'Soonka Nebiyat' },
      greeting: { en: 'Blessed Fast of the Prophets (Advent).', am: 'እንኳን ለጾመ ነቢያት በሰላም አደረሳችሁ።', om: 'Baga Sooma Nabiyyootaa Geessan.', ti: 'ንጾመ ነቢያት ብሰላም ኣብጽሓኩም!', so: 'Soonka Nebiyat barakaysan.' },
      type: 'fast'
    });
  }

  // Variable dates for 2026
  if (year === 2026) {
    // Nineveh Fast: Feb 2 - Feb 4
    if (month === 2 && day >= 2 && day <= 4) {
      add({
        name: { en: 'Fast of Nineveh', am: 'ጾመ ነነዌ', om: 'Sooma Nanawwee', ti: 'ጾመ ነነዌ', so: 'Soonka Ninawa' },
        greeting: { en: 'Blessed Fast of Nineveh.', am: 'እንኳን ለጾመ ነነዌ በሰላም አደረሳችሁ።', om: 'Baga Sooma Nanawwee Geessan.', ti: 'ንጾመ ነነዌ ብሰላም ኣብጽሓኩም!', so: 'Soonka Ninawa barakaysan.' },
        type: 'fast'
      });
    }

    // Great Lent: Feb 16 - April 11
    if ((month === 2 && day >= 16) || month === 3 || (month === 4 && day < 12)) {
      // Debre Zeit: March 15
      if (month === 3 && day === 15) {
        add({
          name: { en: 'Debre Zeit', am: 'ደብረ ዘይት', om: 'Debre Zeyit', ti: 'ደብረ ዘይት', so: 'Debre Zeit' },
          greeting: { en: 'Blessed Feast of Debre Zeit.', am: 'እንኳን ለደብረ ዘይት በዓል በሰላም አደረሳችሁ።', om: 'Baga Ayyaana Debre Zeyit Geessan.', ti: 'ንበዓል ደብረ ዘይት ብሰላም ኣብጽሓኩም!', so: 'Debre Zeit barakaysan.' },
          type: 'feast'
        });
      }
      add({
        name: { en: 'Great Lent', am: 'ዓቢይ ጾም', om: 'Sooma Guddaa', ti: 'ዓቢይ ጾም', so: 'Soonka Weyn' },
        greeting: { en: 'Blessed Great Lent season.', am: 'መልካም የዓቢይ ጾም ወቅት ይሁንልን።', om: 'Yeroo Sooma Guddaa barakaysan isiniif haa ta’u.', ti: 'ብሩኽ ናይ ዓቢይ ጾም እዋን ይግበረልና።', so: 'Xilli soon oo barakaysan.' },
        type: 'fast'
      });
    }

    // Hosanna: April 5
    if (month === 4 && day === 5) {
      add({
        name: { en: 'Hosanna (Palm Sunday)', am: 'ሆሳዕና', om: 'Hoosaa’inaa', ti: 'ሆሳዕና', so: 'Hosanna' },
        greeting: { en: 'Melkam Hosanna!', am: 'መልካም የሆሳዕና በዓል!', om: 'Baga Ayyaana Hoosaa’inaa Geessan!', ti: 'ርሑስ በዓል ሆሳዕና!', so: 'Hambalyo Hosanna!' },
        type: 'feast'
      });
    }

    // Siklet: April 10
    if (month === 4 && day === 10) {
      add({
        name: { en: 'Siklet (Good Friday)', am: 'ስቅለት', om: 'Sikliitii', ti: 'ስቅለት', so: 'Jimcaha Wanaagsan' },
        greeting: { en: 'Blessed Good Friday.', am: 'ለስቅለተ ዓርብ በሰላም አደረሳችሁ።', om: 'Baga Sikliitii Geessan.', ti: 'ንበዓል ስቅለት ብሰላም ኣብጽሓኩም!', so: 'Jimce Wanaagsan oo barakaysan.' },
        type: 'feast'
      });
    }

    // Fasika: April 12 - 14
    if (month === 4 && day >= 12 && day <= 14) {
      add({
        name: { en: 'Fasika (Easter)', am: 'ፋሲካ', om: 'Faasikaa', ti: 'ፋሲካ', so: 'Ciidda Fasika' },
        greeting: { en: 'Enkuan le Berhane Tinsaeu Aderesachihu!', am: 'እንኳን ለብርሃነ ትንሣኤው አደረሳችሁ!', om: 'Baga Ayyaana Faasikaa Geessan!', ti: 'እንኳን ንብርሃነ ትንሳኤኡ ኣብጽሓኩም!', so: 'Hambalyo Ciidda Fasika!' },
        type: 'feast'
      });
    }

    // Erget: May 21
    if (month === 5 && day === 21) {
      add({
        name: { en: 'Erget (Ascension)', am: 'ዕርገት', om: 'Ol-ba’iinsa', ti: 'ዕርገት', so: 'Erget' },
        greeting: { en: 'Blessed Feast of Ascension.', am: 'እንኳን ለጌታችን የዕርገት በዓል በሰላም አደረሳችሁ።', om: 'Baga Ayyaana Ol-ba’iinsa Geessan.', ti: 'ንበዓል ዕርገት ብሰላም ኣብጽሓኩም!', so: 'Erget barakaysan.' },
        type: 'feast'
      });
    }

    // Paracletos: May 31
    if (month === 5 && day === 31) {
      add({
        name: { en: 'Paracletos (Pentecost)', am: 'ጰራቅሊጦስ', om: 'Pharaaqiliixoos', ti: 'ጰራቅሊጦስ', so: 'Paracletos' },
        greeting: { en: 'Blessed Feast of Pentecost.', am: 'እንኳን ለጰራቅሊጦስ በዓል በሰላም አደረሳችሁ።', om: 'Baga Ayyaana Pharaaqiliixoos Geessan.', ti: 'ንበዓል ጰራቅሊጦስ ብሰላም ኣብጽሓኩም!', so: 'Paracletos barakaysan.' },
        type: 'feast'
      });
    }

    // Fast of the Apostles: June 1 - July 12
    if ((month === 6) || (month === 7 && day <= 12)) {
      add({
        name: { en: 'Fast of the Apostles', am: 'ጾመ ሐዋርያት', om: 'Sooma Hawariyaat', ti: 'ጾመ ሐዋርያት', so: 'Soonka Hawaryat' },
        greeting: { en: 'Blessed Fast of the Apostles.', am: 'እንኳን ለጾመ ሐዋርያት በሰላም አደረሳችሁ።', om: 'Baga Sooma Hawariyaat Geessan.', ti: 'ንጾመ ሐዋርያት ብሰላም ኣብጽሓኩም!', so: 'Soonka Hawaryat barakaysan.' },
        type: 'fast'
      });
    }
  }

  if (matches.length === 0) return null;

  // Priority: Feast over Fast
  const feast = matches.find(m => m.type === 'feast');
  return feast || matches[0];
};
