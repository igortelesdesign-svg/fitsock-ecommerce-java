#  FITSOCK - Performance em Cada Passo
**Projeto Acadêmico Completo de E-Commerce de Meias Fitness e Esportivas**

---

##  Sobre o Projeto
O **FITSOCK** é um projeto de e-commerce moderno e profissional desenvolvido para uma atividade acadêmica. A loja é especializada em meias esportivas de alto rendimento para corrida, musculação/fitness, Cross Training, ciclismo e lifestyle.

### 🛠️ Tecnologias Obrigatórias Utilizadas
* **Java 17**
* **Spring Boot 3.2.4** (com Tomcat embutido)
* **Maven** (Gerenciador de dependências e build)
* **Thymeleaf** (Template Engine para renderização dinâmica no servidor)
* **HTML5**
* **CSS 100% INLINE** (`style="..."` diretamente em cada elemento; nenhum arquivo `style.css` externo; sem Bootstrap ou frameworks de CSS)
* **JavaScript Puro** (`script.js` em Vanilla JS; sem bibliotecas prontas de carrossel)

---

## Estrutura de Pastas e Arquivos

```text
fitsock/
│
├── pom.xml                                      # Arquivo de configuração Maven com dependências Spring Boot e Thymeleaf
│
└── src/
    └── main/
        ├── java/
        │   └── com/fitsock/
        │       ├── FitSockApplication.java      # Classe principal de inicialização Spring Boot
        │       │
        │       ├── model/
        │       │   └── Produto.java             # Entidade/Modelo de dados com id, nome, preço, desconto, avaliação, etc.
        │       │
        │       └── controller/
        │           ├── HomeController.java      # Envia a lista dos 8 produtos para o template index.html
        │           ├── ProdutoController.java   # Trata /produto/{id} e produtos relacionados
        │           └── CarrinhoController.java  # Gerencia a visualização do carrinho de compras em /carrinho
        │
        └── resources/
            ├── application.properties           # Porta do servidor (8080) e configurações de template
            │
            ├── templates/
            │   ├── index.html                   # Página inicial completa com CSS Inline e tags Thymeleaf (th:each, th:text)
            │   ├── produto.html                 # Página individual do produto (/produto/{id}) com CSS Inline
            │   └── carrinho.html                # Tela do carrinho de compras com totalizadores e CSS Inline
            │
            └── static/
                └── js/
                    └── script.js                # Carrossel, scroll horizontal, busca, filtros e carrinho em JS Puro
```

---

##  Como Executar o Projeto

### Pré-requisitos
* **Java JDK 17** ou superior instalado na máquina.
* **Apache Maven 3.8+** (ou o wrapper Maven do Spring Boot).

### Comandos no Terminal:
1. Abra o terminal e navegue até a pasta do projeto:
   ```bash
   cd fitsock
   ```
2. Compile e execute a aplicação com o Maven:
   ```bash
   mvn spring-boot:run
   ```
3. O servidor Tomcat iniciará na porta padrão `8080`.
4. Abra seu navegador de internet e acesse:
   ```text
   http://localhost:8080
   ```

---

##  Identidade Visual
* **Preto (#111111):** Fundo de cabeçalho, contraste e rodapé premium.
* **Verde Neon (#B7FF00):** Destaque em botões, tags de desconto, indicadores ativos e chamadas para ação (CTA).
* **Branco (#FFFFFF) & Cinza Claro (#F5F5F5):** Área de respiração e cards modernos com sombras suaves.
* **Cinza (#737373):** Textos auxiliares e categorias.
