
export interface Subreddit {
  name: string;
  displayName: string;
  description: string;
  memberCount: number;
  onlineCount: number;
  createdAt: string;
  bannerImage?: string;
  icon?: string;
  isNSFW: boolean;
  tags: string[];
  rules: {
    title: string;
    description: string;
  }[];
}

export const subreddits: Record<string, Subreddit> = {
  AskReddit: {
    name: "AskReddit",
    displayName: "Ask Reddit",
    description: "Ask Reddit is the place to ask and answer thought-provoking questions.",
    memberCount: 42100000,
    onlineCount: 89543,
    createdAt: "Jan 25, 2008",
    bannerImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=200&fit=crop",
    isNSFW: false,
    tags: ["Discussion", "Community", "Questions"],
    rules: [
      {
        title: "No personal information",
        description: "Do not post or request personal information."
      },
      {
        title: "Be respectful",
        description: "Remember the human. Treat others with respect."
      }
    ]
  },
  Baking: {
    name: "Baking",
    displayName: "Baking",
    description: "For all your baking needs! Recipes, ideas, and pictures of your edible creations.",
    memberCount: 2400000,
    onlineCount: 4215,
    createdAt: "Apr 15, 2010",
    bannerImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=200&fit=crop",
    isNSFW: false,
    tags: ["Food", "Cooking", "Recipes"],
    rules: [
      {
        title: "No memes",
        description: "No memes or low-quality content. Focus on the baking!"
      },
      {
        title: "Include recipe",
        description: "If posting food, include the recipe in the comments."
      }
    ]
  },
  movies: {
    name: "movies",
    displayName: "Movies",
    description: "News and discussion about major motion pictures.",
    memberCount: 31400000,
    onlineCount: 34126,
    createdAt: "Jan 25, 2008",
    bannerImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=200&fit=crop",
    isNSFW: false,
    tags: ["Entertainment", "Film", "Cinema"],
    rules: [
      {
        title: "No spoilers in titles",
        description: "Don't put spoilers in your title. Use the spoiler tag when appropriate."
      }
    ]
  },
  science: {
    name: "science",
    displayName: "Science",
    description: "The Science subreddit is a place to share new findings. Read about the latest advances in astronomy, biology, medicine, physics, social science, and more.",
    memberCount: 28900000,
    onlineCount: 12543,
    createdAt: "Mar 14, 2006",
    bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=200&fit=crop",
    isNSFW: false,
    tags: ["Research", "Education", "Technology"],
    rules: [
      {
        title: "Directly link to peer-reviewed research",
        description: "Link posts should be peer-reviewed research."
      },
      {
        title: "No memes or jokes",
        description: "Keep content factual and high quality."
      }
    ]
  },
  cats: {
    name: "cats",
    displayName: "Cats",
    description: "Pictures, videos, questions, and articles featuring cats.",
    memberCount: 5300000,
    onlineCount: 9874,
    createdAt: "Jan 15, 2008",
    bannerImage: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1200&h=200&fit=crop",
    isNSFW: false,
    tags: ["Pets", "Animals", "Felines"],
    rules: [
      {
        title: "Cat content only",
        description: "All posts must contain cat content."
      }
    ]
  },
  pcmasterrace: {
    name: "pcmasterrace",
    displayName: "PC Master Race",
    description: "Welcome to the PC Master Race. Ascend to a level that respects your eyes, your wallet, your mind, and your heart.",
    memberCount: 7100000,
    onlineCount: 14567,
    createdAt: "Feb 22, 2011",
    bannerImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=200&fit=crop",
    isNSFW: false,
    tags: ["Gaming", "Technology", "PC Building"],
    rules: [
      {
        title: "Harassment",
        description: "No harassment, witch-hunting, sexism, racism or hate speech."
      }
    ]
  },
  travel: {
    name: "travel",
    displayName: "Travel",
    description: "r/travel is a community about exploring the world. Your picture, video, or discussion could be the inspiration for someone else's adventure.",
    memberCount: 8500000,
    onlineCount: 7623,
    createdAt: "Jan 25, 2008",
    bannerImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200&h=200&fit=crop",
    isNSFW: false,
    tags: ["Adventure", "Tourism", "Exploration"],
    rules: [
      {
        title: "Be specific",
        description: "Questions need to be as specific as possible."
      }
    ]
  },
  cscareerquestions: {
    name: "cscareerquestions",
    displayName: "CS Career Questions",
    description: "A subreddit for those with questions about computer science careers.",
    memberCount: 960000,
    onlineCount: 3421,
    createdAt: "Sep 12, 2011",
    bannerImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=200&fit=crop",
    isNSFW: false,
    tags: ["Career", "Programming", "Tech Industry"],
    rules: [
      {
        title: "No clickbait titles",
        description: "Don't use clickbait, misleading, or vague titles."
      }
    ]
  },
  natureisbeautiful: {
    name: "natureisbeautiful",
    displayName: "Nature Is Beautiful",
    description: "A showcase of the beautiful aspects of nature.",
    memberCount: 3700000,
    onlineCount: 5490,
    createdAt: "May 4, 2015",
    bannerImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=200&fit=crop",
    isNSFW: false,
    tags: ["Nature", "Photography", "Landscapes"],
    rules: [
      {
        title: "Original content",
        description: "Only post original content or with proper credit."
      }
    ]
  }
};
