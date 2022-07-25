import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function OCDScoreModal(props) {
  const navigate = useNavigate()

  const { score, descriptions, scoreArr, onChange } = props
  const [scoreVisible, setScoreVisible] = useState(props.scoreVisible)
  const [description, setDescription] = useState('')

  useEffect(() => {
    setScoreVisible(props.scoreVisible)

    let level = 0
    if (score < 6) {
      level = 0
    }

    if (
      (score > 6 && score <= 15) ||
      (scoreArr[0] >= 6 && scoreArr[0] <= 9) ||
      (scoreArr[1] >= 6 && scoreArr[1] <= 9)
    ) {
      level = 1
    }

    if (
      (score > 15 && score <= 25) ||
      (scoreArr[0] >= 10 && scoreArr[0] <= 14) ||
      (scoreArr[1] >= 10 && scoreArr[1] <= 14)
    ) {
      level = 2
    }

    if (score > 25 || scoreArr[0] >= 15 || scoreArr[1] >= 15) {
      level = 3
    }

    setDescription(descriptions[level])
  }, [props, descriptions, score, scoreArr])

  return (
    <>
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={scoreVisible}
        onChange={() => {
          onChange(!scoreVisible)
        }}
      />
      <div className="modal">
        <div className="modal-box w-96">
          <h3 className="font-bold text-lg">您已经完成测评</h3>
          <div className="flex">
            <div className="stat space-y-1 px-0 pb-0">
              <div className="stat-title">强迫思维</div>
              <div className="stat-value">{scoreArr[0]}</div>
            </div>
            <div className="stat space-y-1 px-0 pb-0">
              <div className="stat-title">强迫行为</div>
              <div className="stat-value">{scoreArr[1]}</div>
            </div>
            <div className="stat space-y-1 px-0 pb-0">
              <div className="stat-title">总分</div>
              <div className="stat-value">{score}</div>
            </div>
          </div>
          <div className="divider my-1"></div>
          <div className="">{description}</div>
          <div className="modal-action mt-5 mb-1 flex justify-between">
            {/* <label htmlFor="my-modal" className="btn">
              Yay!
            </label> */}
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate('/')
              }}
            >
              返回主页
            </button>
            <button className="btn btn-primary">继续测评</button>
          </div>
        </div>
      </div>
    </>
  )
}
