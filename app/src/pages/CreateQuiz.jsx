import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { XCircleIcon, ClipboardListIcon, PlusIcon } from "@heroicons/react/outline";
import { useStore } from "../store";
import { API } from "../api/services";

import Button from "../components/Button";
import logo from "../assets/images/logo-quizzer.png";
import Input from "../components/Input";
import Select from "../components/Select";
import Label from "../components/Label";

const makeEmptyQuizForm = () => ({ title: "", description: "", difficulty: 1, categorie: "" });
const makeEmptyQuestion = () => ({ title: "", options: ["", "", "", ""], answerIndex: 0 });
const makeEmptyQuestionForm = () => [makeEmptyQuestion()];

const CreateQuiz = () => {
  const { user, quizzes, setLoading, categories, setQuizzes } = useStore();
  const [, setLocation] = useLocation();
  const [quizForm, setQuizForm] = useState(makeEmptyQuizForm());
  const [questionsForm, setQuestionsForm] = useState(makeEmptyQuestionForm());

  function handleQuizFormChange(event) {
    const { value, name } = event.target;
    setQuizForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleQuestionFormChange(event, index) {
    let { value, name } = event.target;
    if (name === "answerIndex") value = parseInt(value, 10);

    const newState = [...questionsForm];
    newState[index] = { ...questionsForm[index], [name]: value };
    setQuestionsForm(newState);
  }

  function handleQuestionFormOptionChange(event, indexQuestion, indexOption) {
    const newState = [...questionsForm];
    newState[indexQuestion].options[indexOption] = event.target.value;
    setQuestionsForm(newState);
  }

  function addNewQuestion() {
    const newState = [...questionsForm];
    newState.push(makeEmptyQuestion());
    setQuestionsForm(newState);
  }

  function deleteQuestion(index) {
    const newState = [...questionsForm];
    newState.splice(index, 1);
    setQuestionsForm(newState);
  }

  function clearAllForm() {
    setLoading(true);
    setQuizForm(makeEmptyQuizForm());
    setQuestionsForm(makeEmptyQuestionForm());
    setTimeout(() => setLoading(false), 500);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const createdBy = user?.name || "SEM_USUARIO";
      const difficulty = parseInt(quizForm.difficulty, 10) || 1;
      const newQuiz = {
        ...quizForm,
        difficulty,
        createdBy,
        questions: [...questionsForm],
      };
      if (!newQuiz.questions.length) {
        setLoading(false);
        throw new Error("Quiz precisa ter pelo menos uma pergunta");
      }
      await API.addQuiz(newQuiz);
      setQuizzes([...quizzes, { ...newQuiz, ownerUID: user.uid, id: Math.random() * 1000 }]);
      clearAllForm();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-7xl min-h-screen p-8 bg-gradient-to-b from-gray-400 to-gray-400">
      <header className="flex flex-col gap-2 sm:flex-row justify-center sm:justify-between items-center mb-14">
        <h1 className="text-4xl font-bold flex items-center gap-4 sm:mb-0">
          <img src={logo} alt="logo" className="w-16" /> Gerenciar
        </h1>

        <div className="flex gap-4">
          <Button color="green" onClick={() => setLocation("/dashboard")}>
            <ClipboardListIcon className="w-6" />
            Voltar para gerenciar
          </Button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 w-full">
        <section className="flex mb-10 flex-col sm:gap-4 rounded-md p-4 bg-gray-500">
          <div className="flex sm:flex-row flex-col flex-1 sm:gap-4">
            <div className="flex-1 flex flex-col">
              <Label htmlFor="titleQuiz">Titulo do Quiz</Label>
              <Input
                id="titleQuiz"
                name="title"
                required
                value={quizForm.title}
                onChange={handleQuizFormChange}
              />
            </div>

            <div className="w-96 flex flex-col">
              <Label htmlFor="categorie" className="mb-2 font-semibold">
                Categoria
              </Label>
              <Select
                id="categorie"
                name="categorie"
                required
                options={categories.map((categorie) => ({
                  ...categorie,
                  text: categorie.name,
                }))}
                value={quizForm.categorie}
                onChange={handleQuizFormChange}
              />
            </div>
          </div>

          <div className="flex sm:flex-row flex-col flex-1 sm:gap-4">
            <div className="flex-1 flex flex-col">
              <Label htmlFor="description">Descri????o</Label>
              <Input
                id="description"
                name="description"
                required
                value={quizForm.description}
                onChange={handleQuizFormChange}
              />
            </div>

            <div className="w-52 flex flex-col">
              <Label htmlFor="difficulty" className="mb-2 font-semibold">
                Dificuldade
              </Label>
              <Select
                id="difficulty"
                name="difficulty"
                required
                options={[
                  { text: "F??cil", value: 1 },
                  { text: "M??dio", value: 2 },
                  { text: "Dif??cil", value: 3 },
                ]}
                value={quizForm.difficulty}
                onChange={handleQuizFormChange}
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
          {questionsForm.map((question, indexQuestion) => (
            <div
              key={"question" + indexQuestion}
              className="flex flex-col relative bg-gray-500 shadow-lg rounded-md p-6">
              <button
                type="button"
                tabIndex="-1"
                className="absolute transition-all -top-2 right-0 text-gray-100 transform translate-x-2 focus:outline-none hover:text-red-400"
                title="Excluir pergunta"
                onClick={() => deleteQuestion(indexQuestion)}>
                <XCircleIcon className="w-10" />
              </button>

              <div className="flex flex-col sm:flex-row sm:gap-4">
                <div className="flex-1 flex flex-col">
                  <Label htmlFor={"titleQuestion" + indexQuestion}>Pergunta</Label>
                  <Input
                    id={"titleQuestion" + indexQuestion}
                    name="title"
                    required
                    value={question.title}
                    onChange={(e) => handleQuestionFormChange(e, indexQuestion)}
                  />
                </div>
                <div className="w-36 flex flex-col">
                  <Label htmlFor={"answerIndex" + indexQuestion} className="mb-2 font-semibold">
                    Op????o correta
                  </Label>
                  <Select
                    type="number"
                    id={"answerIndex" + indexQuestion}
                    name="answerIndex"
                    required
                    options={[
                      { text: "Op????o 1", value: 0 },
                      { text: "Op????o 2", value: 1 },
                      { text: "Op????o 3", value: 2 },
                      { text: "Op????o 4", value: 3 },
                    ]}
                    value={question.answerIndex}
                    onChange={(e) => handleQuestionFormChange(e, indexQuestion)}
                  />
                </div>
              </div>

              <hr className="my-2" />
              <span className="mb-1 font-bold">Op????es:</span>
              {question.options.map((option, indexOption) => (
                <div
                  key={`$option-${indexQuestion}-${indexOption}`}
                  className="flex items-center gap-2 relative">
                  <span className="absolute top-2 left-3 z-10 text-black -translate-x-1/2 -translate-y-1/2">
                    {indexOption + 1 + ") "}
                  </span>
                  <Input
                    id={`$option-${indexQuestion}-${indexOption}`}
                    className="pl-8 mb-3"
                    placeholder="Op????o"
                    required
                    value={option}
                    onChange={(e) => handleQuestionFormOptionChange(e, indexQuestion, indexOption)}
                  />
                </div>
              ))}
            </div>
          ))}

          <button
            type="button"
            tabIndex="-1"
            className="bg-gray-500 shadow-lg rounded-md p-6 focus:outline-none"
            onClick={addNewQuestion}>
            <div className="border-4 p-8 rounded-md border-dotted w-full h-full flex flex-col items-center justify-center">
              <span className="text-2xl">Adicionar nova pergunta</span>
              <PlusIcon className="w-64" />
            </div>
          </button>
        </section>

        <div className="flex gap-8">
          <Button type="button" color="gray" width="full" onClick={clearAllForm}>
            Limpar todos campos
          </Button>
          <Button type="submit" width="full">
            Criar Quiz
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
