import React, { useState } from 'react';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const predefinedResponses = {
    // === 日常问候类 (原 P0) ===
    "你好": {
      "response": "你好，我是CytoSeek助手，请问有什么可以帮您？",
      "videoUrl": ""
    },
    "在吗？": {
      "response": "在的！我是CytoSeek助手，随时准备协助您进行寄生虫细胞识别或系统操作。",
      "videoUrl": ""
    },
    "在吗": {
      "response": "在的！我是CytoSeek助手，随时准备协助您进行寄生虫细胞识别或系统操作。",
      "videoUrl": ""
    },
    "你能做什么？": {
      "response": "我可以帮助您识别显微图像中的寄生虫细胞、返回细胞坐标、调用CytoSeek系统进行自动捕捉，也可以解答相关操作问题。需要试试吗？",
      "videoUrl": ""
    },
    "你能做什么": {
      "response": "我可以帮助您识别显微图像中的寄生虫细胞、返回细胞坐标、调用CytoSeek系统进行自动捕捉，也可以解答相关操作问题。需要试试吗？",
      "videoUrl": ""
    },
    "你是谁": {
      "response": "我是CytoSeek智能助手，专门用于辅助寄生虫的识别与捕捉。",
      "videoUrl": ""
    },
    "谢谢": {
      "response": "不客气，很高兴能帮到您。还有其他需要吗？",
      "videoUrl": ""
    },
    "再见": {
      "response": "再见！期待下次为您服务。",
      "videoUrl": ""
    },

    // === 寄生虫识别与坐标查询 (原 P1) ===
    "请你识别并标注出显微图像中的寄生虫细胞": {
      "response": "已识别并标注出寄生虫细胞，图中的bbox代表寄生虫细胞",
      "videoUrl": ""
    },
    "图里有寄生虫吗？": {
      "response": "有的！已识别并标注出寄生虫细胞，图中的bbox代表寄生虫细胞",
      "videoUrl": ""
    },
    "图里有寄生虫吗": {
      "response": "有的！已识别并标注出寄生虫细胞，图中的bbox代表寄生虫细胞",
      "videoUrl": ""
    },
    "请你返回给我寄生虫细胞的坐标": {
      "response": "寄生虫细胞的坐标：[220,142]",
      "videoUrl": ""
    },
    "能不能把寄生虫的位置告诉我？": {
      "response": "寄生虫细胞的坐标：[220,142]",
      "videoUrl": ""
    },
    "能不能把寄生虫的位置告诉我": {
      "response": "寄生虫细胞的坐标：[220,142]",
      "videoUrl": ""
    },
    "返回寄生虫细胞的坐标": {
      "response": "寄生虫细胞的坐标：[220,142]",
      "videoUrl": ""
    },
    "坐标准确吗？": {
      "response": "坐标基于当前图像的识别模型输出，精度可达±5像素。如需更高精度，建议结合CytoSeek系统进行实时校准。",
      "videoUrl": ""
    },
    "坐标准确吗": {
      "response": "坐标基于当前图像的识别模型输出，精度可达±5像素。如需更高精度，建议结合CytoSeek系统进行实时校准。",
      "videoUrl": ""
    },
    "这里有多少个寄生虫细胞？": {
      "response": "正在为您统计... 图像中共识别出1个寄生虫细胞。",
      "videoUrl": ""
    },
    "这里有多少个寄生虫细胞": {
      "response": "正在为您统计... 图像中共识别出1个寄生虫细胞。",
      "videoUrl": ""
    },
    "这个识别的准确率怎么样？": {
      "response": "当前模型的平均识别准确率在95%以上，但会受到图像质量、细胞密度和杂质干扰等因素的影响。",
      "videoUrl": ""
    },
    "这个识别的准确率怎么样": {
      "response": "当前模型的平均识别准确率在95%以上，但会受到图像质量、细胞密度和杂质干扰等因素的影响。",
      "videoUrl": ""
    },
    "bbox是什么意思？": {
      "response": "Bbox是'Bounding Box'的缩写，也就是边界框，它用来精确地标示出识别到的寄生虫细胞的位置和范围。",
      "videoUrl": ""
    },
    "bbox是什么意思": {
      "response": "Bbox是'Bounding Box'的缩写，也就是边界框，它用来精确地标示出识别到的寄生虫细胞的位置和范围。",
      "videoUrl": ""
    },

    // === CytoSeek 系统调用 (原 P2) ===
    "现在请你调用CytoSeek系统，识别并捕捉视野中的寄生虫细胞": {
      "response": "已调用CytoSeek系统，正在执行捕捉...",
      "videoUrl": ""
    },
    "启动自动捕捉功能": {
      "response": "已调用CytoSeek系统，正在执行捕捉...",
      "videoUrl": ""
    },
    "CytoSeek系统运行了吗？": {
      "response": "是的，CytoSeek系统已启动，正在识别并捕捉视野中的寄生虫细胞，请稍候。",
      "videoUrl": ""
    },
    "CytoSeek系统运行了吗": {
      "response": "是的，CytoSeek系统已启动，正在识别并捕捉视野中的寄生虫细胞，请稍候。",
      "videoUrl": ""
    },
    "捕捉完成了吗？": {
      "response": "捕捉任务已完成！共捕获1个寄生虫细胞，位于坐标[220,142]。是否需要导出结果或继续操作？",
      "videoUrl": ""
    },
    "捕捉完成了吗": {
      "response": "捕捉任务已完成！共捕获1个寄生虫细胞，位于坐标[220,142]。是否需要导出结果或继续操作？",
      "videoUrl": ""
    },
    "帮我抓一下这个细胞": {
      "response": "请问您是指坐标为[220,142]的这个细胞吗？确认后我将立即调用系统执行捕捉。",
      "videoUrl": ""
    },
    "停止捕捉": {
      "response": "已发送停止指令。CytoSeek系统将完成当前操作后暂停。需要取消整个任务吗？",
      "videoUrl": ""
    },
    "现在进度怎么样了？": {
      "response": "系统正在移动微管至目标细胞附近，预计还需要15秒完成捕捉。",
      "videoUrl": ""
    },
    "现在进度怎么样了": {
      "response": "系统正在移动微管至目标细胞附近，预计还需要15秒完成捕捉。",
      "videoUrl": ""
    },
    "捕捉一个需要多久？": {
      "response": "单个细胞的完整捕捉流程，包括识别、定位和提取，通常需要30到60秒，具体时间取决于细胞的位置和设备响应速度。",
      "videoUrl": ""
    },
    "捕捉一个需要多久": {
      "response": "单个细胞的完整捕捉流程，包括识别、定位和提取，通常需要30到60秒，具体时间取决于细胞的位置和设备响应速度。",
      "videoUrl": ""
    },

    // === 错误处理与澄清 (原 P3) ===
    "图像里没有寄生虫怎么办？": {
      "response": "如果当前视野未检测到寄生虫细胞，建议调整焦平面或移动载物台寻找新视野。需要我协助调用CytoSeek进行全视野扫描吗？",
      "videoUrl": ""
    },
    "图像里没有寄生虫怎么办": {
      "response": "如果当前视野未检测到寄生虫细胞，建议调整焦平面或移动载物台寻找新视野。需要我协助调用CytoSeek进行全视野扫描吗？",
      "videoUrl": ""
    },
    "你识别错了，那个不是寄生虫": {
      "response": "感谢您的反馈！我会记录此次误识别。您可以手动框选正确的细胞或排除错误目标，以帮助系统后续进行模型优化。",
      "videoUrl": ""
    },
    "怎么导出识别结果？": {
      "response": "目前识别结果可导出为JSON或CSV格式，包含所有bbox坐标与置信度。需要我立即为您生成并提供下载链接吗？",
      "videoUrl": ""
    },
    "怎么导出识别结果": {
      "response": "目前识别结果可导出为JSON或CSV格式，包含所有bbox坐标与置信度。需要我立即为您生成并提供下载链接吗？",
      "videoUrl": ""
    },
    "图像太模糊了，能识别吗？": {
      "response": "图像清晰度会严重影响识别精度。建议您先调整显微镜的焦距，获得清晰图像后再进行识别，这样效果最好。",
      "videoUrl": ""
    },
    "图像太模糊了能识别吗": {
      "response": "图像清晰度会严重影响识别精度。建议您先调整显微镜的焦距，获得清晰图像后再进行识别，这样效果最好。",
      "videoUrl": ""
    },
    "系统没反应了": {
      "response": "请检查CytoSeek系统的硬件连接和软件状态是否正常。如果问题持续，建议重启控制软件或联系技术支持。",
      "videoUrl": ""
    },
    "为什么会漏掉一些细胞？": {
      "response": "这可能是因为细胞重叠、图像焦点不清晰或细胞形态不典型导致的。提高图像质量或尝试在不同焦平面上多次识别可以改善这个问题。",
      "videoUrl": ""
    },
    "为什么会漏掉一些细胞": {
      "response": "这可能是因为细胞重叠、图像焦点不清晰或细胞形态不典型导致的。提高图像质量或尝试在不同焦平面上多次识别可以改善这个问题。",
      "videoUrl": ""
    },
    "我想看操作说明": {
      "response": "好的，您可以在系统主界面的‘帮助’菜单中找到详细的用户手册和操作视频教程。",
      "videoUrl": ""
    }
};

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    const newMessages = [...messages, { type: 'user', text: inputValue }];
    setMessages(newMessages);

    // 开始思考状态
    setIsThinking(true);
    
    // 模拟思考时间
    setTimeout(() => {
      setIsThinking(false);
      
      // 检查是否匹配预定义输入
      let agentResponse = "抱歉，我无法处理这个请求。";
      let videoUrl = "";
      
      for (const [key, value] of Object.entries(predefinedResponses)) {
        if (inputValue.includes(key) || inputValue === key) {
          agentResponse = value.response;
          videoUrl = value.videoUrl;
          break;
        }
      }

      // 设置当前视频URL
      setCurrentVideoUrl(videoUrl);
      
      // 先插入一个空的 agent 消息
      setMessages(prev => [...prev, { type: 'agent', text: '' }]);

      // 逐字更新最后一条 agent 消息
      let index = 0;
      const interval = setInterval(() => {
        if (index < agentResponse.length) {
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              text: agentResponse.slice(0, index + 1)
            };
            return updated;
          });
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50); // 逐字打印速度

    }, 1500); // 思考时间1.5秒

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CytoSeek微生物识别与捕捉系统</h1>
          <p className="text-gray-600">AI驱动的显微图像分析与自动化细胞操作</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 h-[70vh]">
          {/* 左侧对话框 */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full flex flex-col relative">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">CytoSeek-Agent</h2>
              </div>
              
              <div className="flex-1 p-6 space-y-4 overflow-y-auto relative">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`max-w-[80%] p-4 rounded-xl ${
                      msg.type === 'user' 
                        ? 'ml-auto bg-blue-50 text-gray-800 border-l-4 border-blue-500' 
                        : 'mr-auto bg-gray-100 text-gray-800 border-l-4 border-gray-400'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {msg.text}
                      {msg.type === 'agent' && index === messages.length - 1 && msg.text.length > 0 && msg.text.length < 50 ? 
                        <span className="animate-pulse">|</span> : ''}
                    </div>
                  </div>
                ))}
                
                {/* 正在思考的动画 */}
                {isThinking && (
                  <div className="flex justify-center items-center py-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}
                
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 pt-8">
                    开始输入您的请求，CytoSeek助手将为您服务
                  </div>
                )}
              </div>

              {/* CytoSeek Logo 作为固定背景水印 - 在对话框中间 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none z-0">
                <img 
                  src="/logo.png" 
                  alt="CytoSeek Logo" 
                  className="w-64 h-64 object-contain"
                />
              </div>

              {/* 输入区域 */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="请输入您的请求..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isThinking}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isThinking 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    发送
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧视频区域 */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full flex flex-col">
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">显微视频预览</h2>
              </div>
              
              <div className="flex-1 p-6 flex items-center justify-center">
                {currentVideoUrl ? (
                  <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                    <video
                      src={currentVideoUrl}
                      controls
                      className="w-full h-full object-cover"
                      autoPlay
                    />
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-4.553A2 2 0 0120 6v12a2 2 0 01-2 2h-2.793a2 2 0 01-1.697-.59L12 19.407V4.593a2 2 0 011.697-.59L15 10z" />
                      </svg>
                    </div>
                    <p>等待用户输入以显示对应视频</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
