export type Update = {
  id: string;
  type: "Announcement" | "Launch" | "Challenge" | "Product Update" | "Message";
  title: string;
  message: string;
  date: string;
  featured?: boolean;
  status?: "New" | "Important" | "Coming Soon";
};

export const updates: Update[] = [
  {
    id: "welcome",
    type: "Announcement",
    title: "Welcome to BuildQuest",
    message:
      "BuildQuest is your space to discover challenges, learn, build projects, and keep shipping.",
    date: "August 2026",
    featured: true,
  },

  {
    id: "toolkit",
    type: "Product Update",
    title: "Developer Toolkit is live",
    message:
      "Explore curated documentation, UI libraries, templates, APIs, deployment tools, and learning resources.",
    date: "August 2026",
  },

  // Add your future updates here 👇
  // {
  //   id: "your-update-id",
  //   type: "Launch",
  //   title: "Your Update Title",
  //   message: "Write your announcement here.",
  //   date: "August 30, 2026",
  //   featured: true,
  // },
];
