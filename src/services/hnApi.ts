import { API_BASE_URL } from '../utils/constants';

export interface Story {
  id: number;
  by: string;
  descendants?: number;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url?: string;
  text?: string;
}

export interface Comment {
  id: number;
  by: string;
  kids?: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
  deleted?: boolean;
  dead?: boolean;
}

export interface User {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
}

export type Item = Story | Comment;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
}

export async function getTopStories(): Promise<number[]> {
  return fetchJson<number[]>(`${API_BASE_URL}/topstories.json`);
}

export async function getNewStories(): Promise<number[]> {
  return fetchJson<number[]>(`${API_BASE_URL}/newstories.json`);
}

export async function getBestStories(): Promise<number[]> {
  return fetchJson<number[]>(`${API_BASE_URL}/beststories.json`);
}

export async function getAskStories(): Promise<number[]> {
  return fetchJson<number[]>(`${API_BASE_URL}/askstories.json`);
}

export async function getShowStories(): Promise<number[]> {
  return fetchJson<number[]>(`${API_BASE_URL}/showstories.json`);
}

export async function getJobStories(): Promise<number[]> {
  return fetchJson<number[]>(`${API_BASE_URL}/jobstories.json`);
}

export async function getItem(id: number): Promise<Item | null> {
  const item = await fetchJson<Item | null>(`${API_BASE_URL}/item/${id}.json`);
  return item;
}

export async function getUser(username: string): Promise<User | null> {
  return fetchJson<User | null>(`${API_BASE_URL}/user/${username}.json`);
}

export async function getMaxItemId(): Promise<number> {
  return fetchJson<number>(`${API_BASE_URL}/maxitem.json`);
}

