import axios from "axios";

const API_URL = "https://api.freeapi.app/api/v1/public/randomproducts";

export async function getRandomProducts(page = 1, limit = 10) {
  try {
    const res = await axios.get(API_URL, { params: { page, limit } });
    const meta = res?.data?.data || {};
    const products = meta.data || [];
    return { products, meta };
  } catch (error) {
    console.error("Failed to fetch random products:", error);
    throw error;
  }
}

export default getRandomProducts;
