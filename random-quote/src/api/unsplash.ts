const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
console.log("Unsplash API Key:", UNSPLASH_API_KEY);


export const fetchRandomImage = async (query = "nature") => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Unsplash API Error:", errorData);
      throw new Error("Failed to fetch image");
    }

    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};
