import { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CircleCheckBig, CircleDashed } from "lucide-react";

import { styles } from "./styles";
import ProdutoListaItem from "../ProdutoListaItem/ProdutoListaItem";
import { colors } from "../colors";
import { ProdutoItem } from "../../interfaces/ProdutoItem";

interface Props {
  produtos: ProdutoItem[];
  onAlternar: (id: string) => void;
  onRemover: (id: string) => void;
  onLimpar: (comprados: boolean) => void;
}

export default function ListaItens({
  produtos,
  onAlternar,
  onRemover,
  onLimpar,
}: Props) {
  const [active, setActive] = useState<
    "presentes" | "comprados"
  >("presentes");

  const produtosFiltrados = produtos.filter((produto) =>
    active === "presentes"
      ? !produto.comprado
      : produto.comprado
  );

  function limpar() {
    onLimpar(active === "comprados");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.buttonTopBar}
          onPress={() => setActive("presentes")}
        >
          <CircleDashed
            color={
              active === "presentes"
                ? colors.azul450
                : colors.textSecondary
            }
          />

          <Text
            style={{
              color:
                active === "presentes"
                  ? colors.azul450
                  : colors.textSecondary,
            }}
          >
            Presentes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTopBar}
          onPress={() => setActive("comprados")}
        >
          <CircleCheckBig
            color={
              active === "comprados"
                ? colors.azul360
                : colors.textSecondary
            }
          />

          <Text
            style={{
              color:
                active === "comprados"
                  ? colors.azul360
                  : colors.textSecondary,
            }}
          >
            Comprados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={limpar}
        >
          <Text style={{ color: colors.textSecondary }}>
            Limpar
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList<ProdutoItem>
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProdutoListaItem
            produto={item}
            onAlternar={onAlternar}
            onRemover={onRemover}
          />
        )}
      />
    </View>
  );
}
