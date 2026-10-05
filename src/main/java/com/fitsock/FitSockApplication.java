package com.fitsock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principal do Spring Boot para inicialização do FITSOCK E-commerce.
 * Contém o método main que inicia o servidor Tomcat na porta 8080.
 */
@SpringBootApplication
public class FitSockApplication {

    public static void main(String[] args) {
        SpringApplication.run(FitSockApplication.class, args);
        System.out.println("==================================================");
        System.out.println(" FITSOCK E-COMMERCE INICIADO COM SUCESSO!");
        System.out.println(" Acesse a loja no navegador: http://localhost:8080");
        System.out.println("==================================================");
    }

}
