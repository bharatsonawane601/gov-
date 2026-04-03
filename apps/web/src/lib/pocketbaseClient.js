import Pocketbase from 'pocketbase';

const POCKETBASE_API_URL = "https://sick-poetry.pockethost.io";

const pocketbaseClient = new Pocketbase(POCKETBASE_API_URL);

export default pocketbaseClient;

export { pocketbaseClient };
