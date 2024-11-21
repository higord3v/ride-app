import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://routes.googleapis.com',
    headers: {'X-Goog-Api-Key': process.env.GOOGLE_API_KEY},
  });