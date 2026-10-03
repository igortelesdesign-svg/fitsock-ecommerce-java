package com.fitsock.controller;

import com.fitsock.model.Produto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * Controller responsável pela tela do carrinho de compras em /carrinho.
 * No ambiente do cliente, a persistência e cálculo dinâmico de itens
 * são gerenciados em tempo real via JavaScript no LocalStorage.
 */
@Controller
public class CarrinhoController {

    @GetMapping("/carrinho")
    public String verCarrinho(Model model) {
        List<Produto> todos = HomeController.getProdutosEmMemoria();

        // Envia os produtos para sugestões e dados de exemplo
        model.addAttribute("produtosSugeridos", todos);
        model.addAttribute("freteGratisMinimo", 199.00);

        return "carrinho";
    }
}
