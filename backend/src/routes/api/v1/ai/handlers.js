import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_API_KEY);

export async function talk(req, res) {
  const { question } = req.body;
  console.log("用戶輸入:", question);

  try {
    const aiResponse = await client.chatCompletion({
      provider: "novita",
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    });

    const result = aiResponse.choices[0].message.content;
    res.json({ answer: result }); //
  } catch (error) {
    console.error("AI 回覆失敗:", error);
    res.status(500).json({ error: "AI 回覆失敗" });
  }
}
