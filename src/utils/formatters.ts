
// Format seconds to MM:SS
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Format seconds to HH:MM:SS
export const formatLongTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Convert YouTube time format (like 1h30m15s) to seconds
export const youtubeTimeToSeconds = (time: string): number => {
  const hours = time.match(/(\d+)h/);
  const minutes = time.match(/(\d+)m/);
  const seconds = time.match(/(\d+)s/);
  
  let totalSeconds = 0;
  if (hours) totalSeconds += parseInt(hours[1]) * 3600;
  if (minutes) totalSeconds += parseInt(minutes[1]) * 60;
  if (seconds) totalSeconds += parseInt(seconds[1]);
  
  return totalSeconds;
};

// Create a shareable link with timestamp
export const createShareableLink = (videoId: string, startTime: number): string => {
  return `https://youtu.be/${videoId}?t=${Math.floor(startTime)}`;
};
