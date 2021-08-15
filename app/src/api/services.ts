import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { QuizDataProps } from "../@types/types.props";
import { firebaseConfig } from "../config/firebase.config";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const auth = firebase.auth();

const getCurrentDate = () => {
  const today = new Date();
  let mes = (today.getMonth() + 1).toString();
  mes = mes.length ? "0" + mes : mes;
  const dia = today.getDate();
  const year = today.getFullYear();
  return dia + "/" + mes + "/" + year;
};

export const API = {
  database: database,
  auth: auth,
  singleUserRef: (uid: string) => database.ref("users/" + uid),

  addQuiz: async (quiz: QuizDataProps) => {
    try {
      const quizToDB = {
        ...quiz,
        ownerUID: auth.currentUser.uid,
        createdAt: getCurrentDate(),
      };
      const resp = await database
        .ref("quizes/")
        .push(quizToDB)
        .then(async (res) => {
          const id = res.key;
          return await database.ref("quizes/" + id + "/").update({ id: id });
        });
      if (resp) return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  updateUserXpLevel: async (xp: number, level: number, uid: string) => {
    try {
      const resp = await database.ref("users/" + uid).update({
        xp: xp,
        level: level,
      });

      if (resp) return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  addAcomplishedQuiz: async (
    quizId: string,
    uid: string,
    rightAnswersCount: number,
    totalQuestions: number,
  ) => {
    try {
      let acomplishedQuizzes = [];
      const data = {
        quizId: quizId,
        rightAnswersCount: rightAnswersCount,
        totalQuestions: totalQuestions,
      };
      const ref = await database.ref("users/" + uid).once("value");
      const userDB = ref.val();

      if (userDB) {
        if (userDB.acomplishedQuizzes) {
          acomplishedQuizzes = userDB.acomplishedQuizzes;
          acomplishedQuizzes.push(data);
        } else {
          acomplishedQuizzes.push(data);
        }
      }

      const resp = await database.ref("users/" + uid).update({
        acomplishedQuizzes: acomplishedQuizzes,
      });

      if (resp) return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getAllQuizzes: async () => {
    try {
      const ref = database.ref(`quizes/`);
      const resp = (await ref.once("value")).val();
      if (resp) return resp;
      else return {};
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getAllCategories: async () => {
    try {
      const ref = database.ref(`quizCategories/`);
      const resp = (await ref.once("value")).val();
      if (resp) return resp;
      else return {};
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getStudents: async () => {
    try {
      const ref = database.ref(`users/`).orderByChild("usertype").equalTo("aluno");
      const resp = (await ref.once("value")).val();
      if (resp) return resp;
      else return {};
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getQuizByCategorie: async (categorie: string) => {
    try {
      const ref = database.ref(`quizes/`).orderByChild("categorie").equalTo(categorie);
      const resp = (await ref.once("value")).val();
      if (resp) return resp;
      else return {};
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getQuizById: async (quizUID: string) => {
    try {
      const ref = database.ref(`quizes/${quizUID}`);
      const quiz = (await ref.once("value")).val();
      if (quiz) return quiz;
      else return {};
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getUserById: async (userUID: string) => {
    try {
      const ref = database.ref(`users/${userUID}`);
      const user = (await ref.once("value")).val();
      if (user) return user;
      else return {};
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getQuizByUserId: async (userId: string) => {
    try {
      const ref = database.ref(`quizes/`).orderByChild("ownerUID").equalTo(userId);
      const quiz = (await ref.once("value")).val();
      if (quiz) return quiz;
      else return {};
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
