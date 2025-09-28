export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured: boolean;
  published: boolean;
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

export interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured: boolean;
  published: boolean;
  metaTitle?: string;
  metaDesc?: string;
  metaImage?: string;
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  search?: string;
}