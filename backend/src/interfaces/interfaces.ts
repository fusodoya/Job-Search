import exp from "constants";
import e, { Request } from "express";

export interface IUser {
  userID: string;
  username: string;
  email: string;
  password: string;
  is_verified: boolean;
  verification_code: string;
  createdAt: string;
}

export interface IJwtPayload {
  userID: string;
  isVerified: boolean;
}

// IVerifiedRequest replacement
export interface IVerifiedRequest extends Request {
  body: {
    userID: string;
    isVerified: boolean;
  };
}

export interface ILoginRequest extends Request {
  body: {
    email: string;
    password: string;
    // tuan: string;
  };
}

export interface IRegisterRequest extends Request {
  body: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
}

export interface IVerifyAccountRequest extends IVerifiedRequest {
  body: IVerifiedRequest["body"] & {
    code: string;
  };
}

export interface IGetVerifyCodeRequest extends Request {
  body: {
    email: string;
  };
}

export interface IResetPasswordRequest extends Request {
  body: {
    email: string;
    password: string;
    code: string;
  };
}

export interface IGetUserProfileRequest extends Request {
  body: {
    userID: string;
  };
}

interface Address {
  district: string;
  city_state: string;
  zip_code: string;
  country: string;
}

interface Description {
  company_size: number[];
  industry: string;
  headquarters: string;
  links: string[];
  founded: Date;
  specialities: string[];
}

interface IReview {
  user_id: string;
  rating: number;
  review: string;
  date: Date;
}

interface IJob {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  requirements: string[];
  employmentType: string; // e.g., Full-time, Part-time
  workMode: string; // e.g., On-site, Remote
  applicantCount: number; // Số lượng ứng viên
  level: string; // e.g., Internship, Entry-level, Mid-level, Senior-level
}

interface IQA {
  question: string;
  answer: string;
}

interface ICompany {
  _id?: string;
  owner_id?: string;
  admin_id?: string[];

  // Header
  company_name: string;
  sumRating: number;
  applicant?: string[];
  employees?: string[];
  followers?: string[];

  // Snapshot
  address?: Address;
  description: Description;
  short_description: string;
  legal_document_url?: string;

  // Jobs
  jobs: IJob[];

  // Reviews
  reviews: IReview[];

  // QA
  qa: IQA[];
}

export default ICompany;
