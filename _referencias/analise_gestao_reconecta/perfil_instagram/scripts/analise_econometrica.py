import csv
import math
from collections import defaultdict
from datetime import datetime

import os

CSV_FILE = 'data/posts_comparativo_gestoes.csv' if os.path.exists('data/posts_comparativo_gestoes.csv') else ('../data/posts_comparativo_gestoes.csv' if os.path.exists('../data/posts_comparativo_gestoes.csv') else 'posts_comparativo_gestoes.csv')

def load_data():
    with open(CSV_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        return list(reader)

def calculate_hhi(proportions):
    """Calcula o índice de Herfindahl-Hirschman (0 a 10.000)."""
    return sum((p * 100) ** 2 for p in proportions)

def calculate_gini(values):
    """Calcula o Coeficiente de Gini (0 a 1)."""
    sorted_v = sorted(values)
    n = len(sorted_v)
    if n == 0 or sum(sorted_v) == 0:
        return 0
    total = sum(sorted_v)
    cumulative = 0
    gini_sum = 0
    for i, v in enumerate(sorted_v):
        cumulative += v
        gini_sum += (2 * (i + 1) - n - 1) * v
    return gini_sum / (n * total)

def chi_squared_uniform(observed):
    """Teste Qui-Quadrado de Aderência contra distribuição uniforme."""
    k = len(observed)
    total = sum(observed)
    expected = total / k
    chi2 = sum((obs - expected) ** 2 / expected for obs in observed)
    df = k - 1
    return chi2, df

def t_test_difference(g1, g2):
    """Teste t de Student para duas amostras independentes."""
    n1, n2 = len(g1), len(g2)
    if n1 < 2 or n2 < 2:
        return 0, 0, 1.0
    m1 = sum(g1) / n1
    m2 = sum(g2) / n2
    v1 = sum((x - m1) ** 2 for x in g1) / (n1 - 1)
    v2 = sum((x - m2) ** 2 for x in g2) / (n2 - 1)
    se = math.sqrt(v1 / n1 + v2 / n2)
    if se == 0:
        return m1 - m2, 0, 1.0
    t_stat = (m1 - m2) / se
    df = n1 + n2 - 2
    return m1, m2, t_stat, df

def run_econometric_analysis():
    posts = load_data()
    print(f"Loaded {len(posts)} posts from {CSV_FILE}.")

    reconecta = [p for p in posts if 'Reconecta' in p['gestao']]
    anterior = [p for p in posts if 'Anterior' in p['gestao']]

    print(f"Reconecta: {len(reconecta)} posts | Anterior: {len(anterior)} posts")

    # 1. HHI de Concentração Temática
    def get_cat_distribution(dataset):
        counts = defaultdict(int)
        for p in dataset:
            counts[p['macro_categoria']] += 1
        total = len(dataset)
        proportions = [counts[c] / total for c in counts]
        hhi = calculate_hhi(proportions)
        gini = calculate_gini(list(counts.values()))
        return counts, proportions, hhi, gini

    rec_counts, rec_props, rec_hhi, rec_gini = get_cat_distribution(reconecta)
    ant_counts, ant_props, ant_hhi, ant_gini = get_cat_distribution(anterior)

    print("\n--- 1. CONCENTRAÇÃO TEMÁTICA (HHI & GINI) ---")
    print(f"Gestão Reconecta HHI: {rec_hhi:.1f} (Gini: {rec_gini:.3f})")
    print("Distribuição Reconecta:", dict(rec_counts))
    print(f"Gestão Anterior HHI: {ant_hhi:.1f} (Gini: {ant_gini:.3f})")
    print("Distribuição Anterior:", dict(ant_counts))

    # 2. Teste Qui-Quadrado de Sazonalidade Temporal (Reconecta)
    # Agrupa por mês (11 meses de mandato: Dez/25 a Out/26)
    rec_monthly = defaultdict(int)
    for p in reconecta:
        dt = datetime.fromisoformat(p['timestamp_iso'].replace('Z', '+00:00'))
        ym = f"{dt.year}-{dt.month:02d}"
        rec_monthly[ym] += 1

    monthly_counts = [rec_monthly[k] for k in sorted(rec_monthly.keys())]
    chi2_val, df_val = chi_squared_uniform(monthly_counts)
    
    print("\n--- 2. TESTE QUI-QUADRADO DE SAZONALIDADE TEMPORAL (RECONECTA) ---")
    print("Contagem mensal:", dict(sorted(rec_monthly.items())))
    print(f"Chi2 estatístico: {chi2_val:.2f} com {df_val} graus de liberdade")
    # Valor crítico chi2 com df=10 a 1% é 23.21, a 0.1% é 29.59

    # 3. Teste do Ciclo Político-Eleitoral (Nordhaus/Rogoff)
    # Frequência de posts e proporção de posts de posicionamento político
    # Grupo A: Período Eleitoral (Set/Out 2026) vs Grupo B: Meses Ordinários (Dez/25 a Ago/26)
    eleitoral_posts = [p for p in reconecta if p['is_periodo_eleitoral'] == '1']
    ordinario_posts = [p for p in reconecta if p['is_periodo_eleitoral'] == '0']

    # Posts por mês
    meses_eleitorais = 2 # Set e Out
    meses_ordinarios = 9 # Dez a Ago
    taxa_eleitoral = len(eleitoral_posts) / meses_eleitorais
    taxa_ordinaria = len(ordinario_posts) / meses_ordinarios

    # Proporção de pauta política/representação
    pol_eleitoral = sum(1 for p in eleitoral_posts if p['macro_categoria'] == 'Representação & Política')
    pol_ordinario = sum(1 for p in ordinario_posts if p['macro_categoria'] == 'Representação & Política')
    prop_pol_eleitoral = pol_eleitoral / len(eleitoral_posts) if eleitoral_posts else 0
    prop_pol_ordinario = pol_ordinario / len(ordinario_posts) if ordinario_posts else 0

    print("\n--- 3. TESTE DO CICLO POLÍTICO-ELEITORAL (RECONECTA) ---")
    print(f"Período Eleitoral (Set-Out/2026): {len(eleitoral_posts)} posts ({taxa_eleitoral:.1f} posts/mês)")
    print(f"Período Ordinário (Dez/25-Ago/26): {len(ordinario_posts)} posts ({taxa_ordinaria:.1f} posts/mês)")
    print(f"Aceleração de postagens no ciclo eleitoral: +{((taxa_eleitoral/taxa_ordinaria) - 1)*100:.1f}%")
    print(f"Pauta Política no Período Eleitoral: {pol_eleitoral}/{len(eleitoral_posts)} ({prop_pol_eleitoral*100:.1f}%)")
    print(f"Pauta Política no Período Ordinário: {pol_ordinario}/{len(ordinario_posts)} ({prop_pol_ordinario*100:.1f}%)")

    # 4. Assimetria Atividade-Meio (Festas) vs Atividade-Fim (Acadêmico)
    festas_rec = rec_counts['Festas & Arrecadação']
    acad_rec = rec_counts['Assuntos Acadêmicos']
    festas_ant = ant_counts['Festas & Arrecadação']
    acad_ant = ant_counts['Assuntos Acadêmicos']

    ratio_rec = festas_rec / acad_rec if acad_rec else 0
    ratio_ant = festas_ant / acad_ant if acad_ant else 0

    print("\n--- 4. RAZÃO FESTA VS ACADÊMICO (ATIVIDADE MEIO VS FIM) ---")
    print(f"Reconecta: {festas_rec} posts de Festas vs {acad_rec} posts Acadêmicos (Razão: {ratio_rec:.2f} festas por post acadêmico)")
    print(f"Gestão Anterior: {festas_ant} posts de Festas vs {acad_ant} posts Acadêmicos (Razão: {ratio_ant:.2f} festas por post acadêmico)")

    # 5. Análise de Engajamento por Categoria (Curtidas e Comentários)
    engajamento_por_cat = defaultdict(lambda: {'curtidas': [], 'comentarios': []})
    for p in reconecta:
        cat = p['macro_categoria']
        c = int(p['curtidas']) if p['curtidas'] else 0
        com = int(p['comentarios']) if p['comentarios'] else 0
        engajamento_por_cat[cat]['curtidas'].append(c)
        engajamento_por_cat[cat]['comentarios'].append(com)

    print("\n--- 5. MÉTRICAS DE ENGAJAMENTO POR CATEGORIA (RECONECTA) ---")
    for cat, data in engajamento_por_cat.items():
        n = len(data['curtidas'])
        mean_curt = sum(data['curtidas']) / n if n else 0
        mean_com = sum(data['comentarios']) / n if n else 0
        print(f"{cat} (N={n}): Média Curtidas = {mean_curt:.1f} | Média Comentários = {mean_com:.1f}")

    return {
        'rec_hhi': rec_hhi,
        'ant_hhi': ant_hhi,
        'rec_gini': rec_gini,
        'ant_gini': ant_gini,
        'chi2_val': chi2_val,
        'df_val': df_val,
        'taxa_eleitoral': taxa_eleitoral,
        'taxa_ordinaria': taxa_ordinaria,
        'prop_pol_eleitoral': prop_pol_eleitoral,
        'prop_pol_ordinario': prop_pol_ordinario,
        'ratio_rec': ratio_rec,
        'ratio_ant': ratio_ant,
        'rec_counts': dict(rec_counts),
        'ant_counts': dict(ant_counts)
    }

if __name__ == '__main__':
    run_econometric_analysis()
