
import React from 'react';
import NewsCard, { NewsItem } from './NewsCard';
import { Button } from '@/components/ui/button';

// Mock data for startup news
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'AI Startup Raises $50M to Revolutionize Healthcare Diagnostics',
    summary: 'MediAI has secured $50 million in Series B funding led by Sequoia Capital to expand its AI-powered diagnostic platform that can detect early signs of diseases from medical images.',
    source: 'TechCrunch',
    url: 'https://example.com/news/1',
    publishedAt: 'May 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop',
    category: 'Funding',
    content: `
      <p>MediAI, the healthcare AI startup founded in 2022, announced today that it has raised $50 million in Series B funding led by Sequoia Capital, with participation from existing investors a16z and Y Combinator.</p>
      
      <p>The company's flagship product, DiagnosAI, uses deep learning algorithms to analyze medical images and detect early signs of diseases such as cancer, Alzheimer's, and cardiovascular conditions. The platform has shown remarkable accuracy in early clinical trials, with a detection rate 30% higher than traditional diagnostic methods.</p>
      
      <p>"This funding will allow us to expand our team of AI researchers and medical experts," said Dr. Sarah Chen, CEO and co-founder of MediAI. "We're working to make advanced diagnostics accessible to everyone, regardless of geographic location or economic status."</p>
      
      <p>The company plans to use the fresh capital to obtain FDA clearance for its technology and scale its operations across major hospitals in the United States before expanding internationally.</p>
      
      <p>Healthcare AI startups have been gaining significant investor attention this year, with over $2.7 billion invested in the sector during Q1 2025 alone. MediAI's latest funding round values the company at $300 million, a significant jump from its $75 million valuation during its Series A round just 10 months ago.</p>
    `
  },
  {
    id: '2',
    title: 'Climate Tech Startup Launches Innovative Carbon Capture Solution',
    summary: 'EcoCapture unveils a breakthrough technology that can capture carbon dioxide directly from the atmosphere at 30% lower cost than existing solutions.',
    source: 'Bloomberg Green',
    url: 'https://example.com/news/2',
    publishedAt: 'May 14, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=500&h=300&fit=crop',
    category: 'CleanTech',
    content: `
      <p>EcoCapture, a climate tech startup based in Berlin, has unveiled a breakthrough carbon capture technology that promises to remove CO2 from the atmosphere at a cost 30% lower than current industry standards.</p>
      
      <p>The company's technology, called AirSponge, uses a novel porous material developed by the company's founders at the Technical University of Munich. The material can absorb carbon dioxide from ambient air with unprecedented efficiency, requiring significantly less energy than existing direct air capture (DAC) methods.</p>
      
      <p>"Our technology represents a major leap forward in making carbon removal economically viable," said Klaus Weber, CEO of EcoCapture. "With AirSponge, we can bring the cost down to below $100 per ton of CO2 captured, compared to the $150-200 range of existing solutions."</p>
      
      <p>EcoCapture has already secured partnerships with three major European industrial companies who will be the first to deploy the technology at scale. The startup plans to have its first commercial-scale carbon capture plant operational by the end of 2025, with the capacity to remove 10,000 tons of CO2 annually.</p>
      
      <p>Climate tech investors have taken notice. EcoCapture recently closed a €40 million Series A funding round led by Breakthrough Energy Ventures, with participation from European climate tech funds and the European Innovation Council.</p>
    `
  },
  {
    id: '3',
    title: 'Fintech Unicorn Expands to Southeast Asian Markets',
    summary: 'Digital banking platform MoneyWise, valued at $2.5 billion, announces expansion to Indonesia, Vietnam, and Thailand following successful operations in Singapore.',
    source: 'Financial Times',
    url: 'https://example.com/news/3',
    publishedAt: 'May 13, 2025',
    category: 'Expansion',
    content: `
      <p>Digital banking platform MoneyWise announced its expansion into three major Southeast Asian markets today, following its successful operations in Singapore over the past two years.</p>
      
      <p>The fintech unicorn, currently valued at $2.5 billion after its latest funding round, will begin offering its services in Indonesia, Vietnam, and Thailand in Q3 2025. MoneyWise offers a comprehensive suite of digital banking services, including accounts with no minimum balance, free international transfers, and AI-powered financial planning tools.</p>
      
      <p>"Southeast Asia represents one of the most exciting fintech opportunities globally," said Michelle Tan, CEO and founder of MoneyWise. "With over 660 million people and rapidly increasing smartphone penetration, we see enormous potential for digital-first banking solutions in the region."</p>
      
      <p>The company has secured the necessary regulatory approvals and partnerships with local financial institutions in all three countries. MoneyWise's expansion comes as fintech investment in Southeast Asia reached a record $4.7 billion in 2024, up 35% from the previous year.</p>
      
      <p>The company also announced it has surpassed 3 million users on its platform and is processing over $500 million in transactions monthly. Industry analysts expect MoneyWise to pursue an IPO within the next 18-24 months, potentially becoming one of the region's most valuable fintech listings.</p>
    `
  },
  {
    id: '4',
    title: 'Web3 Startup Secures $30M to Build Decentralized Social Network',
    summary: 'Blockchain-based social media platform SocialChain has raised $30M in seed funding to create a user-owned network that gives control back to content creators.',
    source: 'CoinDesk',
    url: 'https://example.com/news/4',
    publishedAt: 'May 12, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=300&fit=crop',
    category: 'Web3',
    content: `
      <p>SocialChain, a Web3 startup building a decentralized social media platform, has raised $30 million in seed funding from a consortium of crypto-native venture capital firms, including Paradigm, a16z crypto, and Multicoin Capital.</p>
      
      <p>The platform aims to disrupt traditional social networks by creating a user-owned ecosystem where content creators maintain ownership of their data and receive direct compensation for their contributions through the platform's native token, $SOCIAL.</p>
      
      <p>"We're building a social network that puts users first, not advertisers," explained Alex Rivera, CEO and co-founder of SocialChain. "Our platform is designed to be community-owned and community-governed, with transparency and fair compensation at its core."</p>
      
      <p>SocialChain's protocol is built on Solana, chosen for its high throughput and low transaction costs. The platform includes features like content monetization through NFTs, decentralized content moderation, and tokenized reputation systems.</p>
      
      <p>The seed round's size is notable, especially in the current market environment where Web3 funding has cooled compared to the 2021-2022 boom. However, decentralized social platforms have seen renewed interest following user dissatisfaction with content moderation and monetization policies on traditional social networks.</p>
      
      <p>SocialChain plans to launch its beta version in September 2025, with a full public release scheduled for early 2026.</p>
    `
  },
  {
    id: '5',
    title: 'Food Delivery Robotics Company Announces IPO Plans',
    summary: 'DeliverBot, which operates a fleet of autonomous delivery robots in 12 major cities, has filed for an initial public offering, seeking a $1.2B valuation.',
    source: 'Wall Street Journal',
    url: 'https://example.com/news/5',
    publishedAt: 'May 11, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&h=300&fit=crop',
    category: 'IPO',
    content: `
      <p>DeliverBot, the autonomous robotics company that has transformed urban food delivery, has filed for an initial public offering, according to documents submitted to the Securities and Exchange Commission yesterday.</p>
      
      <p>The company, which operates a fleet of over 2,000 autonomous delivery robots across 12 major U.S. cities, is seeking a valuation of $1.2 billion. DeliverBot has partnered with more than 5,000 restaurants and processes approximately 150,000 deliveries daily.</p>
      
      <p>"This IPO represents the next chapter in our mission to revolutionize last-mile delivery," said Robert Chen, CEO of DeliverBot. "The capital raised will accelerate our expansion into new markets and fuel our R&D efforts for the next generation of delivery robots."</p>
      
      <p>DeliverBot's S-1 filing reveals that the company generated $187 million in revenue in 2024, a 112% increase from the previous year. While the company is not yet profitable, it has significantly reduced its losses from $56 million in 2023 to $22 million in 2024.</p>
      
      <p>The company's robots, which navigate sidewalks autonomously using a combination of cameras, LiDAR, and AI, have completed over 15 million deliveries since the company's founding in 2021. DeliverBot claims its service reduces delivery costs by up to 40% compared to human courier services, while also reducing carbon emissions associated with traditional delivery vehicles.</p>
      
      <p>DeliverBot's IPO is being underwritten by Goldman Sachs and Morgan Stanley, with the company expected to list on the Nasdaq under the ticker symbol "DBOT" in June 2025.</p>
    `
  }
];

// Export mock news for reuse in NewsDetail
export { mockNews };

const NewsList = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Startup News</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs bg-transparent border-sidebar-border text-gray-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            Latest
          </Button>
          <Button variant="outline" className="text-xs bg-transparent border-sidebar-border text-gray-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            Trending
          </Button>
          <Button variant="outline" className="text-xs bg-transparent border-sidebar-border text-gray-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            Funding
          </Button>
        </div>
      </div>
      
      {mockNews.map(news => (
        <NewsCard key={news.id} news={news} />
      ))}
      
      <div className="flex justify-center mt-6">
        <Button className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground">
          Load More News
        </Button>
      </div>
    </div>
  );
};

export default NewsList;
