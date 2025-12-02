// Tipos compartidos para el sistema de biblioteca

export interface User {
  name: string;
  rut: string;
  address: string;
  phone: string;
  photo: string;
  recentLoans: string[];
  penalties: string;
}

export interface Book {
  id?: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  copies: number;
  coverImage: string;
  isbn?: string;
  availability?: string;
  summary?: string;
  publisher?: string;
  category?: string;
}

export interface LoanRecord {
  isbn: string;
  bookTitle: string;
  bookAuthor: string;
  bookYear: number;
  bookGenre: string;
  bookCover: string;
  userName: string;
  userRut: string;
  userAddress: string;
  userPhone: string;
  userPhoto: string;
  userRecentLoans: string[];
  userPenalties: string;
  loanDate: string;
  dueDate: string;
  isOverdue: boolean;
}

export interface PendingRequest {
  id: number;
  title: string;
  duration: string;
}
