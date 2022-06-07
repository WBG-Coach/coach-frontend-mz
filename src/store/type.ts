export type User = {
  id?: number;
  name?: string;
  email?: string;
  profile_id?: number;
  created_at?: Date;
  updated_at?: Date;
  image_url?: string;
  selectedSchool?: School;
  subject?: string;
};

export type School = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  image_url: string;
};

export type Questionnaire = {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
};

export type Application = {
  id: number;
  questionnaire_id: number;
  coach_id: number;
  teacher_id: number;
  created_at: Date;
  updated_at: Date;
  school_id: number;
  questionnaire: Questionnaire;
};

export type Option = {
  id: number;
  question_id: number;
  selected_color: string | null;
  selected_icon: string | null;
  text: string;
};

export type Question = {
  id: number;
  question_id: number;
  created_at: Date;
  updated_at: Date;
  questionnaire_id: number;
  question: {
    id: number;
    competency_id: number;
    created_at: Date;
    updated_at: Date;
    text: string;
    options: Option[];
    competence: {
      id: number;
      name: string;
      matrix_id: number;
      created_at: Date;
      updated_at: Date;
    };
  };
};
