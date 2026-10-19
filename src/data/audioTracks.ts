export interface AudioTrack {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  src: string;
  characterImage: string;
  characterName: string;
  themeColor: string;
  themeIcon: string;
  accentClass: string;
  gradientClass: string;
  noteColor: string;
  borderColor: string;
}

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 1,
    title: 'Track 1',
    subtitle: 'Anime Sunset Lofi',
    duration: '03:12',
    src: '/assets/audio/track-1.mp3',
    characterImage: '/assets/character/chibi_sunset_pose.png',
    characterName: 'Sunset Boy',
    themeColor: '#f97316',
    themeIcon: '☀️',
    accentClass: 'text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100',
    gradientClass: 'from-[#fff7eb] via-[#ffedd5] to-[#ffe4e6]',
    noteColor: '#f59e0b',
    borderColor: '#fed7aa',
  },
  {
    id: 2,
    title: 'Track 2',
    subtitle: 'Peaceful Sakura Breeze',
    duration: '04:28',
    src: '/assets/audio/track-2.mp3',
    characterImage: '/assets/character/chibi_sakura_pose.png',
    characterName: 'Sakura Boy',
    themeColor: '#ec4899',
    themeIcon: '🌸',
    accentClass: 'text-pink-700 bg-pink-50 border-pink-200 hover:bg-pink-100',
    gradientClass: 'from-[#fff1f5] via-[#fce7f3] to-[#f3e8ff]',
    noteColor: '#ec4899',
    borderColor: '#fbcfe8',
  },
  {
    id: 3,
    title: 'Track 3',
    subtitle: 'Chill Coding Melody',
    duration: '03:56',
    src: '/assets/audio/track-3.mp3',
    characterImage: '/assets/character/chibi_coding_pose.png',
    characterName: 'Coding Boy',
    themeColor: '#3b82f6',
    themeIcon: '🐱',
    accentClass: 'text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100',
    gradientClass: 'from-[#eff6ff] via-[#dbeafe] to-[#e0e7ff]',
    noteColor: '#3b82f6',
    borderColor: '#bfdbfe',
  },
];
