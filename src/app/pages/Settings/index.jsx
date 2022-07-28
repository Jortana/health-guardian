import React, { useEffect, useState } from 'react'
import useDebounce from '../../../hooks/useDebounce'

export default function Settings() {
  const [allowFilter, setAllowFilter] = useState(true)

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get('settings', (res) => {
      const { settings } = res
      setAllowFilter(settings.allowFilter)
    })
  }, [])

  const toggleAllowCollect = useDebounce((allow) => {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set({
      settings: {
        allowFilter: allow[0]
      }
    })
  }, 500)

  return (
    <div className="bg-white p-10 min-h-full">
      <h1 className="text-3xl font-bold">设置</h1>
      <div className="divider my-1"></div>
      <div className="w-full">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="text-base">允许网页过滤</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={allowFilter}
              onChange={() => {
                const curAllow = allowFilter
                setAllowFilter(!curAllow)
                toggleAllowCollect(!curAllow)
              }}
            />
          </label>
          <div className="pl-2">
            <p className="label-text text-tiny">网页过滤功能正在开发中。</p>
            <p className="label-text">
              选择开启此选项则说明您希望在浏览网页时反馈您是否产生不良情绪。
            </p>
            <p className="label-text">
              因为开发此功能需要基础数据，希望您能够帮助本插件越做越好，谢谢。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
