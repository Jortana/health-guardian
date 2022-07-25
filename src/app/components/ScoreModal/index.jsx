import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ScoreModal(props) {
  const navigate = useNavigate()

  const { score, total, descriptions, scoreMap, onChange } = props
  const [scoreVisible, setScoreVisible] = useState(props.scoreVisible)
  const [description, setDescription] = useState('')

  useEffect(() => {
    setScoreVisible(props.scoreVisible)
    let isSet = false
    for (let i = 0; i < scoreMap.length; i += 1) {
      if (score < scoreMap[i]) {
        setDescription(descriptions[i - 1])
        isSet = true
        break
      }
    }
    if (!isSet) {
      setDescription(descriptions[descriptions.length - 1])
    }
  }, [props, descriptions, score, scoreMap])

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
          <div className="stat space-y-1 px-0">
            <div className="stat-title">得分情况</div>
            <div className="stat-value">
              {score} / {total}
            </div>
            <div className="divider my-1"></div>
            <div className="">{description}</div>
          </div>
          <div className="modal-action mt-2 mb-1 flex justify-between">
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
