"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";

type Answer = {
    option: number | null;
    freeText: string;
};

type State = {
    answers: Record<string, Answer>;
    typeName: string;
    comment: string;
    gender: string;
    animal: string;
};

type Action =
    | { type: 'SET_ANSWER'; questionId: string; answer: Answer }
    | { type: 'SET_TYPE'; typeName: string; comment: string }
    | { type: 'SET_CHARACTER_INFO'; gender: string; animal: string };

const initialState: State = {
    answers: {},
    typeName: '',
    comment: '',
    gender: '男',
    animal: 'ネコ',
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_ANSWER':
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.questionId]: action.answer
                }
            };
        case 'SET_TYPE':
            return {
                ...state,
                typeName: action.typeName,
                comment: action.comment
            };
        case 'SET_CHARACTER_INFO':
            return {
                ...state,
                gender: action.gender,
                animal: action.animal
            };
        default:
            return state;
    }
}

const DiagnosisContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export function DiagnosisProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DiagnosisContext.Provider value={{ state, dispatch }}>
            {children}
        </DiagnosisContext.Provider>
    );
}

export function useDiagnosis() {
    const context = useContext(DiagnosisContext);
    if (!context) {
        throw new Error('useDiagnosis must be used within a DiagnosisProvider');
    }
    return context;
}