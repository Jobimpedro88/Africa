---
name: flight-watcher-pro
description: |
  Skill avançada para monitorar, analisar e decidir sobre passagens aéreas.
  Use quando o usuário pedir "verificar preços", "analisar voo", "comprar passagem",
  ou quando precisar de recomendação sobre Cash vs Milhas.
  Também integra com o agente de roteiro para informar decisões de transporte.
---

# ✈️ Flight Watcher Pro

Skill completa para rastrear passagens, comparar opções (cash vs milhas) e tomar decisões de compra inteligentes para a viagem África 2026.

---

## 📊 Inventário de Voos

### Voos Confirmados ✅
| Trecho | Data | Cia | Código | Status |
|:---|:---|:---|:---|:---|
| BSB → GRU | 11/03/2026 | LATAM | LA 3054 | ✅ Comprado |
| GRU → JNB | 11/03/2026 | LATAM | LA 8058 | ✅ Comprado |
| JNB → GRU | 03/04/2026 | LATAM | LA 8059 | ✅ Comprado |
| GRU → BSB | 04/04/2026 | LATAM | LA 3055 | ✅ Comprado |

### Voos Pendentes 🔶
| Trecho | Data | Meta Cash | Meta Milhas | Prioridade |
|:---|:---|:---|:---|:---|
| JNB → VFA | 13/03/2026 | < $180 USD | 15.5k United | 🔴 Alta |
| VFA → CPT | 16/03/2026 | < $250 USD | - | 🔴 Alta |
| **ou** VFA → JNB → CPT | 16/03/2026 | < $230 USD total | - | 🟡 Média |

---

## 🎯 Rotas Críticas e Metas de Preço

### 1. Joanesburgo (JNB) → Victoria Falls (VFA)
- **Aéreas:** Airlink, FlySafair, Fastjet
- **Meta de Preço Cash:** < $180 USD (R$ 1.050)
- **Alerta de Alta:** > $250 USD
- **Bagagem:** Airlink 20kg incluso, FlySafair paga separado (~R$250)
- **Duração:** ~1h40
- **Data Alvo:** 13 de Março de 2026

### 2. Victoria Falls (VFA) → Cape Town (CPT)
**Opção A: Voo Direto (se disponível)**
- **Aéreas:** Airlink (raro), Kenya Airways (via conexão)
- **Meta:** < $350 USD
- **Problema:** Frequência baixa, conexões longas

**Opção B: Via Joanesburgo (Recomendada)**
- **Leg 1 - VFA → JNB:** Airlink ~$150-180 USD
- **Leg 2 - JNB → CPT:** FlySafair ~$50-80 USD
- **Total:** ~$200-260 USD
- **Vantagem:** Mais horários, preço melhor, lounge em JNB

### 3. JNB ↔ CPT (Flexível)
- **Aéreas:** FlySafair, Airlink, Lift, SAA
- **Meta de Preço:** < $80 USD (R$ 450)
- **Alerta de Alta:** > $120 USD
- **Melhor Mês:** Junho (média R$867), evitar Dezembro (R$2,039)

---

## 💡 Estratégias de Compra Inteligente

### Timing Ideal (Quando Comprar)
| Tipo de Voo | Antecedência Ideal | Janela de Oportunidade |
|:---|:---|:---|
| Internacional (Brasil ↔ África) | 2-4 meses | Promoções Dez-Jan |
| Regional África (JNB-VFA-CPT) | 3-6 semanas | Terça a Quinta |
| Low Cost (FlySafair) | 2-4 semanas | Vendas relâmpago |

### Ferramentas de Monitoramento

#### Para Preços Cash:
1. **Google Flights** - Alertas de preço, visão mensal
   - Criar alerta: BSB → JNB, VFA → JNB, JNB → CPT
2. **Skyscanner** - Comparador multi-cia
3. **AirHint** - Previsão de preço (quando vai subir/descer)

#### Para Milhas/Award:
1. **Seats.aero** - Busca de disponibilidade award (United, Emirates, etc.)
2. **AwardFares** - Alertas de award seats
3. **ExpertFlyer** - Análise avançada de cabine
4. **Point.me** - Comparador de programas

### Cálculo do Valor Real de Milhas

```
Valor da Milha = (Preço Cash - Taxas Award) / Quantidade de Milhas

Exemplo VFA → JNB:
- Cash: $180 USD
- Award: 15.500 milhas United + $10 taxas
- Valor: ($180 - $10) / 15.500 = 1.1 centavo/milha

Veredicto: PAGAR CASH (milha vale mais guardada para internacional)
```

#### Referência de Valor (2026):
| Programa | Valor Médio | Bom Resgate | Ótimo Resgate |
|:---|:---|:---|:---|
| LATAM Pass | 1.5 cent | > 1.8 cent | > 2.5 cent |
| Smiles | 1.2 cent | > 1.5 cent | > 2.0 cent |
| United | 1.3 cent | > 1.5 cent | > 2.0 cent |
| Azul | 1.1 cent | > 1.4 cent | > 1.8 cent |

---

## 🧳 Análise de Bagagem (Custo Escondido!)

### Políticas das Companhias

| Cia Aérea | Mão (kg) | Despachada | Custo Extra |
|:---|:---|:---|:---|
| **Airlink** | 8kg | 20kg incluso | +32kg = taxa |
| **FlySafair** | 7kg | Não incluso | R$155-250/mala |
| **Lift** | 7kg | Não incluso | R$150-200/mala |
| **Fastjet** | 7kg | 20kg incluso | +20kg = taxa |

### Estratégia de Bagagem
1. **Safari → Cape Town:** Mala grande (26kg). Priorizar Airlink.
2. **Voos internos curtos:** Só mão se possível (7kg)
3. **Cálculo:** Sempre adicionar custo da bagagem no comparativo!

---

## 🛠️ Procedimento de Verificação de Preços

Quando acionado para "Verificar Preços", execute:

### Passo 1: Busca Web
```
Query 1: "Airlink flight VFA to JNB 13 March 2026 price"
Query 2: "FlySafair JNB to CPT 16 March 2026 booking"
Query 3: "Victoria Falls to Cape Town flight March 2026"
```

### Passo 2: Registrar no Log
Adicionar entrada em `data/flight_log.md`:
```markdown
| Data Check | Rota | Cia | Preço USD | Preço BRL | Bagagem | Total | Status |
| 2026-02-01 | VFA→JNB | Airlink | $165 | R$ 960 | Incluso | R$ 960 | ✅ Na Meta |
```

### Passo 3: Analisar Tendência
- Comparar com último registro
- Subiu mais de 10%? 🔴 Alertar usuário
- Desceu mais de 15%? 💎 Recomendar compra

### Passo 4: Atualizar Portal
Modificar `portal/public/data/flight_data.json` com novos preços.

### Passo 5: Notificar (se crítico)
Se preço total ultrapassar budget:
- `notify_user` com recomendação de ação
- Sugerir alternativas (horário diferente, outra cia, milhas)

---

## 📂 Arquivos Gerenciados

```
skills/flight-watcher/
├── SKILL.md              # Este arquivo
├── data/
│   ├── flight_log.md     # Histórico de preços
│   └── flight_inventory.md # Inventário completo
└── guides/
    └── buying_strategies.md # Guia detalhado
```

---

## 🔗 Integração com Agente de Roteiro

Quando o agente de roteiro precisar de informação de transporte, forneça:

```json
{
  "flight_status": {
    "JNB_VFA": { "status": "pending", "budget": "$180", "current_price": "$165" },
    "VFA_CPT": { "status": "pending", "budget": "$230", "current_price": "$210" }
  },
  "recommendation": "Comprar agora VFA→JNB (preço bom). Aguardar CPT.",
  "total_pending_budget": "$410",
  "deadline": "2026-02-15"
}
```

---

## ⚡ Comandos Rápidos

| Comando | Ação |
|:---|:---|
| "verificar preços" | Executar busca e atualizar log |
| "comprar VFA-JNB" | Analisar opções e links de compra |
| "cash vs milhas" | Comparativo detalhado |
| "status voos" | Resumo do inventário |
| "atualizar portal" | Sincronizar dados com website |
