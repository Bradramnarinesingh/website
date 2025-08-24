import { fetchContent } from '../lib/content';
import HomeClient from './HomeClient';

// Set revalidation time to 30 minutes (1800 seconds)
export const revalidate = 1800;

export default async function Home() {
  const content = await fetchContent();
  
  return <HomeClient content={content} />;
  }
