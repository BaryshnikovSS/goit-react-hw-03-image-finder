import axios from "axios";

let currentQuery;

export const fetchGallery = async (page = 1, query) => {

  if (query) currentQuery = query;

  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}?q=${currentQuery}&page=${page}&key=${process.env.REACT_APP_USER_KEY}&image_type=photo&orientation=horizontal&per_page=${process.env.REACT_APP_PER_PAGE}`
    );
    return data.data.hits;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};