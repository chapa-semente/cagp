import os
import re
import ssl
import sys
import urllib.request
from urllib.parse import urlparse, unquote

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

DOWNLOADS = [
    # 1. Colegiado de Gestão Pública - Normas e Apresentações
    ("fca-formacao-complementar-aberta.pdf", "http://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2023/02/FCA_20230622.pdf"),
    ("resolucao-01-2016-formacao-complementar-aberta.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/Resolu%C3%A7%C3%A3o-01_2016-Forma%C3%A7%C3%A3o-Complementar-Aberta.pdf"),
    ("resolucao-01-2018-altera-formacao-complementar-aberta.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2019/08/Resolu%C3%A7%C3%A3o-1_2018-Altera-Resolu%C3%A7%C3%A3o-01_2016-relativa-a-Forma%C3%A7%C3%A3o-Complementar-Aberta.pdf"),
    ("resolucao-03-2016-modalidade-ead.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/Resolu%C3%A7%C3%A3o-03_2016-Modalidade-de-Ensino-a-Dist%C3%A2ncia.pdf"),
    ("resolucao-05-2016-mobilidade-estudantil.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/Resolu%C3%A7%C3%A3o-05_2016-Mobilidade-Estudantil.pdf"),
    ("resolucao-07-2016-planejamento-horario.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/Resolu%C3%A7%C3%A3o-07_2016-Planejamento-Hor%C3%A1rio.pdf"),
    ("resolucao-08-2016-distribuicao-vagas-remanescentes.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2020/09/Resolu%C3%A7%C3%A3o-08-2016-Distribui%C3%A7%C3%A3o-de-Vagas-Remanescentes.pdf"),
    ("resolucao-01-2019-estagio-curricular.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2019/08/Resolu%C3%A7%C3%A3o-01_2019-Est%C3%A1gio-Curricular.pdf"),
    ("resolucao-01-2020-atividades-integralizadoras-credito.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2020/05/Resolu%C3%A7%C3%A3o-01-2020_-Atualiza-Resolu%C3%A7%C3%A3o-02-2016_-Atividades-Integralizadoras-de-Cr%C3%A9dito.pdf"),
    ("resolucao-congrega-02-2018-concurso-tcc.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2019/08/Resolu%C3%A7%C3%A3o-Congrega%C3%A7%C3%A3o-02-2018-Concurso-TCC.pdf"),
    ("recepcao-calouros-2023-2.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2023/08/Recepcao-aos-Calouros_2023-2-rrr.pdf"),
    ("recepcao-ingressantes-2024-2.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2024/09/Recepcao-de-Ingressantes_2024-2.pdf"),
    ("depoimentos-de-egressos.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/Depoimentos-de-Egressos.pdf"),
    ("forma-ingresso-sisu.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/O-Sistema-de-Sele%C3%A7%C3%A3o-Unificada-2.pdf"),
    ("forma-ingresso-obtencao-novo-titulo.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/Obten%C3%A7%C3%A3o-de-Novo-T%C3%ADtulo-2.pdf"),
    ("forma-ingresso-reopcao.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/Reop%C3%A7%C3%A3o-2.pdf"),
    ("declaracao-atividade-avaliativa.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/09/Declarac%C3%A3o_Atividade_Avaliativa_20230505.pdf"),

    # Formulários próprios de Gestão Pública
    ("termo-aceite-orientador-tcc.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2019/08/TERMO-DE-ACEITE-ORIENTADOR-TCC.pdf"),
    ("requerimento-formacao-complementar-aberta-fca.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2019/08/REQUERIMENTO-DE-FORMA%C3%87%C3%83O-COMPLEMENTAR-ABERTA-FCA.pdf"),
    ("requerimento-aproveitamento-de-estudos-colegiado.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/09/REQUERIMENTO-DE-APROVEITAMENTO-DE-ESUDOS.pdf"),
    ("requerimento-atividade-integralizadora-credito-v20229.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/09/REQUERIMENTO-DE-ATIVIDADE-INTEGRALIZADORA-DE-CR%C3%89DITO-V.-CURRICULAR-2022-9.pdf"),
    ("requerimento-atividade-integralizadora-credito-v20152.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/09/REQUERIMENTO-DE-ATIVIDADE-INTEGRALIZADORA-DE-CR%C3%89DITO-V.-CURRICULAR-2015-2_20240924.pdf"),
    ("requerimento-inscricao-colacao-de-grau-colegiado.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/09/REQUERIMENTO-DE-INSCRI%C3%87%C3%83O-%C3%80-COLA%C3%87%C3%83O-DE-GRAU.pdf"),
    ("requerimento-revisao-desligamento-plano-estudos-colegiado.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/09/REQUERIMENTO-DE-REVIS%C3%83O-DE-DESLIGAMENTO-E-PLANO-DE-ESTUDOS.pdf"),

    # 2. Formulários Oficiais Atualizados do DRCA (2026)
    ("requerimento-trancamento-parcial-matricula.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-TRANCAMENTO-PARCIAL-DE-MATRICULA.pdf"),
    ("requerimento-trancamento-total-matricula.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-TRANCAMENTO-PARCIAL-DE-MATRICULA.pdf"),
    ("requerimento-regime-especial-graduacao.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-REGIME-ESPECIAL.pdf"),
    ("requerimento-avaliacao-medica.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-AVALIACAO-MEDICA.pdf"),
    ("requerimento-mudanca-de-turno.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-MUDANCA-DE-TURNO.pdf"),
    ("requerimento-transferencia-outra-ies.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-TRANSFERENCIA-PARA-OUTRA-IES.pdf"),
    ("requerimento-aproveitamento-de-estudos-drca.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-APROVEITAMENTO-DE-ESTUDOS.pdf"),
    ("requerimento-mudanca-percurso-curricular-drca.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-MUDANCA-DE-PERCURSO-CURRICULAR.pdf"),
    ("requerimento-mudanca-percurso-modalidade-habilitacao-enfase.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-MUDANCA-DE-PERCURSO-CURRICULARMODALIDADE-HABILITACAO-OU-ENFASE.pdf"),
    ("requerimento-matricula-formacao-livre.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-MATRICULA-EM-ATIVIDADE-ACADEMICAFORMACAO-LIVRE.pdf"),
    ("requerimento-matricula-pos-graduacao.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-MATRICULA-EM-ATIVIDADE-ACADEMICA-ELETIVAPOS-GRADUACAO.pdf"),
    ("requerimento-matricula-disciplina-isolada.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-MATRICULA-EM-ATIVIDADE-ISOLADA.pdf"),
    ("requerimento-revisao-desligamento-plano-integralizacao-drca.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-E-PLANO-DE-INTEGRALIZACAO-PARA-FIM-DE-REVISAO-DE-DESLIGAMENTO.pdf"),
    ("requerimento-inscricao-colacao-de-grau-drca.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-INSCRICAO-A-COLACAO-DE-GRAU.pdf"),
    ("requerimento-inscricao-exame-especial.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-DE-INSCRICAO-AO-EXAME-ESPECIAL.pdf"),
    ("requerimento-prioridade-registro-diploma.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-PARA-PRIORIDADE-DE-REGISTRO-DE-DIPLOMA.pdf"),
    ("requerimento-inclusao-nome-social.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/REQUERIMENTO-PARA-INCLUSAO-DE-NOME-SOCIAL.pdf"),
    ("roteiro-comprovacao-conhecimentos-estudante.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/Comprovacao-de-Conhecimentos-Funcao-Estudante.pdf"),
    ("roteiro-regime-especial-raep-estudante.pdf", "https://www.ufmg.br/drca/wp-content/uploads/2026/04/Manual-para-o-pedido-de-Regime-Especial-de-Permanencia-RAEP-Funcao-do-Estudante.pdf"),

    # 3. Normas Gerais UFMG, Resoluções CEPE, DTI, FUMP, PRAE
    ("manual-aplicativo-siga-ufmg.pdf", "https://www.ufmg.br/dti/wp-content/uploads/2016/08/Manual_Aplicativo_Siga_UFMG.pdf"),
    ("dti-office365-criacao-conta.pdf", "https://www.ufmg.br/dti/wp-content/uploads/2020/06/OFFICE365-CriacaoConta.Ver1_.1-2.pdf"),
    ("portaria-prae-1286-2026-permanencia-estudantil.pdf", "https://www.ufmg.br/prae/wp-content/uploads/2026/02/SEI_4945588_Portaria_1286.pdf"),
    ("resolucao-prae-09-2015-nome-social.pdf", "https://www.ufmg.br/prae/wp-content/uploads/2024/05/RESOLUCAO-09-2015-NOME-SOCIAL.pdf"),
    ("resolucao-ufmg-07-2025-contra-o-assedio.pdf", "https://www.ufmg.br/contraoassedio/wp-content/uploads/2026/01/resolucao-ufmg-contra-o-assedio.pdf"),
    ("resolucao-cepe-01-2018-normas-gerais-graduacao.pdf", "https://www.ufmg.br/prograd/wp-content/uploads/2024/07/ResCepeComp0118.pdf"),
    ("resolucao-cepe-06-2019-aproveitamento-estudos.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2023/08/06rescepe2019-assinada.pdf"),
    ("resolucao-cepe-02-2009-estagio-ufmg.pdf", "https://www.ufmg.br/prograd/arquivos/estagio/resEstagio.pdf"),
    ("estagio-manual-orientacoes-fafich.pdf", "https://www.ufmg.br/prograd/arquivos/estagio/publicacoes/fafich.pdf"),
    ("resolucao-cepe-11-2018-regras-transicao-graduacao.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2019/08/Resolu%C3%A7%C3%A3o-CEPE-n%C2%BA-11-2018-Regras-de-transi%C3%A7%C3%A3o-para-aplica%C3%A7%C3%A3o-Resolu%C3%A7%C3%A3o-Complementar-01-2018.pdf"),
    ("resolucao-cepe-19-2014-formacao-transversal.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/Resolu%C3%A7%C3%A3o-CEPE-19_Forma%C3%A7%C3%A3o-Transversal.pdf"),
    ("regimento-geral-ufmg.pdf", "https://www3.ufmg.br/storage/8/9/b/c/89bc85d7afcf2c72d027669d151c23c4_16691715886978_671566498.pdf"),
    ("resolucao-cei-07-2004-bolsas.pdf", "https://homepages.dcc.ufmg.br/~bigonha/Legislacao/CEI/Resolucao07-2004.pdf"),

    # 4. Diretrizes Curriculares Nacionais (MEC)
    ("cne-dcn-relacoes-etnico-raciais-2004.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/Resolu%C3%A7%C3%A3o-n%C2%BA-1-de-2004_CNE_Diretrizes-Curriculares-Nacionais-para-Educa%C3%A7%C3%A3o-Rela%C3%A7%C3%B5es-%C3%89tnico-Raciais.pdf"),
    ("cne-parecer-003-2004-relacoes-etnico-raciais.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/Parecer-CNE-CP-003-2004_Diretrizes-Curriculares-Nacionais-para-Educa%C3%A7%C3%A3o-das-Rela%C3%A7%C3%B5es-%C3%89tnico-raciais.pdf"),
    ("cne-dcn-educacao-direitos-humanos-2012.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/Resolu%C3%A7%C3%A3o-n%C2%BA-1-de-2012-CNE_Diretrizes-Nacionais-para-Educa%C3%A7%C3%A3o-em-Direitos-Humanos.pdf"),
    ("cne-dcn-educacao-ambiental-2012.pdf", "https://www.fafich.ufmg.br/gestaopublica/wp-content/uploads/2018/04/Resolu%C3%A7%C3%A3o-n%C2%BA-2-de-2012-CNE_Diretrizes-Curriculares-Nacionais-para-a-Educa%C3%A7%C3%A3o-Ambiental.pdf"),
    ("cne-res-07-2018-extensao-universitaria.pdf", "https://normativasconselhos.mec.gov.br/normativa/pdf/CNE_RES_CNECESN72018.pdf"),
]

# Google Docs exportados para PDF e DOCX
GOOGLE_DOCS = [
    ("estagio-modelo-plano-de-atividades", "100ECMbDcwXjIUojwU6WwcN0eWN72NIjI"),
    ("estagio-modelo-termo-de-compromisso-com-convenio", "1bzFYhmoGkgcEnBwMqSDBlENP-r2ke1X_"),
    ("estagio-modelo-termo-de-compromisso-sem-vinculo", "19-Elm9v0ztx3sWgwPsRGB-NuaxoaByI4"),
    ("estagio-modelo-relatorio-semestral", "1SNyHiDvFQocVO5W6FiJIBtomJasQis_d"),
    ("estagio-modelo-relatorio-final", "1fB4afw-U3ODnZrkOjk9R5q3-a8qYNtVV"),
    ("estagio-requerimento-integralizacao-experiencia-profissional", "1QJJ8wLISxpztQFH--V2aYm8-509D6_418o14zSfxbe4"),
    ("estagio-relatorio-atividades-experiencia-profissional", "1Uc3oHwEBM9zbf9tJ2q5N80YPQme3niFh"),
]

OUT_DIR = "documentos"
os.makedirs(OUT_DIR, exist_ok=True)

print(f"Iniciando download para a pasta: {OUT_DIR}")
success_count = 0
skip_count = 0
error_count = 0

for fname, url in DOWNLOADS:
    dest = os.path.join(OUT_DIR, fname)
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"[SKIP] Já existe: {fname} ({os.path.getsize(dest)} bytes)")
        skip_count += 1
        continue
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
            data = resp.read()
            if len(data) > 500:
                with open(dest, "wb") as f:
                    f.write(data)
                print(f"[OK] Baixado: {fname} ({len(data)} bytes)")
                success_count += 1
            else:
                print(f"[WARN] Resposta curta para {fname}: {len(data)} bytes")
                error_count += 1
    except Exception as e:
        print(f"[ERRO] Falha ao baixar {fname} de {url}: {e}")
        error_count += 1

# Exportar Google Docs
for basename, doc_id in GOOGLE_DOCS:
    # 1. PDF
    pdf_fname = f"{basename}.pdf"
    pdf_dest = os.path.join(OUT_DIR, pdf_fname)
    if not (os.path.exists(pdf_dest) and os.path.getsize(pdf_dest) > 1000):
        url_pdf = f"https://docs.google.com/document/d/{doc_id}/export?format=pdf"
        try:
            req = urllib.request.Request(url_pdf, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=20, context=ctx) as resp:
                data = resp.read()
                with open(pdf_dest, "wb") as f:
                    f.write(data)
                print(f"[OK GDoc PDF] {pdf_fname} ({len(data)} bytes)")
                success_count += 1
        except Exception as e:
            print(f"[ERRO GDoc PDF] {pdf_fname}: {e}")
            error_count += 1
    else:
        print(f"[SKIP GDoc PDF] Já existe: {pdf_fname}")
        skip_count += 1

    # 2. DOCX
    docx_fname = f"{basename}.docx"
    docx_dest = os.path.join(OUT_DIR, docx_fname)
    if not (os.path.exists(docx_dest) and os.path.getsize(docx_dest) > 1000):
        url_docx = f"https://docs.google.com/document/d/{doc_id}/export?format=docx"
        try:
            req = urllib.request.Request(url_docx, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=20, context=ctx) as resp:
                data = resp.read()
                with open(docx_dest, "wb") as f:
                    f.write(data)
                print(f"[OK GDoc DOCX] {docx_fname} ({len(data)} bytes)")
                success_count += 1
        except Exception as e:
            print(f"[ERRO GDoc DOCX] {docx_fname}: {e}")
            error_count += 1
    else:
        print(f"[SKIP GDoc DOCX] Já existe: {docx_fname}")
        skip_count += 1

print("\n--- RESUMO ---")
print(f"Sucessos: {success_count} | Existentes: {skip_count} | Erros: {error_count}")
