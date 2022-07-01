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
  answers?: Answer[];
};

export type School = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  image_url: string;
  users: { user: User }[];
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
  feedback_questionnaire_id: number;
  coach_id: number;
  teacher_id: number;
  created_at: Date;
  updated_at: Date;
  school_id: number;
  teacher: User;
  notes: Note[];
  application_date: Date;
  questionnaire: Questionnaire;
};

export type Option = {
  id: number;
  question?: Question;
  question_id: number;
  selected_color: string | null;
  selected_icon: string | null;
  content_guide_id?: number;
  text: string;
};

export type Competence = {
  id: number;
  title: string;
  subtitle: string;
  matrix_id: number;
  description: string;
  content_guide_id?: number;
};

export type Question = {
  id: number;
  type: string;
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

export type QuestionnaireQuestion = {
  id: number;
  created_at: Date;
  updated_at: Date;
  question_id: number;
  questionnaire_id: number;
  questionnaire?: Questionnaire;
  competence?: Competence;
  question: Question;
};

export type Answer = {
  id?: number;
  questionnaire_question_id: number;
  notes?: string;
  option_id: number;
  option?: Option;
  files?: { url: string }[];
};

export type AnswerQuestionnaire = {
  questionnaire_application_id: number;
  answers: Answer[];
};

export type AnswerFile = {
  url: string;
  name: string;
};

export type Feedback = {
  id?: number;
  questionnaire_application_id?: number;
  questionnaire_application?: Application;
  competence_id?: number;
  competence?: Competence;
  answer_id: number;
  feedback_answers: {
    notes: string;
    questionnaire_question_id: number;
    questionnaire_question?: { question: Question };
  }[];
};

export type ContentGuide = {
  id: number;
  text: string;
};
