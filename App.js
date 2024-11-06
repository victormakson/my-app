import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de login
    console.log('Login com', email, password);
  };

  const handleRegister = async () => {
    // Lógica de cadastro
    console.log('Cadastro com', name, email, password, cep, bairro, estado);
    
    // Após o cadastro, retornar para a tela de login
    setIsLogin(true);
    
    // Limpar os campos após o cadastro
    setName('');
    setCep('');
    setBairro('');
    setEstado('');
    setEmail('');
    setPassword('');
  };

  const fetchAddress = async () => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setBairro(data.bairro);
          setEstado(data.uf);
        } else {
          alert('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    } else {
      alert('CEP deve ter 8 dígitos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Cadastro'}</Text>
      {!isLogin && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="CEP"
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
            onBlur={fetchAddress} // Chama a função ao sair do campo
          />
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            value={bairro}
            onChangeText={setBairro}
            editable={false} // Campo não editável, preenchido automaticamente
          />
          <TextInput
            style={styles.input}
            placeholder="Estado"
            value={estado}
            onChangeText={setEstado}
            editable={false} // Campo não editável, preenchido automaticamente
          />
        </>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={isLogin ? 'Entrar' : 'Cadastrar'}
        onPress={isLogin ? handleLogin : handleRegister}
      />
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  switchText: {
    marginTop: 12,
    color: 'blue',
  },
});