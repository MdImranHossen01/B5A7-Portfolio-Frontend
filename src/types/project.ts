export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl?: string;
  projectUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  metaTitle?: string;
  metaDesc?: string;
  metaImage?: string;
  author: {
    id: string;
    username?: string;
  };
}

export interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl?: string;
  projectUrl?: string;
  liveUrl?: string;
  featured: boolean;
  metaTitle?: string;
  metaDesc?: string;
  metaImage?: string;
}