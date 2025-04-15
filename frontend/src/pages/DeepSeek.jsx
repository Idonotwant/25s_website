import { useState } from "react";
import services from "../services/index.js";
function DeepSeek() {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleSubmit = async () => {
    if (!userInput) {
      alert("請輸入問題！");
      return;
    }
    const response = await services.ai.getAnswer(userInput);

    if (response.status === 200) {
      setAiResponse(response.data.answer);
    } else {
      alert("獲取 AI 回答失敗，請稍後再試。");
      return;
    }
    setUserInput(""); // 清空輸入框
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* 左側：用戶輸入區 */}
      <div className="w-1/2 p-6 border-r border-gray-700">
        <h1 className="text-2xl font-bold mb-4">DeepSeek</h1>
        <p className="mb-6">DeepSeek 是一個探索和分析深度學習模型的工具。</p>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="請輸入您的問題..."
          className="w-full h-40 p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        >
          送出
        </button>
      </div>

      {/* 右側：AI 回答區 */}
      <div className="w-1/2 p-6">
        <h2 className="text-xl font-bold mb-4">AI 回答</h2>
        <div className="bg-gray-800 p-4 rounded-md border border-gray-600">
          {aiResponse || "AI 回答將顯示在這裡..."}
        </div>
      </div>
    </div>
  );
}

export default DeepSeek;
