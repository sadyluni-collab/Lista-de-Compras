import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Check } from "lucide-react";
import { styles } from "./styles";
import { colors } from "../colors";

interface Props {
  onAdicionar: (nome: string) => void;
}

export default function Form({ onAdicionar }: Props) {
  const [texto, setTexto] = useState("");

  function adicionar() {
    if (!texto.trim()) {
      return;
    }

    onAdicionar(texto);
    setTexto("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="O que você precisa comprar?"
        value={texto}
        onChangeText={setTexto}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={adicionar}
      >
        <Check color={colors.surface} size={16} />
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}
