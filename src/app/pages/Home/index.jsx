import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import SAS from '../../../data/anxiety'
import SDS from '../../../data/depression'
import YBOCS from '../../../data/ocd'

export default function Home() {
  const navigate = useNavigate()
  const [mentalStatus, setMentalStatus] = useState({
    anxiety: { score: 0, total: 80, level: -1, label: '焦虑' },
    depression: { score: 0, total: 80, level: -1, label: '抑郁' },
    OCD: { score: 0, scoreArr: [0, 0], level: -1, label: '强迫' }
  })
  const [mentalInit, setMentalInit] = useState(true)
  // const [cardInfo, setCardInfo] = useState({
  //   name: '姓名',
  //   emergency: '不知道',
  //   situations: [
  //     {
  //       location: '地点',
  //       address: '地址地址地址地址地址地址地址',
  //       phone: '18600000000'
  //     },
  //     {
  //       location: '地点1',
  //       address: '地址地址地址地址地址地址地址1',
  //       phone: '18600000001'
  //     }
  //   ]
  // })
  const [cardInfo, setCardInfo] = useState({
    name: '',
    emergency: '',
    situations: [
      {
        location: '',
        address: '',
        phone: ''
      }
    ],
    set: false
  })
  // 健康卡片的验证规则
  const cardValidation = Yup.object({
    name: Yup.string().required('请填写姓名'),
    emergency: Yup.string().required('请填写紧急情况'),
    situations: Yup.array(
      Yup.object({
        location: Yup.string().required('请填写场所'),
        address: Yup.string().required('请填写地址'),
        phone: Yup.string()
          .required('请填写紧急联系人电话号码')
          .matches(
            /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            '请正确填写电话号码'
          )
      }).required('请填写至少一个紧急联系人电话号码')
    ).required('请添加至少一个地址')
  })
  // 是否有健康卡片的信息
  const [cardInit, setCardInit] = useState(false)
  // 是否正在编辑健康卡片
  const [editing, setEditing] = useState(false)

  const baseEmojis = {
    anxiety: '😶',
    depression: '😶',
    OCD: '😶'
  }
  const emojiMap = {
    anxiety: ['😀', '😰', '😰', '😰'],
    depression: ['😀', '😞', '😞', '😞'],
    OCD: ['😀', '🤨', '🤨', '🤨']
  }

  const levelLableMap = ['无', '轻度', '中度', '重度']
  const baseLevelClass = ['bg-sky-500', 'hover:bg-sky-600']
  const levelClassMap = [
    ['bg-emerald-400', 'hover:bg-emerald-300'], // 良好
    ['bg-amber-400', 'hover:bg-amber-300'], // 轻度
    ['bg-orange-400', 'hover:bg-orange-300'], // 中度
    ['bg-red-400', 'hover:bg-red-300'] //重度
  ]

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get('mentalStatus', (res) => {
      const mentalStatus = res.mentalStatus
      console.log('mentalStatus', mentalStatus)
      setMentalStatus(mentalStatus)
      if (
        mentalStatus.anxiety.level === -1 &&
        mentalStatus.depression.level === -1 &&
        mentalStatus.depression.level === -1
      ) {
        setMentalInit(false)
      } else {
        setMentalInit(true)
      }
    })

    // eslint-disable-next-line no-undef
    chrome.storage.sync.get('cardInfo', (res) => {
      const { cardInfo: syncInfo } = res
      console.log(syncInfo)
      cardValidation
        .validate(syncInfo)
        .then(() => {
          setCardInit(true)
          setEditing(false)
          // setCardInit(true)
        })
        .catch(() => {
          setCardInit(false)
          setEditing(true)
          // setCardInit(true)
        })
      setCardInfo(syncInfo)
    })

    if (
      mentalStatus.anxiety.level === 0 &&
      mentalStatus.depression.level === 0 &&
      mentalStatus.depression.level === 0
    ) {
      setMentalInit(false)
    } else {
      setMentalInit(true)
    }
    /*
    setMentalStatus({
      anxiety: {
        score: 10,
        total: 100,
        level: 0,
        label: '焦虑',
        description:
          '您可能没有抑郁情绪，只是有时候有些情绪不佳，注意调整自己的情绪。'
      },
      depression: { score: 0, total: 80, level: 0, label: '抑郁' },
      OCD: { score: 0, total: 100, level: 0, label: '强迫' }
    })
    */
  }, [])

  const submitCard = (values) => {
    values.set = true
    setCardInfo(values)
    setEditing(false)
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set({
      cardInfo: values
    })
  }

  return (
    <div className="bg-white p-10 min-h-full">
      <h1 className="text-3xl mb-2">健康管理</h1>
      <div className="flex my-6 justify-between space-x-4">
        {/* 健康卡片 */}
        <section className="w-1/2">
          <h2 className="text-lg font-semibold mb-2">健康卡片</h2>
          <div className="container mx-auto relative">
            {!cardInit && (
              <div className="rounded-lg py-5 px-4 border border-slate-100 h-full w-full flex justify-center items-center absolute top-0 left-0 bg-slate-50/80 backdrop-blur">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setCardInit(true)
                  }}
                >
                  编辑健康卡片
                </button>
              </div>
            )}
            <div className="rounded-lg pt-1 pb-6 px-4 shadow-lg border border-slate-100">
              {editing && (
                <Formik
                  initialValues={cardInfo}
                  validationSchema={cardValidation}
                  onSubmit={(values) => {
                    submitCard(values)
                  }}
                >
                  {({ values }) => (
                    <Form className="space-y-1">
                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text">姓名</span>
                        </label>
                        <Field
                          name="name"
                          type="text"
                          className="input input-bordered input-sm"
                          placeholder="请填写您的姓名"
                        />
                        <div className="text-xs mt-1 text-error">
                          <ErrorMessage name="name" />
                        </div>
                      </div>
                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text">紧急情况</span>
                        </label>
                        <Field
                          name="emergency"
                          type="text"
                          className="input input-bordered input-sm"
                          placeholder="请填写您可能遇到的紧急情况，如：心脏病、扭伤等"
                        />
                        <div className="text-xs mt-1 text-error">
                          <ErrorMessage name="emergency" />
                        </div>
                      </div>
                      <label className="label pb-1">
                        <div className="label-text">场景</div>
                      </label>
                      <div className="form-control border-t-2 !mt-0 pt-1 border-slate-300">
                        <label className="label pb-1 pt-0">
                          <div className="label-text text-gray-400">
                            添加您可能发出求助的场景，最多可添加 3 个
                          </div>
                        </label>
                        <FieldArray
                          name="situations"
                          render={(arrayHelpers) => (
                            <>
                              {values.situations.map((situation, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={`${
                                      index > 0
                                        ? 'border-t-1 border-slate-200'
                                        : ''
                                    }`}
                                  >
                                    <div className="flex space-x-2 w-full">
                                      <div className="flex-1">
                                        <label className="label pb-1">
                                          <span className="label-text">
                                            场所
                                          </span>
                                        </label>
                                        <Field
                                          name={`situations.${index}.location`}
                                          type="text"
                                          className="input input-bordered input-sm w-full"
                                          placeholder="如：家、单位等"
                                        />
                                        <div className="text-xs mt-1 text-error">
                                          <ErrorMessage
                                            name={`situations.${index}.location`}
                                          />
                                        </div>
                                      </div>

                                      <div className="flex-1">
                                        <label className="label pb-1">
                                          <span className="label-text">
                                            紧急联系人号码
                                          </span>
                                        </label>
                                        <Field
                                          name={`situations.${index}.phone`}
                                          type="text"
                                          className="input input-bordered input-sm w-full"
                                          placeholder="紧急联系人电话号码"
                                        />
                                        <div className="text-xs mt-1 text-error">
                                          <ErrorMessage
                                            name={`situations.${index}.phone`}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <label className="label pb-1">
                                        <span className="label-text">地址</span>
                                      </label>
                                      <Field
                                        name={`situations.${index}.address`}
                                        type="text"
                                        className="input input-bordered input-sm w-full"
                                        placeholder="请填写地址"
                                      />
                                      <div className="text-xs mt-1 text-error">
                                        <ErrorMessage
                                          name={`situations.${index}.address`}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                      {index > 0 && (
                                        <div
                                          className="btn btn-error btn-xs"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          删除场景
                                        </div>
                                      )}
                                      <div
                                        className="btn btn-primary btn-xs ml-2"
                                        onClick={() => {
                                          if (values.situations.length < 3) {
                                            arrayHelpers.insert(index + 1, {
                                              location: '',
                                              address: '',
                                              phone: ''
                                            })
                                          }
                                        }}
                                        disabled={values.situations.length >= 3}
                                      >
                                        添加场景
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </>
                          )}
                        />
                      </div>
                      <div className="!mt-6 flex space-x-2">
                        <button
                          type="button"
                          className="btn btn-ghost border border-gray-400 h-10 min-h-8 flex-1"
                          onClick={() => {
                            setEditing(false)
                          }}
                        >
                          取消
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary h-10 min-h-8 flex-1"
                        >
                          保存
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
              {!editing && (
                <div className="space-y-3 p-1 pt-2">
                  <div>
                    <div className="label-text text-slate-500">姓名</div>
                    <div className="text-lg">{cardInfo.name}</div>
                  </div>
                  <div>
                    <div className="label-text text-slate-500">紧急情况</div>
                    <div className="text-lg">{cardInfo.emergency}</div>
                  </div>
                  <div>
                    <div className="label-text text-slate-500">场景</div>
                    <div className="border-t-2 mt-1 pt-1 border-slate-300">
                      {cardInfo.situations.map((situation, situationIndex) => {
                        return (
                          <div
                            className={`space-y-2 ${
                              situationIndex > 0 &&
                              'mt-2 pt-2 border-t border-slate-200'
                            }`}
                            key={situationIndex}
                          >
                            <div className="flex space-x-2 w-full">
                              <div className="flex-1">
                                <div className="label-text text-slate-500">
                                  场所
                                </div>
                                <div className="text-lg">
                                  {situation.location}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="label-text text-slate-500">
                                  紧急联系人号码
                                </div>
                                <div className="text-lg">{situation.phone}</div>
                              </div>
                            </div>
                            <div>
                              <div className="label-text text-slate-500">
                                地址
                              </div>
                              <div className="text-lg">{situation.address}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="!mt-6 ">
                    <button
                      className="btn btn-ghost border border-gray-400 w-full h-10 min-h-8"
                      onClick={() => {
                        setEditing(true)
                      }}
                    >
                      编辑
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        {/* 心理状态 */}
        <section className="w-1/2 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">心理状态</h2>
          {mentalInit && (
            <div className="container mx-auto space-y-4">
              <div className="rounded-lg py-5 shadow-md border border-slate-100 relative min-h-[150px]">
                {mentalStatus.anxiety.level === -1 && (
                  <div className="absolute top-0 left-0 w-full h-full bg-slate-50/80 backdrop-blur flex justify-center items-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        navigate('/anxiety')
                      }}
                    >
                      开始焦虑测试
                    </button>
                  </div>
                )}
                <div className="flex pl-4 pr-10 justify-between">
                  <div className="flex justify-center p-2 align-middle text-5xl">
                    {mentalStatus.anxiety.level >= 0
                      ? emojiMap.anxiety[mentalStatus.anxiety.level]
                      : baseEmojis.anxiety}
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div className="text-3xl font-semibold leading-none">
                      {mentalStatus.anxiety.score} /{' '}
                      {mentalStatus.anxiety.total}
                    </div>
                    <div
                      className={`mt-2 text-sky-50 cursor-pointer w-fit rounded px-2 text-base ${
                        mentalStatus.anxiety.level >= 0
                          ? levelClassMap[mentalStatus.anxiety.level].join(' ')
                          : baseLevelClass.join(' ')
                      }`}
                    >
                      {levelLableMap[mentalStatus.anxiety.level] +
                        mentalStatus.anxiety.label}
                    </div>
                  </div>
                </div>
                {mentalStatus.anxiety.level >= 0 && (
                  <div className="mt-3 px-7 text-tiny text-slate-700">
                    {SAS.descriptions[mentalStatus.anxiety.level]}
                  </div>
                )}
              </div>
              <div className="rounded-lg py-5 shadow-md border border-slate-100 relative min-h-[150px]">
                {mentalStatus.depression.level === -1 && (
                  <div className="absolute top-0 left-0 w-full h-full bg-slate-50/80 backdrop-blur flex justify-center items-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        navigate('/depresstion')
                      }}
                    >
                      开始抑郁测试
                    </button>
                  </div>
                )}
                <div className="flex pl-4 pr-10 justify-between">
                  <div className="flex justify-center p-2 align-middle text-5xl">
                    {mentalStatus.depression.level >= 0
                      ? emojiMap.depression[mentalStatus.depression.level]
                      : baseEmojis.depression}
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div className="text-3xl font-semibold leading-none">
                      {mentalStatus.depression.score} /{' '}
                      {mentalStatus.depression.total}
                    </div>
                    <div
                      className={`mt-2 text-sky-50 cursor-pointer w-fit rounded px-2 text-base ${
                        mentalStatus.depression.level >= 0
                          ? levelClassMap[mentalStatus.depression.level].join(
                              ' '
                            )
                          : baseLevelClass.join(' ')
                      }`}
                    >
                      {levelLableMap[mentalStatus.depression.level] +
                        mentalStatus.depression.label}
                    </div>
                  </div>
                </div>
                {mentalStatus.depression.level >= 0 && (
                  <div className="mt-3 px-7 text-tiny text-slate-700">
                    {SDS.descriptions[mentalStatus.depression.level]}
                  </div>
                )}
              </div>
              <div className="rounded-lg py-5 shadow-md border border-slate-100 relative min-h-[150px]">
                {mentalStatus.OCD.level === -1 && (
                  <div className="absolute top-0 left-0 w-full h-full bg-slate-50/80 backdrop-blur flex justify-center items-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        navigate('/ocd')
                      }}
                    >
                      开始强迫测试
                    </button>
                  </div>
                )}
                <div className="flex pl-4 pr-10 justify-between">
                  <div className="flex justify-center p-2 align-middle text-5xl">
                    {mentalStatus.OCD.level >= 0
                      ? emojiMap.OCD[mentalStatus.OCD.level]
                      : baseEmojis.OCD}
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div className="text-3xl font-semibold leading-none">
                      {mentalStatus.OCD.scoreArr[0]} {' + '}
                      {mentalStatus.OCD.scoreArr[1]}
                    </div>
                    <div
                      className={`mt-2 text-sky-50 cursor-pointer w-fit rounded px-2 text-base ${
                        mentalStatus.OCD.level >= 0
                          ? levelClassMap[mentalStatus.OCD.level].join(' ')
                          : baseLevelClass.join(' ')
                      }`}
                    >
                      {levelLableMap[mentalStatus.OCD.level] +
                        mentalStatus.OCD.label}
                    </div>
                  </div>
                </div>
                {mentalStatus.OCD.level >= 0 && (
                  <div className="mt-3 px-7 text-tiny text-slate-700">
                    {YBOCS.descriptions[mentalStatus.OCD.level]}
                  </div>
                )}
              </div>
            </div>
          )}
          {!mentalInit && (
            <div className="container flex flex-col justify-center items-center text-center rounded-lg py-5 shadow-lg border border-slate-100 h-full w-full p-4">
              <button
                className="btn btn-primary text-sky-100"
                onClick={() => {
                  navigate('/anxiety')
                }}
              >
                开始测试
              </button>
              <p className="text-tiny mt-3">您还没有进行心理状态的测评，</p>
              <p className="text-tiny">您可以选择随时选择任何一项进行测试，</p>
              <p className="text-tiny">点击按钮测试开始焦虑状态的测试。</p>
            </div>
          )}
        </section>
      </div>
      {/* <div className="text-xs pt-2 text-slate-500">
        所有信息均不会被用于数据分析也不会保存到健康守卫服务器。
      </div> */}
    </div>
  )
}
