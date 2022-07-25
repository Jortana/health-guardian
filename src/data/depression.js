const questions = [
  { question: '我觉得闷闷不乐，情绪低沉', reverse: false },
  { question: '我觉得一天中早晨最好', reverse: true },
  { question: '一阵阵哭出来或觉得想哭', reverse: false },
  { question: '我晚上睡眠不好', reverse: false },
  { question: '我吃得跟平常一样多', reverse: true },
  { question: '我与异性密切接触时和以往一样感到愉快', reverse: true },
  { question: '我发觉我的体重在下降', reverse: false },
  { question: '我有便秘的苦恼', reverse: false },
  { question: '我心跳比平常快', reverse: false },
  { question: '我无缘无故地感到疲乏', reverse: false },
  { question: '我的头脑和平常一样清楚', reverse: true },
  { question: '我觉得经常做的事情并没有困难', reverse: true },
  { question: '我觉得不安而平静不下来', reverse: false },
  { question: '我对未来抱有希望', reverse: true },
  { question: '我比平常容易生气激动', reverse: false },
  { question: '我觉得做出决定是容易的', reverse: true },
  { question: '我觉得自己是个有用的人，有人需要我', reverse: true },
  { question: '我的生活过得很有意思', reverse: true },
  { question: '我认为如果我死了，别人会生活得更好', reverse: false },
  { question: '平常感兴趣的事我仍然感兴趣', reverse: true }
]

const SDS = {
  questions,
  // 每个问题的选项有几个
  options: 4,
  total: 80,
  // 换算需要乘的数字
  conversion: 1,
  // 划分标准
  scoreMap: [0, 42, 50, 58],
  descriptions: [
    '您可能没有抑郁情绪，可能只是有时候有些情绪不佳，注意调整自己的情绪。',
    '您可能有轻度抑郁情绪，但是请别担心，请适当调整，加强锻炼，多出去散心。',
    '您可能有中度抑郁情绪，请及时调整自己的心态或寻求他人帮助。',
    '您可能有重度抑郁情绪，并且很可能已经影响到了您的日常生活，建议您立即寻求精神科医生或专业心理咨询师的帮助。'
  ],
  label: ['很少', '有时', '经常', '持续']
}

export default SDS
