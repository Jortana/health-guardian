const questions = [
  {
    question: '每天强迫思维的时间或频率',
    reverse: false,
    options: [
      { question: '完全无强迫思维' },
      { question: '轻微（少于1小时），或偶尔有（不超过8次/天）' },
      {
        question:
          '中度（1—3小时），或常常有（超过8次/天，但每天大部分时间没有强迫思维）'
      },
      {
        question:
          '重度（3—8小时），或频率非常高（超过8次/天，且一天大部分时间有强迫思维）'
      },
      { question: '极重（8小时以上），或几乎无时无刻都有' }
    ],
    jump: 4
  },
  {
    question:
      '强迫思维对学业、工作、社交或日常活动任意一项的妨碍（请考虑因为强迫思维而不去做或减少做的事情）',
    reverse: false,
    options: [
      { question: '不受妨碍' },
      { question: '轻微（稍微妨碍，但整体表现并无大碍）' },
      {
        question: '中度（确实妨碍，但仍可应付）'
      },
      {
        question: '重度（上述某一项或多项功能严重受损）'
      },
      { question: '极度（上述某一项或多项功能丧失）' }
    ]
  },
  {
    question: '强迫思维带来的苦恼或困扰',
    reverse: false,
    options: [
      { question: '没有' },
      { question: '轻微' },
      {
        question: '中度（尚可应付）'
      },
      {
        question: '重度'
      },
      { question: '极重（持续地感觉如同废人）' }
    ]
  },
  {
    question: '与强迫思维的抗衡',
    reverse: false,
    options: [
      { question: '无需抗衡' },
      { question: '基本能与之抗衡' },
      {
        question: '有时能与之抗衡'
      },
      {
        question: '经常屈服'
      },
      { question: '完全屈服' }
    ]
  },
  {
    question: '对强迫思维的掌控',
    reverse: false,
    options: [
      { question: '完全能控制' },
      { question: '大多能控制' },
      {
        question: '中等程度控制'
      },
      {
        question: '很少能控制'
      },
      { question: '完全无法控制' }
    ]
  },
  {
    question: '每天强迫行为的时间或频率',
    reverse: false,
    options: [
      { question: '完全无强迫行为' },
      { question: '轻微（少于1小时），或偶尔有（不超过8次/天）' },
      {
        question:
          '中度（1—3小时），或常常有（超过8次/天，但一天大部分时间没有强迫行为）'
      },
      {
        question:
          '重度（3—8小时），或频率非常高（超过8次/天，且一天大部分时间有强迫行为）'
      },
      { question: '极重（大于8小时），或几乎无时无刻都有' }
    ],
    jump: 4
  },
  {
    question:
      '强迫行为对学业、工作、社交或日常活动任意一项的妨碍（请考虑因为强迫行为而不去做或减少做的事情）',
    reverse: false,
    options: [
      { question: '不受妨碍' },
      { question: '轻微（稍微妨碍，但整体表现并无大碍）/天）' },
      {
        question: '中度（确实妨碍，但仍可应付）'
      },
      {
        question: '重度（上述某一项或多项功能严重受损）'
      },
      { question: '极度（上述某一项或多项功能丧失）' }
    ]
  },
  {
    question: '强迫行为被制止时的焦虑程度',
    reverse: false,
    options: [
      { question: '没有焦虑' },
      { question: '轻微' },
      {
        question: '中度（仍可以应付）'
      },
      {
        question: '严重'
      },
      { question: '极度' }
    ]
  },
  {
    question: '与抗强迫行为的抗衡',
    reverse: false,
    options: [
      { question: '无需对抗' },
      { question: '基本能与之抗衡' },
      {
        question: '有时能与之抗衡'
      },
      {
        question: '经常屈服'
      },
      { question: '完全屈服' }
    ]
  },
  {
    question: '对强迫行为的掌控（回想那些控制强迫行为的情境，以便回答此题）',
    reverse: false,
    options: [
      { question: '完全控制' },
      { question: '大多能控制（只要稍加注意即能停止强迫行为）' },
      {
        question: '中等程度控制（注意虽能控制但有困难）'
      },
      {
        question: '控制力弱（只能忍耐短暂的时间，但最终还是必须完成强迫行为）'
      },
      { question: '完全无法控制（连忍耐短暂时间的能力都没有）' }
    ]
  }
]

const YBOCS = {
  questions,
  // 每个问题的选项有几个
  options: 5,
  // 换算需要乘的数字
  conversion: 1,
  descriptions: [
    '您可能没有强迫症，请继续保持健康积极的生活状态。',
    '您可能是轻度严重的强迫症，如果您的症状对生活、学习或工作产生影响，可以尽早治疗。',
    '您可能是中等严重的强迫症，如果症状对对生活、学习或工作产生明显影响，建议及时治疗。',
    '您可能是较为严重的强迫症，如果任由其发展可能会导致出现其他心理障碍，建议您立即去专业医院治疗。'
  ],
  important: [0, 5]
}

export default YBOCS
