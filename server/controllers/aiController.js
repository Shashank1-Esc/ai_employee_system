import axios from 'axios';
import Employee from '../models/Employee.js';

// @desc    Generate AI Recommendation
// @route   POST /api/ai/recommend
// @access  Private
export const getRecommendation = async (req, res, next) => {
    try {
        const { employeeId } = req.body;
        
        if (!employeeId) {
            res.status(400);
            throw new Error('Employee ID is required');
        }

        const employee = await Employee.findById(employeeId);
        
        if (!employee) {
            res.status(404);
            throw new Error('Employee not found');
        }

        const prompt = `
            Analyze the following employee data and provide a professional HR recommendation.
            
            Employee Details:
            - Name: ${employee.name}
            - Department: ${employee.department}
            - Experience: ${employee.experience} years
            - Performance Score: ${employee.performanceScore}/100
            - Skills: ${employee.skills.join(', ')}

            Please output a valid JSON object ONLY, with the following exact keys:
            - promotionEligibility (string: e.g. "Eligible", "Not Eligible", "Needs Improvement")
            - strengths (array of strings)
            - weaknesses (array of strings)
            - trainingRecommendation (string)
            - rankingScore (number out of 10)
            - finalRecommendation (string: detailed HR summary)
            
            Return ONLY the raw JSON format without markdown code blocks, backticks, or any other text.
        `;

        try {
            const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
                model: 'google/gemini-2.5-flash',
                messages: [
                    { role: 'system', content: 'You are an expert HR AI Assistant. Always respond with pure JSON.' },
                    { role: 'user', content: prompt }
                ]
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'http://localhost:5173',
                    'X-Title': 'AI Employee System',
                    'Content-Type': 'application/json'
                }
            });

            const content = response.data.choices[0].message.content;
            
            // Clean markdown JSON formatting if present
            const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
            
            const aiData = JSON.parse(cleanContent);
            res.json(aiData);
            
        } catch (apiError) {
            console.error("OpenRouter API Error:", apiError.message);
            // Fallback response in case AI fails
            res.json({
                promotionEligibility: employee.performanceScore > 80 ? "Eligible" : "Needs Improvement",
                strengths: employee.skills.length > 0 ? employee.skills : ["Dedicated worker"],
                weaknesses: ["Requires more specialized training"],
                trainingRecommendation: "Standard department upskilling program",
                rankingScore: Math.round(employee.performanceScore / 10),
                finalRecommendation: "This is a fallback response because the AI service is currently unavailable. Please check API keys."
            });
        }
        
    } catch (err) {
        next(err);
    }
};
