
export interface StartupNewsItem {
  id: number;
  title: string;
  summary: string;
  content?: string;
  source: string;
  url: string;
  imageUrl?: string;
  category: string;
  publishedAt: string;
  company: string;
  funding?: string;
  tags?: string[];
}
