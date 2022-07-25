import React, { useState } from 'react'

import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'

import OCDScoreModal from '../../components/OCDScoreModal'
import YBOCS from '../../../data/ocd'

export default function OCD() {
  const { questions, options, conversion, descriptions, important } = YBOCS

  const tempArr = new Array(questions.length).fill(-1)
  const initialValues = { ...tempArr }
  const validationSchema = new Array(questions.length).fill(
    Yup.number().moreThan(-1, '请完成这一题').required('Required')
  )
  const [scoreVisible, setScoreVisible] = useState(false)
  const [score, setScore] = useState(0)
  // 强迫测试是有两项的，需要根据两项的得分进行测评
  const [scoreArr, setScoreArr] = useState([0, 0])
  const visibleArr = new Array(questions.length).fill(false)
  important.forEach((questionIndex) => {
    visibleArr[questionIndex] = true
  })
  const [questionsVisible, setQuestionsVisible] = useState(visibleArr)

  const setOCD = () => {
    console.log('setOCD')
  }

  const selectHandler = (index, optionIndex, values, touched) => {
    if (important.includes(index)) {
      const visible = questionsVisible
      if (optionIndex === 0) {
        let { jump } = questions[index]
        while (jump > 0) {
          visible[index + jump] = false
          values[index + jump] = 0
          jump -= 1
        }
      } else {
        let { jump } = questions[index]
        while (jump > 0) {
          visible[index + jump] = true
          values[index + jump] = -1
          touched[index + jump] = false
          jump -= 1
        }
      }
      setQuestionsVisible([...visible])
    }
  }

  return (
    <div className="bg-white pt-4 pb-10 px-6">
      {/* 隐藏 */}
      <Toaster />
      <OCDScoreModal
        scoreVisible={scoreVisible}
        score={score}
        scoreArr={scoreArr}
        descriptions={descriptions}
        onChange={(visible) => {
          setScoreVisible(visible)
        }}
      />
      {/* ************ */}
      <h1 className="text-3xl font-bold">强迫测试</h1>
      <div className="divider my-1"></div>
      <h2 className="text-lg font-semibold">注意事项</h2>
      <p className="text-base font-semibold mt-1">
        严格意义上来说，本测试的被试应该为有强迫行为的人，如果您完全没有强迫行为可以不进行此测试。
      </p>
      <p className="text-base font-semibold mt-1">
        本测试仅供参考，不作指导意见。本测试主要用于疗效评估，不能用于诊断。
      </p>
      <div className="text-base">
        <p className="my-1">
          下面有最多 10 道题目，请仔细阅读每一条，把意思弄明白。
        </p>
        <p className="my-1">
          <span className="font-semibold">说明：</span>
          根据你最近一周的实际情况进行选择
        </p>
      </div>
      <div className="mt-6">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={(values, { setSubmitting }) => {
            console.log('submit')
            let score = 0
            let score1 = 0
            let score2 = 0
            for (let index in values) {
              if (index < 5) {
                score1 += Number.parseInt(values[index], 10)
              } else {
                score2 += Number.parseInt(values[index], 10)
              }
              score += Number.parseInt(values[index], 10)
            }
            score = Math.round(score * conversion)
            setScore(score)
            setScoreArr([score1, score2])
            setScoreVisible(true)
            setOCD()
            setSubmitting(false)
          }}
        >
          {({ values, touched, errors, handleSubmit }) => (
            <Form className="space-y-4">
              {questions.map((question, index) => {
                const content = question.question
                let indexLabel = index + 1
                for (let i = 0; i < index; i += 1) {
                  if (questionsVisible[i] === false) {
                    indexLabel -= 1
                  }
                }
                return (
                  questionsVisible[index] && (
                    <div key={index} className="space-y-2">
                      <div className="text-lg font-semibold flex flex-col">
                        <div
                          className={
                            touched[index] && errors[index]
                              ? 'text-error'
                              : null
                          }
                        >
                          {indexLabel}. {content}
                        </div>
                        <div>
                          {touched[index] && errors[index] ? (
                            <div className="text-error text-xs font-normal">
                              {errors[index]}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2" role="group">
                        {question.options.map((option, optionIndex) => {
                          return (
                            <label
                              key={optionIndex}
                              className="flex justify-center items-center cursor-pointer text-base w-fit"
                            >
                              <Field
                                type="radio"
                                className="radio radio-primary radio-sm mr-1"
                                name={index}
                                onClick={() => {
                                  selectHandler(
                                    index,
                                    optionIndex,
                                    values,
                                    touched
                                  )
                                }}
                                value={
                                  question.reverse
                                    ? `${options - optionIndex}`
                                    : `${optionIndex}`
                                }
                              />
                              {option.question}
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  )
                )
              })}
              <button
                className="btn btn-primary w-28"
                type="submit"
                onClick={() => {
                  let completed = true
                  for (let index in values) {
                    if (values[index] === -1) {
                      completed = false
                      break
                    }
                  }
                  if (!completed) {
                    toast.error('请完成标红的题目', { duration: 1000 })
                  }
                }}
              >
                测评
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
