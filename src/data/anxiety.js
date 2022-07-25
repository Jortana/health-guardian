const questions = [
  { question: '我觉得比平时容易紧张和着急（焦虑）', reverse: false },
  { question: '我无缘无故地感到害怕（害怕）', reverse: false },
  { question: '我容易心里烦乱或觉得惊恐（惊恐）', reverse: false },
  { question: '我觉得我可能将要发疯 （发疯感） ', reverse: false },
  {
    question: '我觉得一切都很好，也不会发生什么不幸（不幸预感）',
    reverse: true
  },
  { question: '我手脚发抖打颤（手足颤抖）', reverse: false },
  { question: '我因为头痛、颈痛和背痛而苦恼（躯体疼痛）', reverse: false },
  { question: '我感觉容易衰弱和疲乏（乏力）', reverse: false },
  { question: '我觉得心平气和，并且容易安静坐着（静坐不能）', reverse: true },
  { question: '我觉得心跳得快（心悸）', reverse: false },
  { question: '我因为一阵阵头晕而苦恼（头昏）', reverse: false },
  { question: '我有过晕倒发作，或觉得要晕倒似的（晕厥感）', reverse: false },
  { question: '我呼气吸气都感到很容易（呼吸困难）', reverse: true },
  { question: '我手脚麻木和刺痛（手足刺痛）', reverse: false },
  { question: '我因胃痛和消化不良而苦恼（胃痛或消化不良）', reverse: false },
  { question: '我常常要小便（尿意频数）', reverse: false },
  { question: '我的手常常是干燥温暖的（多汗）', reverse: true },
  { question: '我脸红发热（面部潮红）', reverse: false },
  { question: '我容易入睡并且一夜睡得很好（睡眠障碍）', reverse: true },
  { question: '我做恶梦（恶梦）', reverse: false }
]

const SAS = {
  questions,
  // 每个问题的选项有几个
  options: 4,
  total: 80,
  // 换算需要乘的数字
  conversion: 1.25,
  // 划分标准
  scoreMap: [0, 50, 60, 70],
  descriptions: [
    '您可能没有焦虑情绪，注意调整情绪即可。',
    '您可能有轻度焦虑情绪，但是请别担心，请适当调整，加强锻炼，多出去散心。',
    '您可能有中度焦虑情绪，建议立即前往医院获取专业评估。',
    '您可能有重度焦虑情绪，建议立即前往医院获取专业评估并及时就诊。'
  ],
  label: ['很少', '有时', '经常', '持续']
}

export default SAS
