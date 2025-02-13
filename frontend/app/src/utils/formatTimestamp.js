export const formatTimestamp = (isoString) => {
    if (!isoString) return "";
  
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      month: "short", // "Feb"
      day: "2-digit", // "13"
      year: "numeric", // "2025"
      hour: "numeric", // "3"
      minute: "2-digit", // "17"
      hour12: true, // AM/PM format
    });
  };