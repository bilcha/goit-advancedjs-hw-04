import axios from "axios";

export async function getPageData(criteria, page) {
  const options = {
    key: "40976601-7e2fe02ca8efc6be3b00881e0",
    q: criteria,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page,
    per_page: 40
  }
  return axios.get("https://pixabay.com/api/", {params: options});
}
