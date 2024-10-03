import axios from "axios";

export async function getProducts() {
  const response = await axios.get(
    "http://kdt-sw-7-team02.elicecoding.com/products"
  );
  console.log(response);
  return response;
}
