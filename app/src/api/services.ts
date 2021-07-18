import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { QuizDataProps } from "../@types/types.props";
import { firebaseConfig } from "../config/firebase.config";
import { quizzes } from "./quizzes";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const auth = firebase.auth();

export const addQuizTabela = async (quiz: QuizDataProps) => {
  try {
    const quizToDB = {
      ...quiz,
      ownerUID: auth.currentUser.uid,
      createdAt: new Date().toString(),
    };
    const resp = await database.ref("quizes/").push(quizToDB);
    if (resp) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getQuizByType = async (type: string) => {
  try {
    const ref = database.ref(`quizes/`).orderByChild("type").equalTo(type);
    const quiz = (await ref.once("value")).val();
    if (quiz) return quiz;
    else return {};
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getQuizById = async (quizUID: string) => {
  try {
    const ref = database.ref(`quizes/${quizUID}`);
    const quiz = (await ref.once("value")).val();
    if (quiz) return quiz;
    else return {};
  } catch (error) {
    console.log(error);
    return false;
  }
};
