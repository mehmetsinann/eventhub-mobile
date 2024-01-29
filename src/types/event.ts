export type Event = {
  name: string;
  description: string;
  category: string;
  start_date: Date;
  end_date: Date;
  images: string[];
  venue: {
    name: string;
    latitude: number;
    longitude: number;
    street_number: string;
    street: string;
    city: string;
    state: string;
    country: string;
    timezone: string;
  };
  is_free: boolean;
  ticket_info: {
    [key: string]: string | undefined;
  };
  rules: {
    age_limit: number;
    alcohol: boolean;
    dress_code: string;
    camera_allowed: boolean;
  };
  artists: {
    name: string;
    role: string;
  }[];
  _id: string;
  __v: number;
};
