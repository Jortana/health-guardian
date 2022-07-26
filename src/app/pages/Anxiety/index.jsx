import React, { useState } from 'react'

import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'

import ScoreModal from '../../components/ScoreModal'
import SAS from '../../../data/anxiety'

export default function Anxiety() {
  const {
    questions,
    options,
    total,
    conversion,
    scoreMap,
    label,
    descriptions
  } = SAS

  const tempArr = new Array(questions.length).fill(0)
  const initialValues = { ...tempArr }
  const validationSchema = new Array(questions.length).fill(
    Yup.number().moreThan(0, '请完成这一题').required('Required')
  )
  const [scoreVisible, setScoreVisible] = useState(false)
  const [score, setScore] = useState(0)

  const setAnxiety = () => {
    console.log('setAnxiety')
  }

  return (
    <div className="bg-white pt-4 pb-10 px-6">
      {/* 隐藏 */}
      <Toaster />
      <ScoreModal
        type="anxiety"
        scoreVisible={scoreVisible}
        score={score}
        total={total}
        descriptions={descriptions}
        scoreMap={scoreMap}
        onChange={(visible) => {
          setScoreVisible(visible)
        }}
      />
      {/* ************ */}
      <h1 className="text-3xl font-bold">焦虑测试</h1>
      <div className="divider my-1"></div>
      <h2 className="text-lg font-semibold">注意事项</h2>
      <p className="text-base font-semibold mt-1">
        本测试仅供参考，不作指导意见。本测试主要用于疗效评估，不能用于诊断。
      </p>
      <div className="text-base">
        <p className="my-1">
          下面有20条题目，请仔细阅读每一条，把意思弄明白。每一题有四个选项，分别表示：
        </p>
        <ol className="space-y-1 pl-4">
          <li>1. 没有或很少时间（过去一周内，出现这类情况的日子不超过一天）</li>
          <li>2. 小部分时间（过去一周内，有1-2天有过这类情况）</li>
          <li>3. 相当多时间（过去一周内，3-4天有过这类情况）；</li>
          <li>4. 绝大部分或全部时间（过去一周内，有5-7天有过这类情况）</li>
        </ol>
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
            let score = 0
            for (let index in values) {
              score += Number.parseInt(values[index], 10)
            }
            score = Math.round(score * conversion)
            setScore(score)
            setScoreVisible(true)
            setAnxiety()
            setSubmitting(false)
          }}
        >
          {({ values, touched, errors }) => (
            <Form className="space-y-4">
              {questions.map((question, index) => {
                const content = question.question
                return (
                  <div key={index} className="space-y-2">
                    <div className="text-lg font-semibold flex flex-col">
                      <div
                        className={
                          touched[index] && errors[index] ? 'text-error' : null
                        }
                      >
                        {index + 1}. {content}
                      </div>
                      <div>
                        {touched[index] && errors[index] ? (
                          <div className="text-error text-xs font-normal">
                            {errors[index]}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex space-x-6 items-center" role="group">
                      {new Array(options).fill(0).map((t, option) => {
                        return (
                          <label
                            key={option}
                            className="flex items-center cursor-pointer text-base"
                          >
                            <Field
                              type="radio"
                              className="radio radio-primary radio-sm mr-1"
                              name={index}
                              value={
                                question.reverse
                                  ? `${options - option}`
                                  : `${option + 1}`
                              }
                            />
                            {label[option]}
                          </label>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
              <button
                className="btn btn-primary w-28"
                type="submit"
                onClick={() => {
                  let completed = true
                  for (let index in values) {
                    if (values[index] === 0) {
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
