

# Version control Systems

Version control Systems (vcs) consite numa categoria de fereramentas de software que permite uma equipa de software gerir alterações no codigo fonte ao longo do tempo.

> Imagina uma cloud (Google Drive,dropbox apple Icloud), para ficheiros de programação.
> onde consegues partilhar com coworkers, e trabalharem em simultaneo

## Beneficios

1. Equipas trabalham mais rapidamente e preservam a eficiência e agilidade à medida que a equipa cresce
2. Histórico completo de todos os ficheiros ao longo do tempo
3. Branching e merging – equipas trabalham em fluxos independentes de alterações
4. Traceability – rastrear cada alteração através de notas claras e objetivas


## Tipos 

>Pouco importante


• Perforce Version Control – para equipas globalmente distribuídas e equipas a trabalhar em produtos complexos. Modelo centralizado.

**• Git – para equipas mais pequenas, especialmente as que trabalham em aplicações web e móveis. Modelo distribuído e extremamente rápido.**

• Concurrent Versions System (CVS) – existe desde os anos 90! Tem um ótimo suporte cross-platform.

• Apache SubVersion (SVN) – opção mais popular de CVS e simples de usar.

• Team Foundation Server – da Microsoft, baseado num modelo cliente-servidor distribuído


### Modelos de (vcs)

#### **Centralizados**

**Vantagens**:
• A equipa sabe sempre o que todos os elementos estão a fazer
• Os administradores têm um grau elevado de controlo sobre quem pode fazer o quê
• É mais fácil gerir um CVCS do que lidar com BD locais em cada cliente

**Desvantagens**:
• Como o servidor é central e único, corre o risco de falhar (servidor em baixo, BD corrompida, etc

#### Distribuidos

 Os clientes não efetuam apenas o check out da última
snapshot dos ficheiros. 
Efetuam uma cópia integral do
repositório incluindo o histórico completo

• Estes sistemas lidam muito bem com facto de haver
múltiplos repositórios remotos, por isso várias equipas
de diferentes grupos podem colaborar dentro do
mesmo projeto
• É então possível configurar diversos tipos de workflow
que não é possível em CVC

#### GIT (O que nosso curso ensina)

• Mantém o controlo do histórico de código
• Tira snapshots dos ficheiros
• O programador decide quando tirar uma snapshot ao fazer um commit
• É possível visitar uma snapshot em qualquer altura
• É possível preparar os ficheiros antes de efectuar commit


# Engenharia de software

A Engenharia de Software tem como objetos as teorias, métodos e ferramentas para a produção
profissional de software.

....


## Tipos de aplicações

1. Aplicações isoladas (stand-alone)
2. Sistemas interativos baseados em transações
3. Sistemas de controlo embebidos (embedded control systems)
4. Sistemas de processamento em bloco (batch processing)
5. Sistemas de entretenimento
6. Sistemas para modelação e simulação
7. Sistemas de recolha de dados
8. Sistemas de sistemas


# Software development life cycle

!important
![[Pasted image 20251031131901.png]]

## 1.Planning

## 2.Analysis
## 3.Design
## 4.Implementation
## 5.Testing & Integration
## 6.Maintenance


## Modelos de SDLC
---

• Modelo em cascata (Waterfall model)
	• processo com plano
	• as fases são separadas e distintas para especificação, desenvolvimento e validação

• Desenvolvimento incremental (Incremental development)
	• especificação, desenvolvimento e validação são intercalados
	• pode ser um processo com plano ou ágil

• Processos de software baseados na reutilização (Integration and configuration)
	• o sistema é construído a partir de componentes existentes
	• pode ser um processo com plano ou ágil



## Requisitos

**Requisitos Funcionais (RF)** – descrevem funcionalidades/serviços do sistema; comportamento que o sistema deve ter/suportar como entradas, saídas ou descrições do produto; podem indicar o que osistema não deve fazer;

Ex: O utilizador deve poder pesquisar a lista de marcações dos pacientes para todas as
clínicas.


**• Requisitos Não Funcionais (RNF)** – descrevem as restrições ao funcionamento do sistema e suas propriedades (e.g., tempo de resposta, processo de desenvolvimento, imposição de standards); não estão diretamente relacionados com os serviços fornecidos pelo sistema aos utilizadores;
	 Ex: O sistema deve estar disponível a todos os médicos no horário normal de expediente (seg a sex das 8:30 - 17:30). 
	 o Existem diversas categorias de RNF, são aconselhadas as seguintes (existem mais!):
<br>

 - **Usabilidade** (Usability) – foca-se na perspetiva da interação com o utilizador (facilidade de uso).
	 Ex: Os botões e elementos interativos devem ter tamanho mínimo de 44x44pixéis para facilitar o toque em dispositivos móveis.
<br>

- **Fiabilidade** (Reliability) – habilidade do software se comportar de forma consistente
e aceitável para o utilizador; é a probabilidade e percentagem do software funcionar
sem falhas para um período específico de tempo ou uso.
	 Ex: Os candidatos devem aceder aos seus currículos 98% das vezes, sem falhas.
<br>

- **Segurança** (Security) – define como o sistema se encontra protegido ou como deve ser efetuado o acesso ao sistema.
	Ex: Devem ser efetuadas 2 cópias de segurança dos dados do sistema diariamente, sendo que 1 delas deve encontrar-se em local externo.
<br>
-  **Eficiência** (Performance) – definem o quão bem o sistema lida com capacidade, taxa
de transferência e tempo de resposta (desempenho, espaço, tempo)
	Ex: O tempo de carregamento do website não deve superior a 1 segundo.
<br>

- **Disponibilidade** (Availability) – define o tempo de funcionamento do sistema, o
tempo que leva para reparar uma falha e o tempo entre ciclos.
	Ex: O diretor de recursos humanos deve poder publicar empregos no site durante a semana e ao fim-de-semana, a qualquer hora do dia (disponibilidade 24x7).
<br>

- **Ambiente** (Portability) – especificam o ambiente operacional do sistema
(capacidade de adaptação)