export interface BlogPost {
  id: string | number;
  title: string;
  content: string;
  thumbnail?: string | null;
  tags?: string[];
  views: number;
  _count?: {
    comments: number;
  };
  isFeatured?: boolean;
}
export interface Medicine {
  id: string
  name: string
  description: string
  price: number
  stock: number
  manufacturer: string
  image:string
  // sellerId: string
  // categoryId: string
  // createdAt: string // ISO date string
  // updatedAt: string // ISO date string
}
