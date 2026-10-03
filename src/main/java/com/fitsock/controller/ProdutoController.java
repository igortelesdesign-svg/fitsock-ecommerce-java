package com.fitsock.controller;

import com.fitsock.model.Produto;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller responsável pelo detalhamento individual do produto em /produto/{id}.
 * Localiza o produto selecionado e recupera produtos relacionados para a vitrine.
 */
@Controller
public class ProdutoController {

    @GetMapping("/produto/{id}")
    public String detalhesProduto(@PathVariable("id") Long id, Model model) {
        List<Produto> todos = HomeController.getProdutosEmMemoria();

        // Localiza o produto com o ID solicitado ou retorna HTTP 404
        Produto produto = todos.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Produto não encontrado"
                ));

        // Produtos relacionados (excluindo o atual)
        List<Produto> relacionados = todos.stream()
                .filter(p -> !p.getId().equals(produto.getId()))
                .collect(Collectors.toList());

        model.addAttribute("produto", produto);
        model.addAttribute("relacionados", relacionados);

        return "produto";
    }
}
