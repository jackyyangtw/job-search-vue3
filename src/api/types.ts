export interface Job {
[x: string]: any;
  id: number;
  title: string;
  organization: string;
  degree: string;
  jobType: string;
  locations: string[];
  minimumQualifications: string[];
  preferredQualifications: string[];
  description: string[];
  dateAdded: string;
}

export interface Degree {
  id: number;
  degree: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  image: string;
  querys: string[];
}