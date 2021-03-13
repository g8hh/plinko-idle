/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Ball Modifier': '小球修饰符',
    'Save Game': '保存游戏',
    'Prestige': '声望',
    'Number Notation': '数字符号',
    'Modifier': '修饰符',
    'Traditional': '传统',
    'Scientific': '科学',
    'Game State': '游戏统计',
    'Double Ball Value': '双球价值',
    'Cost': '成本',
    'Cooldown': '冷却',
    'Click Modifier': '点击修饰符',
    'Ball Survival': '存活的小球',
    'Click Area': '点击区域',
    'Effect': '效果',
    'Engineering': '工程符号',
    'Hard Reset': '硬重置',
    'Token Gain': '代币收益',
    'Value': '价值',
    'Zone Modifier Increase': '区域修饰符增加',
    'Zone Unlock Discount': '区域解锁折扣',
    'Ok!': '好的！',
    'Decrease Circle Radius': '减小圆半径',
    'Increase Cross Rotation': '增加交叉旋转',
    'Shrinks Zone Diamonds': '缩小区域方块尺寸',
    'Shrinks Ramp Width': '缩小坡道长度',
    'Confirm': '确认',
    'Saved!': '已保存!',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    'Earn 125% the value of a ball by clicking it before it hits the bottom of the zone.': '在球触到球区底部之前点击它，可以获得球价的125%。',
    'Tip: Upgrading zones not only increases ball payouts that make it to the end of that zone, but also has another benifit unique to each zone.': '提示:升级区域不仅可以增加到达该区域的球费，而且每个区域都有另一个独特的好处。',
    'Tip: Upgrading balls not only increases their value, but also the frequency in which they spawn.': '提示:升级球不仅可以增加它们的价值，还可以增加它们产生的频率。',
    'Tip: Starting from the beginning sounds like a lot of work, but it\'s worth it in the long run.': '小贴士:从头开始听起来有很多工作要做，但从长远来看是值得的。',
    'There is a chance the ball will survive and make it into the next zone, where it can earn there as well.': '球有可能幸存下来并进入下一个区域，在那里也可以赢得球。',
    'If the ball makes it to the bottom of the zone, it will earn its value modified by the zone\'s modifier.': '如果球到达区域的底部，它的价值将被区域的修饰符修改。',

    //原样
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    "Effect: ": "效果: ",
    'Total Earned: ': '累计获得: ',
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    " ": "",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    "\n": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^x?\d+(\.\d+)?[A-Za-z%]{0,2}(\s.C)?\s*$/, //12.34K,23.4 °C
    /^x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /^\s*$/, //纯空格
    /^\d+(\.\d+)?[A-Za-z]{0,2}.?\(?([+\-]?(\d+(\.\d+)?[A-Za-z]{0,2})?)?$/, //12.34M (+34.34K
    /^(\d+(\.\d+)?[A-Za-z]{0,2}\/s)?.?\(?([+\-]?\d+(\.\d+)?[A-Za-z]{0,2})?\/s\stot$/, //2.74M/s (112.4K/s tot
    /^\d+(\.\d+)?(e[+\-]?\d+)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?$/, //2.177e+6 (+4.01+4
    /^(\d+(\.\d+)?(e[+\-]?\d+)?\/s)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?\/s\stot$/, //2.177e+6/s (+4.01+4/s tot
];
var cnExcludePostfix = [
    /:?\s*x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /:?\s*x?\d+(\.\d+)?[A-Za-z]{0,2}$/, //: 12.34K, x1.5
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
var cnRegReplace = new Map([
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^(\d+) Royal points$/, '$1 皇家点数'],
    [/^Inactive for (.+) seconds$/, '离开了 $1 秒'],
    [/^Cost: (\d+) RP$/, '成本：$1 皇家点数'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);