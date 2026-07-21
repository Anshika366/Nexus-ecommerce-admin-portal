import { fetchProducts, fetchProductById } from "../api/productsApi";

export const publicProductsLoader = async () => {
  try {
    const products = await fetchProducts();
    return { products };
  } catch (error) {
    throw new Response("Could not load products at this time.", {
      status: 500,
    });
  }
};

export const productDetailLoader = async ({ params }) => {
  try {
    const product = await fetchProductById(params.id);
    return { product };
  } catch (error) {
    throw new Response("Product not found", { status: 404 });
  }
};
