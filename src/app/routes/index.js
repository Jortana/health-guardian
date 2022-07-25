import AppFrame from '../../layout/frame/AppFrame'
import Home from '../pages/Home'
import Anxiety from '../pages/Anxiety'
import Depression from '../pages/Depression'
import OCD from '../pages/OCD'

// 用于显示页面标题和鉴权
const TitleAuth = ({ children, title }) => {
  document.title = `${title} - 健康守卫`
  return <div>{children}</div>
}

const element = [
  {
    path: '/',
    element: <AppFrame />,
    children: [
      {
        path: '/',
        element: (
          <TitleAuth title="总览">
            <Home />
          </TitleAuth>
        )
      },
      {
        path: '/anxiety',
        element: (
          <TitleAuth title="焦虑测试">
            <Anxiety />
          </TitleAuth>
        )
      },
      {
        path: '/depression',
        element: (
          <TitleAuth title="抑郁测试">
            <Depression />
          </TitleAuth>
        )
      },
      {
        path: '/ocd',
        element: (
          <TitleAuth title="强迫测试">
            <OCD />
          </TitleAuth>
        )
      }
      // {
      //   path: '/',
      //   element: <Navigate to="/home" />
      // }
    ]
  }
]

export default element
