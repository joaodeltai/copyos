import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
  Link,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import Navigation from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

type UserData = {
  biography: string;
  client_profile: string;
};

export default function Home() {
  const [biography, setBiography] = useState('');
  const [clientProfile, setClientProfile] = useState('');
  const [loading, setLoading] = useState(true);
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
        .select('biography, client_profile')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setBiography(data.biography || '');
        setClientProfile(data.client_profile || '');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUserData = async (field: keyof UserData, value: string) => {
    try {
      // First, check if the user data exists
      const { data: existingData } = await supabase
        .from('user_data')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (existingData) {
        // Update existing record
        const { error } = await supabase
          .from('user_data')
          .update({
            [field]: value,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user?.id);

        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('user_data')
          .insert({
            user_id: user?.id,
            [field]: value,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar suas alterações.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleBiographyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setBiography(value);
      saveUserData('biography', value);
    } else {
      toast({
        title: 'Limite de caracteres excedido',
        description: 'A biografia deve ter no máximo 1000 caracteres',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClientProfileChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 6000) {
      setClientProfile(value);
      saveUserData('client_profile', value);
    } else {
      toast({
        title: 'Limite de caracteres excedido',
        description: 'O perfil do cliente deve ter no máximo 6000 caracteres',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return null;
  }

  return (
    <Box>
      <Navigation />
      <Container maxW="container.lg" py={10}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h1" size="xl" mb={4}>
              copyOS
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Criação automatizada de copy com base em pesquisa de mercado com IA
            </Text>
          </Box>

          <FormControl>
            <FormLabel>
              <Heading as="h2" size="md" mb={2}>
                Biografia do Autor/Empresa
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={2}>
                Preencha abaixo com informações básicas sobre você, sua empresa e ao menos 3 conquistas
                principais relacionadas ao seu trabalho (número de clientes, conquistas, prêmios,
                aparições na TV, etc.)
              </Text>
            </FormLabel>
            <Textarea
              value={biography}
              onChange={handleBiographyChange}
              placeholder="Digite sua biografia aqui..."
              size="lg"
              minH="150px"
              maxLength={1000}
            />
            <Text fontSize="sm" color="gray.500" mt={1}>
              {biography.length}/1000 caracteres
            </Text>
          </FormControl>

          <FormControl>
            <FormLabel>
              <Heading as="h2" size="md" mb={2}>
                Perfil do Cliente Ideal
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={2}>
                Aqui é onde você descreve o seu cliente ideal em detalhes. Esta é a informação que
                alimentará quase todos os agentes.
              </Text>
              <Text fontSize="sm" mb={2}>
                Agentes disponíveis:{' '}
                <Link as={NextLink} href="/agents/perfil-cliente-ideal" color="blue.500">
                  [Perfil do Cliente Ideal]
                </Link>{' '}
                |{' '}
                <Link as={NextLink} href="/agents/bussola-cliente" color="blue.500">
                  [Bússola do Cliente de Alto Valor]
                </Link>
              </Text>
            </FormLabel>
            <Textarea
              value={clientProfile}
              onChange={handleClientProfileChange}
              placeholder="Descreva seu cliente ideal aqui..."
              size="lg"
              minH="200px"
              maxLength={6000}
            />
            <Text fontSize="sm" color="gray.500" mt={1}>
              {clientProfile.length}/6000 caracteres
            </Text>
          </FormControl>
        </VStack>
      </Container>
    </Box>
  );
}
