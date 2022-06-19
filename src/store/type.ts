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

export type Note = {
  id: number;
  text: string;
  created_at: Date;
  updated_at: Date;
  questionnaire_application_id: number;
};

export type Application = {
  id: number;
  status: string;
  questionnaire_id: number;
  coach_id: number;
  teacher_id: number;
  created_at: Date;
  updated_at: Date;
  school_id: number;
  teacher: User;
  notes: Note[];
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
      title: string;
      subtitle: string;
      description: string;
      matrix_id: number;
      created_at: Date;
      updated_at: Date;
    };
  };
};

export type Answer = {
  questionnaire_question_id: number;
  notes?: string;
  option_id: number;
};

export type AnswerQuestionnaire = {
  questionnaire_application_id: number;
  answers: Answer[];
};

export type AnswerFile = {
  url: string;
  name: string;
};
