package com.fitsock.model;

/**
 * Modelo de dados representando um Produto (Meia Esportiva) no sistema FITSOCK.
 * Utilizado pelos Controllers para transportar os dados do backend Java
 * até os templates HTML do Thymeleaf.
 */
public class Produto {

    private Long id;
    private String nome;
    private String descricao;
    private String categoria;
    private double preco;
    private double precoAnterior;
    private String imagem;
    private double avaliacao;
    private int desconto;
    private String cor;

    // Construtor padrão (sem argumentos)
    public Produto() {
    }

    // Construtor completo com todos os atributos obrigatórios
    public Produto(Long id, String nome, String descricao, String categoria,
                   double preco, double precoAnterior, String imagem,
                   double avaliacao, int desconto, String cor) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
        this.preco = preco;
        this.precoAnterior = precoAnterior;
        this.imagem = imagem;
        this.avaliacao = avaliacao;
        this.desconto = desconto;
        this.cor = cor;
    }

    // --- GETTERS E SETTERS ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public double getPrecoAnterior() {
        return precoAnterior;
    }

    public void setPrecoAnterior(double precoAnterior) {
        this.precoAnterior = precoAnterior;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public double getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(double avaliacao) {
        this.avaliacao = avaliacao;
    }

    public int getDesconto() {
        return desconto;
    }

    public void setDesconto(int desconto) {
        this.desconto = desconto;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    // Métodos auxiliares para exibição amigável formatada em Real (BRL)
    public String getPrecoFormatado() {
        return String.format("R$ %.2f", preco).replace('.', ',');
    }

    public String getPrecoAnteriorFormatado() {
        return String.format("R$ %.2f", precoAnterior).replace('.', ',');
    }
}
