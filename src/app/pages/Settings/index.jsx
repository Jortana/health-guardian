import React, { useEffect, useRef, useState } from 'react'
import useDebounce from '../../../hooks/useDebounce'

export default function Settings() {
  const [settings, setSettings] = useState({
    allowFilter: true,
    allowKeyFilter: true,
    filterWords: []
  })

  const keywordsEl = useRef()

  useEffect(() => {
    // eslint-disable-next-line no-undef
    // chrome.storage.sync.get('settings', (res) => {
    //   const { settings } = res
    //   setAllowFilter(settings.allowFilter)
    // })
  }, [])

  const toggleSettings = useDebounce((settings) => {
    console.log(settings[0])
    // eslint-disable-next-line no-undef
    // chrome.storage.sync.set({
    //   settings
    // })
  }, 500)

  // 添加关键词
  const addKeyword = () => {
    // 将中文逗号全都替换为英文逗号，然后进行分割
    let keywords = keywordsEl.current.value
    keywords = keywords.replace(/，/gi, ',')
    const curSettings = settings
    const keywordsArr = keywords.split(',')
    keywordsArr.forEach((word) => {
      if (!curSettings.filterWords.includes(word)) {
        curSettings.filterWords.push(word)
      }
    })
    setSettings({ ...curSettings })
    keywordsEl.current.value = ''
    // console.log(keywordsEl.current.value)
  }

  // 删除指定位置的关键词
  const delteKeyword = (index) => {
    const curSettings = settings
    const curKeywords = curSettings.filterWords
    curKeywords.splice(index, 1)
    curSettings.filterWords = curKeywords
    setSettings({ ...curSettings })
    console.log(curKeywords)
  }

  return (
    <div className="bg-white p-10 min-h-full">
      <h1 className="text-3xl font-bold">设置</h1>
      <div className="divider my-1"></div>
      <div className="w-full space-y-6">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="text-base">允许网页智能过滤</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={settings.allowFilter}
              onChange={() => {
                const curSettings = settings
                curSettings.allowFilter = !curSettings.allowFilter
                console.log(curSettings)
                setSettings({ ...curSettings })
                toggleSettings(curSettings)
              }}
            />
          </label>
          <div className="pl-4">
            <p className="label-text text-tiny">网页过滤功能正在开发中。</p>
            <p className="label-text">
              选择开启此选项则说明您希望在浏览网页时反馈您是否产生不良情绪。
            </p>
            <p className="label-text">
              因为开发此功能需要基础数据，希望您能够帮助本插件越做越好，谢谢。
            </p>
          </div>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="text-base">开启屏蔽词过滤</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={settings.allowKeyFilter}
              onChange={() => {
                const curSettings = settings
                curSettings.allowKeyFilter = !curSettings.allowKeyFilter
                setSettings({ ...curSettings })
                toggleSettings(curSettings)
              }}
            />
          </label>
          {settings.allowKeyFilter && (
            <div className="pl-4">
              <p className="label-text text-tiny">
                根据设定的关键词提醒网页过滤。
              </p>
            </div>
          )}

          {settings.allowKeyFilter && (
            <div className="form-control w-full max-w-xs mt-2">
              <div className="input-group">
                <input
                  ref={keywordsEl}
                  type="text"
                  placeholder="输入屏蔽词"
                  className="input input-bordered input-sm w-full max-w-xs"
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      addKeyword()
                    }
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-sm btn-primary"
                  onClick={addKeyword}
                >
                  添加
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt">
                  一次输入一个或用逗号（中英文都可）分隔多个
                </span>
              </label>
            </div>
          )}
          {settings.allowKeyFilter && settings.filterWords.length > 0 && (
            <div className="flex space-x-4 mt-2">
              {settings.filterWords.map((word, index) => {
                return (
                  <div
                    className="flex items-center bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded"
                    key={word}
                  >
                    {word}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 cursor-pointer ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      onClick={() => {
                        delteKeyword(index)
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
