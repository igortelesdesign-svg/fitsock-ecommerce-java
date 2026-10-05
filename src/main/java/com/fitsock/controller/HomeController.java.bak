package com.fitsock.controller;

import com.fitsock.model.Produto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

/**
 * Controller responsável pela página inicial da loja FITSOCK.
 * Prepara a lista de produtos em memória e envia para o Thymeleaf renderizar
 * dinamicamente no arquivo templates/index.html.
 */
@Controller
public class HomeController {

    /**
     * Retorna a lista completa com os 8 produtos cadastrados no Java.
     * Método público e estático para reaproveitamento nos demais controllers.
     */
    public static List<Produto> getProdutosEmMemoria() {
        List<Produto> lista = new ArrayList<>();

        lista.add(new Produto(
                1L,
                "FITSOCK RUN PRO",
                "Meia de alta compressão para corrida com ventilação superior e arco de suporte elástico.",
                "Corrida",
                39.90,
                49.90,
                "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=800&auto=format&fit=crop&q=80",
                4.9,
                20,
                "Preto / Verde Neon"
        ));

        lista.add(new Produto(
                2L,
                "FITSOCK TRAINING",
                "Meia fitness cano médio com reforço no calcanhar e amortecimento plantar anatômico.",
                "Academia",
                34.90,
                44.90,
                "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&auto=format&fit=crop&q=80",
                4.8,
                22,
                "Preto / Branco"
        ));

        lista.add(new Produto(
                3L,
                "FITSOCK CROSS",
                "Desenvolvida especialmente para treinos intensos de Cross Training e subidas de corda com proteção tibial.",
                "Cross",
                42.90,
                52.90,
                "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80",
                4.9,
                19,
                "Cinza / Neon"
        ));

        lista.add(new Produto(
                4L,
                "FITSOCK PERFORMANCE",
                "Estrutura com fibra inteligente que expulsa o suor mantendo os pés secos durante competições.",
                "Corrida",
                44.90,
                54.90,
                "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80",
                5.0,
                18,
                "Preto"
        ));

        lista.add(new Produto(
                5L,
                "FITSOCK BASIC",
                "Conforto e maciez para o dia a dia e caminhadas leves com toque aveludado de algodão premium.",
                "Casual",
                29.90,
                35.90,
                "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80",
                4.7,
                17,
                "Branco"
        ));

        lista.add(new Produto(
                6L,
                "FITSOCK RUNNER",
                "Cano invisível com aba anti-atrito no tendão de Aquiles para corridas em asfalto e esteira.",
                "Corrida",
                39.90,
                49.90,
                "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop&q=80",
                4.8,
                20,
                "Azul Petróleo / Neon"
        ));

        lista.add(new Produto(
                7L,
                "FITSOCK GRIP",
                "Solado com grip antiderrapante de silicone para estabilidade em agachamentos e saltos na academia.",
                "Academia",
                46.90,
                58.90,
                "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
                4.9,
                20,
                "Preto / Antiderrapante"
        ));

        lista.add(new Produto(
                8L,
                "FITSOCK ENDURANCE",
                "Compressão graduada 15-20 mmHg para redução de fadiga muscular em treinos de longa distância e ciclismo.",
                "Ciclismo",
                49.90,
                62.90,
                "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80",
                5.0,
                21,
                "Cinza Escuro / Neon"
        ));

        return lista;
    }

    @GetMapping("/")
    public String index(Model model) {
        List<Produto> produtos = getProdutosEmMemoria();

        // Envia a lista para o Thymeleaf renderizar via th:each="produto : ${produtos}"
        model.addAttribute("produtos", produtos);
        model.addAttribute("totalProdutos", produtos.size());
        model.addAttribute("slogan", "PERFORMANCE EM CADA PASSO.");

        return "index";
    }
}
