export interface Employee {
  dui?: string;
  names?: string;
  lastnames?: string;
  email?: string;
  birthdate?: string;
  address?: string;
  telephone?: string;
  vaccunation_status?: boolean;
  vaccunation_data?: vaccunation_data;
}

interface vaccunation_data {
  type?: string;
  date?: string;
  dose?: string;
}
