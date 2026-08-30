export type Update = {
  id: string;
  type: "Announcement" | "Launch" | "Challenge" | "Product Update" | "Message";
  title: string;
  message: string;
  date: string;
  featured?: boolean;
};

export const updates: Update[] = [
  {
    id: "buildquest-1-0",
    type: "Announcement",
    title: "BuildQuest 1.0 is coming 🚀",
    message:
      "BuildQuest 1.0 brings Hackathon and Ideathon challenges for builders who want to turn ideas into real products.",
    date: "Aug 29, 2026",
    featured: true,
  },
];
