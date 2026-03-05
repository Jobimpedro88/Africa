# Plano de Ação: A Viagem Perfeita para a África (2026)

Este documento define o roteiro estratégico para criar a experiência de viagem definitiva para a África do Sul em 2026.

## 1. Definição de Perfil & Experiência (Baseado em Dicas Reais)

*   **Vibe:** "Authentic Luxury" (Luxo Autêntico). Fugir do "turistão" (ex: evitar Aquila Game Reserve) e buscar experiências reais (Kruger National Park).
*   **Foco Gastronômico:** Vinícolas de alto nível são prioridade (Lanzerac, Tokara, Delaire Graff).
*   **Ritmo:** "Slow Travel" em Cape Town (3 dias min) + Intensidade no Safari.

## 2. Estratégia do Roteiro (Draft Inicial)

Baseado nos áudios transcritos da Carol:

### Parte A: Cape Town (A "San Diego" da África)
*   **Base:** V&A Waterfront (Segurança e conveniência).
*   **Must-Do:** Table Mountain (1º dia de sol), Chapman's Peak Drive (carro alugado), Boulders Beach (Pinguins).
*   **Vibe:** Outdoor, praia, visual.

### Parte B: Winelands (A "Mendoza" Sofisticada)
*   **Bases:** Stellenbosch ou Franschhoek.
*   **Logística:** Wine Tram ou Motorista (para beber à vontade).
*   **Destaques:** Lanzerac (Pinotage & Chocolate), Delaire Graff (Visual), Tokara.

### Parte C: Safari (O "Real Deal")
*   **Decisão Crítica:** **Kruger National Park** (Lodge privado dentro da reserva) vs. Reservas Privadas próximas a Cape Town (Aquila).
    *   *Veredito Carol:* **Kruger é inegociável** para uma experiência legítima. Aquila é "esquema resort/zoológico".
*   **Logística:** Voo JNB -> Skukuza/Hoedspruit ou Dirigir de JNB (4-5h).

## 3. Pesquisa Profunda ("Deep Dive") - Próximos Passos
*   [ ] **Logística Kruger:** Definir melhor voo interno e Lodge com custo-benefício (evitar R$ 18k/dia, buscar "sweet spots").
*   [ ] **Hidden Gems:** Restaurantes frequentados por locais em Cape Town (fugir das armadilhas do Waterfront).

## 4. Estruturação do "Portal de Viagem" (App)

Transformaremos o `portal` (Next.js) no **Guia Mestre**.

### 4.1. Arquitetura Proposta
*   **Tech Stack:** Next.js 16, Tailwind v4, Lucide Icons.
*   **Dados:** `lib/content.ts` como "CMS" local (fácil edição).

### 4.2. Funcionalidades a Implementar
1.  **Dicas da Carol (Hero Section):**
    *   Player de áudio customizado para os arquivos `.ogg`.
    *   Transcrição "expansível" abaixo de cada áudio.
    *   *Status:* Áudios já transcritos e prontos para integração.
2.  **Roteiro Interativo (Timeline):**
    *   Visualização dia-a-dia com mapas embedados.
    *   Tags: "Gastronomia", "Aventura", "Logística".
3.  **Docs Vault:**
    *   Área segura para PDFs (Passagens, Vouchers).
4.  **Currency Converter:**
    *   Widget rápido BRL <-> ZAR (Rand).

## 5. Próximos Passos Imediatos
1.  [ ] **Aprovar este Plano de Ação.**
2.  [ ] **Executar App:** Criar componentes `AudioPlayer` e `ItineraryTimeline`.
3.  [ ] **Preencher App:** Migrar conteúdo de `Dicas_Carol_Transcribed.md` para o App.
