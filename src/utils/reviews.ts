import { Product, Review, User } from '../types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Sony WH-1000XM5',
    category: 'Electronics',
    image: 'https://placehold.co/400x400/1e293b/FFF?text=Sony+Headphones',
    reviews: [
      { id: 'r1', rating: 5, comment: 'Best noise cancelling headphones I have ever used!', date: new Date(Date.now() - 3600000), userName: 'Anonymous' },
      { id: 'r2', rating: 4, comment: 'Great sound quality, but a bit heavy after long use.', date: new Date(Date.now() - 86400000), userName: 'Anonymous' },
    ],
    averageRating: 4.5,
    totalReviews: 2,
  },
  {
    id: '2',
    name: 'Emergency Plumbing Co.',
    category: 'Services',
    image: 'https://placehold.co/400x400/1e293b/FFF?text=Plumbing',
    reviews: [
      { id: 'r3', rating: 5, comment: 'Arrived within 30 minutes. Fixed the leak instantly.', date: new Date(Date.now() - 7200000), userName: 'Anonymous' },
    ],
    averageRating: 5,
    totalReviews: 1,
  },
  {
    id: '3',
    name: 'Nike Air Max 90',
    category: 'Fashion',
    image: 'https://placehold.co/400x400/1e293b/FFF?text=Nike+Air+Max',
    reviews: [
      { id: 'r4', rating: 4, comment: 'Classic look, very comfortable for walking.', date: new Date(Date.now() - 172800000), userName: 'Anonymous' },
      { id: 'r5', rating: 3, comment: 'Sizing runs a bit small.', date: new Date(Date.now() - 259200000), userName: 'Anonymous' },
    ],
    averageRating: 3.5,
    totalReviews: 2,
  },
  {
    id: '4',
    name: 'Dyson V15 Detect',
    category: 'Home',
    image: 'https://placehold.co/400x400/1e293b/FFF?text=Dyson+Vacuum',
    reviews: [
      { id: 'r6', rating: 5, comment: 'The laser reveals dust you never knew existed. Powerful!', date: new Date(Date.now() - 500000), userName: 'Anonymous' },
    ],
    averageRating: 5,
    totalReviews: 1,
  },
  {
    id: '5',
    name: 'Local Landscaping',
    category: 'Services',
    image: 'https://placehold.co/400x400/1e293b/FFF?text=Landscaping',
    reviews: [
      { id: 'r7', rating: 4, comment: 'Transformed our backyard. Professional team.', date: new Date(Date.now() - 43200000), userName: 'Anonymous' },
    ],
    averageRating: 4,
    totalReviews: 1,
  },
  {
    id: '6',
    name: 'MacBook Pro 14"',
    category: 'Electronics',
    image: 'https://placehold.co/400x400/1e293b/FFF?text=MacBook+Pro',
    reviews: [
      { id: 'r8', rating: 5, comment: 'Incredible performance for video editing.', date: new Date(Date.now() - 10000000), userName: 'Anonymous' },
    ],
    averageRating: 5,
    totalReviews: 1,
  },
  {
    id: '7',
    name: 'Levi\'s 501 Original',
    category: 'Fashion',
    image: 'https://placehold.co/400x400/1e293b/FFF?text=Levis+Jeans',
    reviews: [
      { id: 'r9', rating: 4, comment: 'Timeless fit. Quality denim.', date: new Date(Date.now() - 120000000), userName: 'Anonymous' },
    ],
    averageRating: 4,
    totalReviews: 1,
  },
  {
    id: '8',
    name: 'Instant Pot Duo',
    category: 'Home',
    image: 'https://placehold.co/400x400/1e293b/FFF?text=Instant+Pot',
    reviews: [
      { id: 'r10', rating: 5, comment: 'Makes cooking so much faster.', date: new Date(Date.now() - 2000000), userName: 'Anonymous' },
    ],
    averageRating: 5,
    totalReviews: 1,
  },
];

export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function addReview(
  products: Product[],
  productId: string,
  rating: number,
  comment: string,
  user?: User
): Product[] {
  return products.map((product) => {
    if (product.id !== productId) return product;

    const newReview: Review = {
      id: Date.now().toString(),
      rating,
      comment,
      date: new Date(),
      userName: user ? user.name : 'Anonymous',
      userId: user?.id,
    };

    const updatedReviews = [...product.reviews, newReview];
    return {
      ...product,
      reviews: updatedReviews,
      averageRating: calculateAverageRating(updatedReviews),
      totalReviews: updatedReviews.length,
    };
  });
}

export function deleteReview(
  products: Product[],
  productId: string,
  reviewId: string
): Product[] {
  return products.map((product) => {
    if (product.id !== productId) return product;

    const updatedReviews = product.reviews.filter(r => r.id !== reviewId);
    return {
      ...product,
      reviews: updatedReviews,
      averageRating: calculateAverageRating(updatedReviews),
      totalReviews: updatedReviews.length,
    };
  });
}

export function updateUserNameAcrossReviews(
  products: Product[],
  userId: string,
  newName: string
): Product[] {
  return products.map(product => ({
    ...product,
    reviews: product.reviews.map(review =>
      review.userId === userId ? { ...review, userName: newName } : review
    )
  }));
}

export function sortReviews(reviews: Review[], sortBy: 'newest' | 'highest' | 'lowest'): Review[] {
  const sorted = [...reviews];
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.date.getTime() - a.date.getTime());
    case 'highest':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'lowest':
      return sorted.sort((a, b) => a.rating - b.rating);
    default:
      return sorted;
  }
}