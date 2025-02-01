import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

type RequestData = {
  biography: string;
  additionalContext: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { biography, additionalContext } = req.body as RequestData;

    const prompt = {
      type: "ideal_customer_profile",
      input: {
        biography,
        additionalContext,
      },
      output_structure: {
        demographic_data: {
          name: "string - Nome representativo do avatar",
          age: "number - Idade do avatar",
          brief_description: "string - Descrição resumida",
          target_market: "string - Mercado-alvo específico",
          avatar: "string - Descrição visual do avatar"
        },
        main_problem: {
          primary_issue: "string - Problema principal enfrentado",
          secondary_issues: "array[5] - Lista de problemas secundários",
          emotional_aspects: {
            primary_emotions: "array[5] - Emoções principais relacionadas ao problema",
            fears: "array[5] - Maiores medos",
            secret_desires: "array[4] - Desejos secretos mais profundos"
          },
          relationship_impact: {
            fear_effects: "array[5] - Como os medos afetam relacionamentos",
            trigger_phrases: "array[5] - Frases conversacionais que causam gatilho"
          }
        },
        other_solutions: {
          past_attempts: "array[4] - Soluções já tentadas",
          unwanted_solutions: "array[3] - Soluções comuns mas indesejadas"
        },
        primary_transformation: {
          perfect_solution: "string - Descrição da solução ideal",
          relationship_effects: "string - Como a solução afetaria relacionamentos",
          transformed_identity: "string - Como se veem após a transformação",
          future_success: "string - Visão de sucesso futuro",
          benefits: {
            practical: "array - Lista de benefícios práticos",
            emotional: "array - Lista de benefícios emocionais"
          }
        },
        market_specifics: {
          success_foundation: "string - Base para o sucesso",
          objections: {
            market: "array[5] - Principais objeções do mercado",
            practical: "array - Objeções práticas",
            emotional: "array - Objeções emocionais"
          },
          powerful_language: {
            words: "array - Palavras com forte impacto",
            phrases: "array - Frases com forte impacto"
          }
        }
      }
    };

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em marketing e pesquisa de mercado, focado em criar perfis detalhados de clientes ideais. Retorne apenas o JSON estruturado conforme solicitado, sem texto adicional.',
        },
        {
          role: 'user',
          content: JSON.stringify(prompt),
        },
      ],
      model: 'gpt-4-0125-preview',
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    res.status(200).json(response);
  } catch (error) {
    console.error('Error generating profile:', error);
    res.status(500).json({ error: 'Failed to generate profile' });
  }
}
