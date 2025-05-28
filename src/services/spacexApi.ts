import axios from 'axios';
import { Launch } from '../types/Launch';

const BASE_URL = 'https://api.spacexdata.com/v5/launches';

export async function fetchUpcomingLaunches(): Promise<Launch[]> {
  try {
    const response = await axios.get(`${BASE_URL}/upcoming`);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming launches:', error);
    throw error;
  }
}

export async function fetchPastLaunches(page = 1, limit = 10): Promise<Launch[]> {
  try {
    const response = await axios.get(`${BASE_URL}/past`);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return response.data.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Error fetching past launches:', error);
    throw error;
  }
}

export async function fetchLatestLaunch(): Promise<Launch> {
  try {
    const response = await axios.get(`${BASE_URL}/latest`);
    return response.data;
  } catch (error) {
    console.error('Error fetching latest launch:', error);
    throw error;
  }
}