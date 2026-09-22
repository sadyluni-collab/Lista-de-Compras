import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import ListaItens from "./components/ListaItens/ListaItens";
import { colors } from "./components/colors";
import { ProdutoItem } from "./interfaces/ProdutoItem";

const STORAGE_KEY = "@lista_de_compras";

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoItem[]>([]);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);

        if (dadosSalvos) {
          setProdutos(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }

    carregarProdutos();
  }, []);

  useEffect(() => {
    async function salvarProdutos() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(produtos)
        );
      } catch (error) {
        console.error("Erro ao salvar produtos:", error);
      }
    }

    salvarProdutos();
  }, [produtos]);

  function adicionarProduto(nome: string) {
    const nomeLimpo = nome.trim();

    if (!nomeLimpo) {
      return;
    }

    const novoProduto: ProdutoItem = {
      id: Date.now().toString(),
      nome: nomeLimpo,
      comprado: false,
    };

    setProdutos((produtosAtuais) => [
      ...produtosAtuais,
      novoProduto,
    ]);
  }

  function alternarComprado(id: string) {
    setProdutos((produtosAtuais) =>
      produtosAtuais.map((produto) =>
        produto.id === id
          ? { ...produto, comprado: !produto.comprado }
          : produto
      )
    );
  }

  function removerProduto(id: string) {
    setProdutos((produtosAtuais) =>
      produtosAtuais.filter((produto) => produto.id !== id)
    );
  }

  function limparItens(comprados: boolean) {
    setProdutos((produtosAtuais) =>
      produtosAtuais.filter(
        (produto) => produto.comprado !== comprados
      )
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        <Header />

        <Form onAdicionar={adicionarProduto} />

        <ListaItens
          produtos={produtos}
          onAlternar={alternarComprado}
          onRemover={removerProduto}
          onLimpar={limparItens}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
