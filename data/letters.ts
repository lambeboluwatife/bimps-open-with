export interface Letter {
  id: string;
  title: string;
  subtitle: string;
  envelopeNum: string;
  type: "letter" | "voice" | "final";
  sealedOn: string;
  date: string;
  dateTag?: string;
  bg: string;
  flapBg: string;
  sealBg: string;
  sealColor: string;
  sealIcon: string;
  rotation: number;
  quote?: string;
  contentPart1: string[];
  hasPolaroid?: boolean;
  polaroidImg?: string;
  polaroidCaption?: string;
  contentPart2?: string[];
  hasVoiceNote?: boolean;
  audioDuration?: string;
  senderName?: string;
}

export const LETTERS_DATA: Letter[] = [
  {
    id: "miss-me",
    title: "Open when you miss me",
    subtitle: "For those moments when I'm not there",
    envelopeNum: "No. 01 • Sealed",
    type: "voice",
    sealedOn: "Sealed on a Sunday evening",
    date: "October 14th",
    bg: "#F5DCE2",
    flapBg: "#eed0d7",
    sealBg: "#8B5365",
    sealColor: "#E5C281",
    sealIcon: "heart",
    rotation: -2,
    quote: "Sometimes I wish I could put into words exactly what you mean to me.",
    contentPart1: [
      "On days when the world feels too loud or we're miles apart, I want you to hold onto this truth: you are my home, my calm, and my favorite adventure.",
      "Whenever you miss me, close your eyes and remember the warmth of that evening on the coast... the gentle chill in the ocean breeze and how completely safe everything felt wrapped in your arms.",
    ],
    hasPolaroid: true,
    polaroidImg: "/polaroids/polaroid-bluff.jpg",
    polaroidCaption: "Our gentle memory — sunset by the ocean",
    contentPart2: [
      "No matter how chaotic the week becomes, or how far the commute pulls us, that sunset never ended for me. I keep it folded right inside my chest.",
      "Before you fold this note away, there is one little thing I needed you to hear in my own voice today.",
    ],
    hasVoiceNote: true,
    audioDuration: "1:45",
    senderName: "Bolu",
  },
  {
    id: "sad",
    title: "Open when you're sad",
    subtitle: "A little reminder that you're not alone",
    envelopeNum: "No. 02 • Gentle",
    type: "letter",
    sealedOn: "Sealed on a rainy Tuesday",
    date: "November 02nd",
    bg: "#F5EFEB",
    flapBg: "#e9e1db",
    sealBg: "#E5D7CD",
    sealColor: "#80515e",
    sealIcon: "flower",
    rotation: 2,
    quote: "It is completely okay to have gentle, quiet, slow days.",
    contentPart1: [
      "Wrap yourself in that soft beige knit blanket you love, drink some warm chamomile tea, and remember that tomorrow arrives completely fresh.",
      "You don't have to be strong or smiling every minute of every day. In my eyes, you are just as precious on the cloudy afternoons as you are in the sunshine.",
    ],
    hasPolaroid: true,
    polaroidImg: "/polaroids/polaroid-flowers.jpg",
    polaroidCaption: "Wildflowers & warm morning tea",
    contentPart2: [
      "I am holding your hand in spirit through every heavy thought. Take a long, deep breath and let your shoulders drop.",
      "You are safe, you are cherished, and I will always be right here whenever you need me.",
    ],
    hasVoiceNote: false,
    senderName: "Bolu",
  },
  {
    id: "smile",
    title: "Open when you need a smile",
    subtitle: "I know how to make you smile 😌",
    envelopeNum: "No. 03 • Joy",
    dateTag: "Dec 12",
    type: "letter",
    sealedOn: "Sealed with a giggle",
    date: "December 12th",
    bg: "#FFF9F3",
    flapBg: "#fff0f3",
    sealBg: "#DDA4B2",
    sealColor: "#633945",
    sealIcon: "smile",
    rotation: -1,
    quote: "Remember that late Tuesday evening when the bakery ran out of napkins?",
    contentPart1: [
      "It started pouring unexpectedly, and we got completely soaked trying to shield that tiny cardboard box of raspberry pastries from the storm!",
      "You laughed so hard under that shop awning that your eyes crinkled in that exact irresistible way I adore. We looked like two drenched sea otters, and yet it was the happiest ten minutes of my entire month.",
    ],
    hasPolaroid: true,
    polaroidImg: "/polaroids/polaroid-espresso.jpg",
    polaroidCaption: "Sunday morning espresso & endless laughter",
    contentPart2: [
      "Did you know that your smile is literally my favorite sight in the whole universe? It turns ordinary gray days into warm golden poetry.",
      "Consider this your official, non-negotiable reminder that you are deeply adored.",
    ],
    hasVoiceNote: false,
    senderName: "Bolu",
  },
  {
    id: "doubt",
    title: "Open when you doubt yourself",
    subtitle: "A reminder of your breathtaking strength",
    envelopeNum: "No. 04 • Courage",
    type: "letter",
    sealedOn: "Sealed at sunrise",
    date: "December 18th",
    bg: "#EAD4DB",
    flapBg: "#dfc6ce",
    sealBg: "from-[#E5C281] via-[#D0AF70] to-[#755A24]",
    sealColor: "#ffffff",
    sealIcon: "award",
    rotation: 3,
    quote: "Look at how far you have walked, and the quiet courage you carry.",
    contentPart1: [
      "Whenever that little whisper in your head tries to tell you that you're not doing enough or that you're falling behind, please silence it with this:",
      "I have watched you handle challenges with so much grace, intelligence, and perseverance. You possess a brilliant mind and a heart larger than you ever give yourself credit for.",
    ],
    hasPolaroid: false,
    contentPart2: [
      "You are capable of breathtaking things, my love. Don't let a passing moment of self-doubt cast a shadow over everything you are becoming.",
      "I believe in you with every fiber of my being.",
    ],
    hasVoiceNote: false,
    senderName: "Bolu",
  },
  {
    id: "sleep",
    title: "Open when you can't sleep",
    subtitle: "Peaceful night thoughts & quiet stars",
    envelopeNum: "No. 05 • Night",
    type: "letter",
    sealedOn: "Sealed under midnight stars",
    date: "January 04th",
    bg: "#E6D8E2",
    flapBg: "#daccd6",
    sealBg: "#AA8599",
    sealColor: "#ffffff",
    sealIcon: "moon",
    rotation: -2,
    quote: "Close your eyes. Listen to the steady rhythm of the quiet night.",
    contentPart1: [
      "Imagine us resting together on the hillside, listening to the crickets under a quiet canopy of midnight stars. Feel my fingers gently running through your hair.",
      "Everything that made you anxious today can wait until tomorrow. The night was made for rest, for healing, and for stillness.",
    ],
    hasPolaroid: true,
    polaroidImg: "/polaroids/polaroid-city.jpg",
    polaroidCaption: "Midnight city reflections & cozy silence",
    contentPart2: [
      "Rest your tired mind, my love. Wrap yourself tight and let tomorrow take care of itself.",
      "I am wishing you the sweetest, gentlest dreams.",
    ],
    hasVoiceNote: false,
    senderName: "Bolu",
  },
  {
    id: "loved",
    title: "Open when you need to feel loved",
    subtitle: "A reminder of my unconditional devotion",
    envelopeNum: "No. 06 • Adoration",
    type: "letter",
    sealedOn: "Sealed with pure tenderness",
    date: "January 20th",
    bg: "#FFF7EE",
    flapBg: "#f5ecde",
    sealBg: "#653A46",
    sealColor: "#ffd9e1",
    sealIcon: "heart",
    rotation: 1,
    quote: "You are cherished beyond measure, in every hour of every day.",
    contentPart1: [
      "If you ever wonder how deeply you are loved, count every star in the sky and multiply it by eternity. You are the easiest laughter in any crowded room and the warm home I return to in my heart.",
      "I love the way you care about the little things. I love your kindness. I love how being around you makes life feel so full and vibrant.",
    ],
    hasPolaroid: false,
    contentPart2: [
      "Never question your place in my world: you are at the absolute center of it, today and every single day that follows.",
    ],
    hasVoiceNote: false,
    senderName: "Bolu",
  },
  {
    id: "remember",
    title: "Open when you want to remember us",
    subtitle: "Photo keepsake & our sweetest memories",
    envelopeNum: "No. 07 • Memory",
    type: "letter",
    sealedOn: "Sealed with golden hour sunlight",
    date: "February 01st",
    bg: "#EFE6DC",
    flapBg: "#e4dacd",
    sealBg: "#B89B72",
    sealColor: "#ffffff",
    sealIcon: "camera",
    rotation: -3,
    quote: "Looking back at our very first trip up to the coastal bluffs...",
    contentPart1: [
      "The wind completely ruined our hair, we got strawberry ice cream all over our jackets, and it remains one of the happiest days of my life.",
      "Every road trip, every quiet breakfast, every shared playlist — we have built an entire universe together, and every chapter is my favorite.",
    ],
    hasPolaroid: true,
    polaroidImg: "/polaroids/polaroid-beach.jpg",
    polaroidCaption: "The golden hour beach walk we will never forget",
    contentPart2: [
      "Take a look at the photograph tucked inside this note. May it bring back all the warmth, the salt air, and the feeling of holding hands by the water.",
    ],
    hasVoiceNote: false,
    senderName: "Bolu",
  },
  {
    id: "last",
    title: "Open last ❤️",
    subtitle: "The most important one",
    envelopeNum: "The Final Keepsake",
    type: "final",
    sealedOn: "Strictly for the very end",
    date: "February 14th",
    bg: "#854E60",
    flapBg: "#774253",
    sealBg: "from-[#755A24] via-[#D0AF70] to-[#FFDEA4]",
    sealColor: "#360C1D",
    sealIcon: "lock",
    rotation: 0,
    quote: "My dearest love... You have reached the very last envelope.",
    contentPart1: [
      "If you are reading this final letter, it means you have carried my words with you through so many days, moods, and moments.",
      "You have seen how deeply and steadily my heart beats for you in every circumstance. My promise to you is unconditional: in sunny mornings, quiet doubts, joyful laughter, and all the years still waiting for us, you are my home.",
    ],
    hasPolaroid: true,
    polaroidImg: "/polaroids/polaroid-bluff.jpg",
    polaroidCaption: "Forever and always, by your side",
    contentPart2: [
      "Happy Birthday, my love! May this year be filled with all the wonder and peace you deserve.",
      "I love you more than all the words in all these envelopes could ever say.",
    ],
    hasVoiceNote: true,
    audioDuration: "2:10",
    senderName: "Bolu",
  },
];

export const letters = LETTERS_DATA;
