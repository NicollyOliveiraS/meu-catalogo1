import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Animated,
  Image, // <--- Importado aqui
} from 'react-native';

import catalogo from '../catalogo.json';

// ─── Tipos ───────────────────────────────────────────────────────────────────

type TipoObra = 'livro' | 'série' | 'filme';

type Obra = {
  id: number;
  tipo: TipoObra;
  titulo: string;
  subtitulo: string;
  ano: number;
  descricao: string;
  imagem?: string; // <--- Adicionado aqui
};

type Filtro = 'todos' | TipoObra;

// ─── Configuração dos tipos ──────────────────────────────────────────────────

const TIPO_CONFIG: Record<
  TipoObra,
  {
    label: string;
    cor: string;
    fundoCapa: string;
  }
> = {
  livro: {
    label: 'LIVRO',
    cor: '#c0392b',
    fundoCapa: '#1c0707',
  },

  série: {
    label: 'SÉRIE',
    cor: '#2471a3',
    fundoCapa: '#060f1a',
  },

  filme: {
    label: 'FILME',
    cor: '#1e8449',
    fundoCapa: '#061507',
  },
};

// ─── Filtros ─────────────────────────────────────────────────────────────────

const FILTROS: {
  key: Filtro;
  label: string;
}[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'livro', label: 'Livros' },
  { key: 'série', label: 'Séries' },
  { key: 'filme', label: 'Filmes' },
];

// ─── Dimensões ───────────────────────────────────────────────────────────────

const CARD_HEIGHT = 160;
const CAPA_WIDTH = 110;

// ─── Card ────────────────────────────────────────────────────────────────────

function ObraCard({ obra }: { obra: Obra }) {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const isFlipped = useRef(false);

  const config = TIPO_CONFIG[obra.tipo];

  // ─── Rotações e Opacidades ──────────────────────────────────────────────────

  const frontRotateY = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backRotateY = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleFlip = () => {
    const toValue = isFlipped.current ? 0 : 180;
    isFlipped.current = !isFlipped.current;

    Animated.spring(flipAnim, {
      toValue,
      friction: 7,
      tension: 12,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={handleFlip}
      activeOpacity={1}
      style={styles.cardWrapper}
    >
      {/* FRENTE DO CARD */}
      <Animated.View
        style={[
          styles.cardFace,
          {
            borderLeftColor: config.cor,
            opacity: frontOpacity,
            transform: [
              { perspective: 1200 },
              { rotateY: frontRotateY },
            ],
          },
        ]}
      >
        {/* ESPAÇO DA CAPA COM SUPORTE A IMAGEM */}
        <View
          style={[
            styles.capaBox,
            {
              backgroundColor: config.fundoCapa,
              borderRightColor: config.cor + '30',
            },
          ]}
        >
          {obra.imagem ? (
            <Image
              source={{ uri: obra.imagem }}
              style={styles.capaImagem}
              resizeMode="cover"
            />
          ) : (
            <>
              {/* Cantos decorativos (exibidos apenas quando não há imagem) */}
              <View style={[styles.capaCantoTL, { borderColor: config.cor }]} />
              <View style={[styles.capaCantoTR, { borderColor: config.cor }]} />
              <View style={[styles.capaCantoBL, { borderColor: config.cor }]} />
              <View style={[styles.capaCantoBR, { borderColor: config.cor }]} />

              <View style={styles.capaCenter}>
                <Text style={[styles.capaIcone, { color: config.cor + '90' }]}>
                  🖼
                </Text>
                <Text style={[styles.capaLegenda, { color: config.cor + '70' }]}>
                  CAPA
                </Text>
              </View>
            </>
          )}
        </View>

        {/* INFORMAÇÕES */}
        <View style={styles.infoCol}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: config.cor + '25',
                borderColor: config.cor + '55',
              },
            ]}
          >
            <Text style={[styles.badgeTexto, { color: config.cor }]}>
              {config.label}
            </Text>
          </View>

          <Text style={styles.titulo} numberOfLines={2}>
            {obra.titulo.toUpperCase()}
          </Text>

          <View style={[styles.divisor, { backgroundColor: config.cor }]} />

          <Text style={styles.subtitulo} numberOfLines={2}>
            {obra.subtitulo}
          </Text>

          <Text style={styles.ano}>{obra.ano}</Text>

          <Text style={[styles.dica, { color: config.cor + 'cc' }]}>
            Toque para ver ›
          </Text>
        </View>
      </Animated.View>

      {/* VERSO DO CARD */}
      <Animated.View
        style={[
          styles.cardFace,
          styles.cardVerso,
          {
            borderLeftColor: config.cor,
            opacity: backOpacity,
            transform: [
              { perspective: 1200 },
              { rotateY: backRotateY },
            ],
          },
        ]}
      >
        <View style={[styles.versoFaixa, { backgroundColor: config.cor }]} />

        <View style={styles.versoBody}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: config.cor + '25',
                borderColor: config.cor + '55',
                marginBottom: 8,
              },
            ]}
          >
            <Text style={[styles.badgeTexto, { color: config.cor }]}>
              {config.label} · {obra.ano}
            </Text>
          </View>

          <Text style={styles.versoTitulo} numberOfLines={1}>
            {obra.titulo}
          </Text>

          <View style={[styles.divisor, { backgroundColor: config.cor, marginBottom: 8 }]} />

          <Text style={styles.versoDescricao} numberOfLines={4}>
            {obra.descricao}
          </Text>

          <Text style={[styles.dica, { color: config.cor + 'cc', marginTop: 8 }]}>
            ‹ Voltar
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

// ─── Tela principal ──────────────────────────────────────────────────────────

export default function CatalogoScreen() {
  const [filtroAtivo, setFiltroAtivo] = useState<Filtro>('todos');
  const obras = catalogo as Obra[];

  const filtradas =
    filtroAtivo === 'todos'
      ? obras
      : obras.filter((obra) => obra.tipo === filtroAtivo);

  const contadores: Record<Filtro, number> = {
    todos: obras.length,
    livro: obras.filter((o) => o.tipo === 'livro').length,
    série: obras.filter((o) => o.tipo === 'série').length,
    filme: obras.filter((o) => o.tipo === 'filme').length,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      <View style={styles.header}>
        <Text style={styles.eyebrow}>✦ COLEÇÃO LITERÁRIA & AUDIOVISUAL ✦</Text>
        <Text style={styles.headerTitulo}>Obras de</Text>
        <Text style={styles.headerNome}>Raphael Montes</Text>
        <View style={styles.headerDivider} />
        <Text style={styles.headerSub}>
          {obras.length} obras · Livros, Séries & Filmes
        </Text>
      </View>

      <View style={styles.filtrosWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtrosScroll}
        >
          {FILTROS.map((filtro) => {
            const ativo = filtroAtivo === filtro.key;
            const cor =
              filtro.key !== 'todos'
                ? TIPO_CONFIG[filtro.key as TipoObra].cor
                : '#c0392b';

            return (
              <TouchableOpacity
                key={filtro.key}
                onPress={() => setFiltroAtivo(filtro.key)}
                style={[
                  styles.filtroBotao,
                  ativo && {
                    borderColor: cor,
                    backgroundColor: cor + '18',
                  },
                ]}
                activeOpacity={0.7}
              >
                <Text style={[styles.filtroLabel, ativo && { color: '#eee' }]}>
                  {filtro.label}
                </Text>
                <View
                  style={[
                    styles.filtroNum,
                    ativo && { backgroundColor: cor + '33' },
                  ]}
                >
                  <Text style={[styles.filtroNumTexto, ativo && { color: cor }]}>
                    {contadores[filtro.key]}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.lista}
        contentContainerStyle={styles.listaContent}
        showsVerticalScrollIndicator={false}
      >
        {filtradas.map((obra) => (
          <ObraCard key={obra.id} obra={obra} />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerTexto}>— Fim do catálogo —</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Estilos ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: {
    paddingTop: 52,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: '#0f0f0f',
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e1e',
    alignItems: 'center',
  },
  eyebrow: {
    color: '#c0392b',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 8,
  },
  headerTitulo: { color: '#777', fontSize: 15, fontWeight: '300', letterSpacing: 2 },
  headerNome: { color: '#f5f5f5', fontSize: 26, fontWeight: '800', letterSpacing: 1, marginTop: 2 },
  headerDivider: { width: 40, height: 2, backgroundColor: '#c0392b', borderRadius: 2, marginVertical: 10 },
  headerSub: { color: '#444', fontSize: 11, letterSpacing: 1.5 },
  filtrosWrapper: { backgroundColor: '#0f0f0f', borderBottomWidth: 1, borderBottomColor: '#1a1a1a' },
  filtrosScroll: { paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', gap: 8 },
  filtroBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#252525',
    backgroundColor: '#141414',
  },
  filtroLabel: { color: '#555', fontSize: 13, fontWeight: '600' },
  filtroNum: { backgroundColor: '#1e1e1e', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 1 },
  filtroNumTexto: { color: '#444', fontSize: 11, fontWeight: '700' },
  lista: { flex: 1 },
  listaContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 48 },
  cardWrapper: { height: CARD_HEIGHT, marginBottom: 14 },
  cardFace: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#252525',
    borderLeftWidth: 4,
    backgroundColor: '#161616',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  capaBox: {
    width: CAPA_WIDTH,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Importante para não vazar os cantos da imagem
  },
  // Novo estilo adicionado para a imagem
  capaImagem: {
    width: '100%',
    height: '100%',
  },
  capaCantoTL: { position: 'absolute', top: 10, left: 10, width: 16, height: 16, borderTopWidth: 2, borderLeftWidth: 2, borderRadius: 2 },
  capaCantoTR: { position: 'absolute', top: 10, right: 10, width: 16, height: 16, borderTopWidth: 2, borderRightWidth: 2, borderRadius: 2 },
  capaCantoBL: { position: 'absolute', bottom: 10, left: 10, width: 16, height: 16, borderBottomWidth: 2, borderLeftWidth: 2, borderRadius: 2 },
  capaCantoBR: { position: 'absolute', bottom: 10, right: 10, width: 16, height: 16, borderBottomWidth: 2, borderRightWidth: 2, borderRadius: 2 },
  capaCenter: { alignItems: 'center', gap: 5 },
  capaIcone: { fontSize: 26 },
  capaLegenda: { fontSize: 8, fontWeight: '700', letterSpacing: 2 },
  infoCol: { flex: 1, paddingVertical: 12, paddingHorizontal: 12, justifyContent: 'space-between' },
  badge: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 5, paddingHorizontal: 7, paddingVertical: 2 },
  badgeTexto: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  titulo: { color: '#f0f0f0', fontSize: 14, fontWeight: '800', letterSpacing: 0.8, lineHeight: 19 },
  divisor: { height: 2, width: 20, borderRadius: 2, marginVertical: 6 },
  subtitulo: { color: '#666', fontSize: 11, lineHeight: 15 },
  ano: { color: '#444', fontSize: 10, fontWeight: '600', letterSpacing: 1 },
  dica: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  cardVerso: { flexDirection: 'row' },
  versoFaixa: { width: 4, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
  versoBody: { flex: 1, paddingVertical: 12, paddingHorizontal: 14, justifyContent: 'flex-start' },
  versoTitulo: { color: '#f0f0f0', fontSize: 14, fontWeight: '800', marginBottom: 6 },
  versoDescricao: { color: '#aaa', fontSize: 11, lineHeight: 17 },
  footer: { alignItems: 'center', paddingTop: 24, borderTopWidth: 1, borderTopColor: '#1a1a1a' },
  footerTexto: { color: '#2a2a2a', fontSize: 11, letterSpacing: 2 },
});