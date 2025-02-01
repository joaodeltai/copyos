import {
  Box,
  Container,
  Grid,
  Textarea,
  Text,
  useToast,
  Button,
  Heading,
  VStack,
  Spinner,
  HStack,
  IconButton,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { FiCopy } from 'react-icons/fi';

export default function PerfilClienteIdeal() {
  const [additionalContext, setAdditionalContext] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [biography, setBiography] = useState('');
  const toast = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('user_data')
        .select('biography')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setBiography(data.biography || '');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  useEffect(() => {
    const processMarkdown = async () => {
      if (generatedContent) {
        const processedContent = await remark()
          .use(html)
          .process(generatedContent);
        setHtmlContent(processedContent.toString());
      }
    };
    processMarkdown();
  }, [generatedContent]);

  const formatProfileToMarkdown = (profile: any) => {
    return `# Perfil Do Cliente Ideal

## a) Dados Demográficos
- **Nome**: ${profile.demographic_data.name}
- **Idade**: ${profile.demographic_data.age}
- **Breve Descrição**: ${profile.demographic_data.brief_description}
- **Mercado-Alvo**: ${profile.demographic_data.target_market}
- **Avatar**: ${profile.demographic_data.avatar}

## b) Problema Principal
- **O Problema Principal Que Enfrentam**: ${profile.main_problem.primary_issue}
- **Problemas Secundários**:
${profile.main_problem.secondary_issues.map((issue: string) => `  - ${issue}`).join('\n')}

- **5 Principais Emoções em Torno Deste Problema**:
${profile.main_problem.emotional_aspects.primary_emotions.map((emotion: string) => `  - ${emotion}`).join('\n')}

- **5 Maiores Medos**:
${profile.main_problem.emotional_aspects.fears.map((fear: string) => `  - ${fear}`).join('\n')}

- **Desejos Secretos Mais Profundos**:
${profile.main_problem.emotional_aspects.secret_desires.map((desire: string) => `  - ${desire}`).join('\n')}

- **5 Maneiras Como Medos Afetam Relacionamentos**:
${profile.main_problem.relationship_impact.fear_effects.map((effect: string) => `  - ${effect}`).join('\n')}

- **5 Frases Conversacionais Ofensivas**:
${profile.main_problem.relationship_impact.trigger_phrases.map((phrase: string) => `  - ${phrase}`).join('\n')}

## c) Outras Soluções
- **O Que Tentaram no Passado**:
${profile.other_solutions.past_attempts.map((attempt: string) => `  - ${attempt}`).join('\n')}

- **Soluções Comuns Indesejadas**:
${profile.other_solutions.unwanted_solutions.map((solution: string) => `  - ${solution}`).join('\n')}

## d) Transformação Primária
- **Solução Perfeita**: ${profile.primary_transformation.perfect_solution}
- **Como Afetaria Relacionamentos**: ${profile.primary_transformation.relationship_effects}
- **Identidade do Avatar Transformado**: ${profile.primary_transformation.transformed_identity}
- **Futuro Presumido de Sucesso**: ${profile.primary_transformation.future_success}

- **Benefícios Práticos**:
${profile.primary_transformation.benefits.practical.map((benefit: string) => `  - ${benefit}`).join('\n')}

- **Benefícios Emocionais**:
${profile.primary_transformation.benefits.emotional.map((benefit: string) => `  - ${benefit}`).join('\n')}

## e) Especificidades Do Mercado
- **Base de Sucesso**: ${profile.market_specifics.success_foundation}

- **5 Maiores Objeções do Mercado**:
${profile.market_specifics.objections.market.map((objection: string) => `  - ${objection}`).join('\n')}

- **Objeções Práticas**:
${profile.market_specifics.objections.practical.map((objection: string) => `  - ${objection}`).join('\n')}

- **Objeções Emocionais**:
${profile.market_specifics.objections.emotional.map((objection: string) => `  - ${objection}`).join('\n')}

- **Palavras Poderosas**:
${profile.market_specifics.powerful_language.words.map((word: string) => `  - ${word}`).join('\n')}

- **Frases Poderosas**:
${profile.market_specifics.powerful_language.phrases.map((phrase: string) => `  - ${phrase}`).join('\n')}`;
  };

  const generateProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ideal-customer-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          biography,
          additionalContext,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate profile');
      }

      const data = await response.json();
      const markdownContent = formatProfileToMarkdown(data);
      setGeneratedContent(markdownContent);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Erro ao gerar perfil',
        description: 'Ocorreu um erro ao gerar o perfil do cliente ideal. Tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={8}>
        Perfil do Cliente Ideal
      </Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
        <Box>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="lg" fontWeight="medium">
              Contexto Adicional
            </Text>
            <Text fontSize="sm" color="gray.600">
              Use este campo para colocar qualquer informação relevante que será incluída no prompt
              final
            </Text>
            <Textarea
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              placeholder="Digite informações adicionais aqui..."
              size="lg"
              minH="300px"
            />
            <Button
              colorScheme="blue"
              onClick={generateProfile}
              isLoading={isLoading}
              loadingText="Gerando..."
            >
              Gerar Perfil
            </Button>
          </VStack>
        </Box>

        <Box>
          <HStack justify="space-between" mb={4}>
            <Text fontSize="lg" fontWeight="medium">
              Resultado
            </Text>
            {generatedContent && (
              <Tooltip label="Copiar markdown" placement="top">
                <IconButton
                  aria-label="Copiar markdown"
                  icon={<Icon as={FiCopy} />}
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedContent).then(() => {
                      toast({
                        title: 'Copiado!',
                        description: 'O conteúdo foi copiado para sua área de transferência',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                      });
                    });
                  }}
                />
              </Tooltip>
            )}
          </HStack>
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="sm"
            minH="300px"
            position="relative"
            overflowY="auto"
            maxH="80vh"
            sx={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'gray.300',
                borderRadius: '24px',
              },
              'h1': {
                fontSize: '2xl',
                fontWeight: 'bold',
                marginBottom: '1rem',
                marginTop: '1.5rem',
                color: 'blue.600',
              },
              'h2': {
                fontSize: 'xl',
                fontWeight: 'semibold',
                marginBottom: '0.75rem',
                marginTop: '1.25rem',
                color: 'blue.500',
              },
              'ul': {
                marginLeft: '1rem',
                marginBottom: '0.5rem',
              },
              'li': {
                marginBottom: '0.25rem',
              },
              'p': {
                marginBottom: '0.5rem',
              },
            }}
          >
            {isLoading ? (
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
              >
                <Spinner size="xl" />
              </Box>
            ) : (
              <Box
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                className="markdown-content"
              />
            )}
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
