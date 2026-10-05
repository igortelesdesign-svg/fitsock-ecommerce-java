/**
 * FITSOCK - JavaScript Puro (Vanilla JS)
 * Projeto Acadêmico de E-commerce de Meias Esportivas
 * Sem bibliotecas externas (No jQuery, No React, No Bootstrap)
 */

document.addEventListener("DOMContentLoaded", () => {
    initCarousel();
    initHorizontalScroll();
    initCategoryFilters();
    initSearch();
    initCart();
    initSmoothScroll();
});

/* ==========================================================================
   1. CARROSSEL PRINCIPAL (3 SLIDES, AUTO-PLAY, SETAS E INDICADORES)
   ========================================================================== */
function initCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");

    if (!slides.length) return;

    let currentIndex = 0;
    let autoSlideInterval = null;

    function showSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.style.opacity = "1";
                slide.style.pointerEvents = "auto";
                slide.style.zIndex = "2";
            } else {
                slide.style.opacity = "0";
                slide.style.pointerEvents = "none";
                slide.style.zIndex = "1";
            }
        });

        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.style.backgroundColor = "#B7FF00";
                dot.style.width = "32px";
            } else {
                dot.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
                dot.style.width = "10px";
            }
        });
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            startAutoSlide();
        });
    }

    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-slide"), 10);
            showSlide(index);
            startAutoSlide();
        });
    });

    const carouselContainer = document.getElementById("hero-carousel");
    if (carouselContainer) {
        carouselContainer.addEventListener("mouseenter", stopAutoSlide);
        carouselContainer.addEventListener("mouseleave", startAutoSlide);
    }

    showSlide(0);
    startAutoSlide();
}

/* ==========================================================================
   2. SCROLL HORIZONTAL (MAIS VENDIDAS & RELACIONADOS)
   ========================================================================== */
function initHorizontalScroll() {
    const scrollContainers = [
        {
            trackId: "mais-vendidas-track",
            prevId: "scroll-prev-btn",
            nextId: "scroll-next-btn"
        },
        {
            trackId: "relacionados-track",
            prevId: "rel-scroll-prev",
            nextId: "rel-scroll-next"
        }
    ];

    scrollContainers.forEach(({ trackId, prevId, nextId }) => {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevId);
        const nextBtn = document.getElementById(nextId);

        if (!track) return;

        const scrollAmount = 320;

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                track.scrollBy({ left: scrollAmount, behavior: "smooth" });
            });
        }
    });
}

/* ==========================================================================
   3. FILTRO POR CATEGORIAS (TODAS, CORRIDA, ACADEMIA, CROSS, CICLISMO, CASUAL)
   ========================================================================== */
function initCategoryFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productCards = document.querySelectorAll(".product-item-card");

    if (!filterButtons.length || !productCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Atualiza visual dos botões
            filterButtons.forEach(btn => {
                btn.style.backgroundColor = "#FFFFFF";
                btn.style.color = "#111111";
                btn.style.borderColor = "#E5E5E5";
            });

            button.style.backgroundColor = "#111111";
            button.style.color = "#B7FF00";
            button.style.borderColor = "#111111";

            const selectedCategory = button.getAttribute("data-category").toLowerCase();

            let visibleCount = 0;
            productCards.forEach(card => {
                const cardCategory = (card.getAttribute("data-category") || "").toLowerCase();

                if (selectedCategory === "todas" || cardCategory.includes(selectedCategory)) {
                    card.style.display = "flex";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            const noResults = document.getElementById("no-products-msg");
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? "block" : "none";
            }
        });
    });
}

/* ==========================================================================
   4. PESQUISA EM TEMPO REAL ("BUSQUE SUA MEIA")
   ========================================================================== */
function initSearch() {
    const searchInputs = document.querySelectorAll(".search-input-field");
    const productCards = document.querySelectorAll(".product-item-card");

    if (!searchInputs.length || !productCards.length) return;

    searchInputs.forEach(input => {
        input.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            productCards.forEach(card => {
                const title = (card.getAttribute("data-name") || "").toLowerCase();
                const category = (card.getAttribute("data-category") || "").toLowerCase();

                if (title.includes(query) || category.includes(query)) {
                    card.style.display = "flex";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            const noResults = document.getElementById("no-products-msg");
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? "block" : "none";
            }
        });
    });
}

/* ==========================================================================
   5. CARRINHO DE COMPRAS (LOCALSTORAGE, CÁLCULO DE FRETE E TOTAIS)
   ========================================================================== */
const CART_STORAGE_KEY = "fitsock_cart_items";

function getCart() {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
}

function addToCart(produto, quantidade = 1, tamanho = "M", cor = "Padrão") {
    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === produto.id && item.tamanho === tamanho);

    if (existingIndex > -1) {
        cart[existingIndex].quantidade += quantidade;
    } else {
        cart.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: quantidade,
            tamanho: tamanho,
            cor: cor || produto.cor
        });
    }

    saveCart(cart);
    showNotification(`"${produto.nome}" adicionada ao carrinho!`);
}

function updateCartItemQuantity(id, delta, tamanho = "M") {
    let cart = getCart();
    const item = cart.find(i => i.id === id && (tamanho ? i.tamanho === tamanho : true));

    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) {
            cart = cart.filter(i => !(i.id === id && i.tamanho === tamanho));
        }
        saveCart(cart);
    }
}

function removeCartItem(id, tamanho = "M") {
    let cart = getCart();
    cart = cart.filter(i => !(i.id === id && i.tamanho === tamanho));
    saveCart(cart);
    showNotification("Produto removido do carrinho.");
}

function updateCartUI() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantidade, 0);

    // Atualiza contadores do carrinho no Header
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(b => {
        b.textContent = totalCount;
    });

    // Se estiver na página de carrinho ou modal
    const cartItemsContainer = document.getElementById("cart-items-container");
    const subtotalEl = document.getElementById("cart-subtotal");
    const freteEl = document.getElementById("cart-frete");
    const totalEl = document.getElementById("cart-total");
    const emptyStateEl = document.getElementById("cart-empty-state");
    const contentStateEl = document.getElementById("cart-content-wrapper");

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        if (emptyStateEl) emptyStateEl.style.display = "block";
        if (contentStateEl) contentStateEl.style.display = "none";
        return;
    }

    if (emptyStateEl) emptyStateEl.style.display = "none";
    if (contentStateEl) contentStateEl.style.display = "grid";

    let subtotal = 0;
    cartItemsContainer.innerHTML = "";

    cart.forEach(item => {
        const itemSubtotal = item.preco * item.quantidade;
        subtotal += itemSubtotal;

        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.justifyContent = "space-between";
        row.style.padding = "16px 0";
        row.style.borderBottom = "1px solid #EEEEEE";
        row.style.gap = "16px";
        row.style.flexWrap = "wrap";

        row.innerHTML = `
            <div style="display: flex; align-items: center; gap: 16px;">
                <img src="${item.imagem}" alt="${item.nome}" style="width: 72px; height: 72px; object-fit: cover; border-radius: 8px; border: 1px solid #E5E5E5;" />
                <div>
                    <h4 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 700; color: #111111;">${item.nome}</h4>
                    <p style="margin: 0; font-size: 13px; color: #737373;">Tamanho: <strong>${item.tamanho}</strong> | R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
            </div>

            <div style="display: flex; align-items: center; gap: 20px;">
                <div style="display: flex; align-items: center; border: 1px solid #DDDDDD; border-radius: 6px; overflow: hidden;">
                    <button onclick="updateCartItemQuantity(${item.id}, -1, '${item.tamanho}')" style="background: #F5F5F5; border: none; padding: 6px 12px; cursor: pointer; font-size: 16px; font-weight: 700;">-</button>
                    <span style="padding: 6px 14px; font-size: 14px; font-weight: 600; min-width: 24px; text-align: center;">${item.quantidade}</span>
                    <button onclick="updateCartItemQuantity(${item.id}, 1, '${item.tamanho}')" style="background: #F5F5F5; border: none; padding: 6px 12px; cursor: pointer; font-size: 16px; font-weight: 700;">+</button>
                </div>

                <div style="text-align: right; min-width: 90px;">
                    <span style="display: block; font-size: 16px; font-weight: 700; color: #111111;">R$ ${itemSubtotal.toFixed(2).replace('.', ',')}</span>
                    <button onclick="removeCartItem(${item.id}, '${item.tamanho}')" style="background: none; border: none; color: #E53935; font-size: 12px; text-decoration: underline; cursor: pointer; padding: 0; margin-top: 4px;">Remover</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(row);
    });

    const frete = subtotal >= 199 || subtotal === 0 ? 0 : 15.00;
    const total = subtotal + frete;

    if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (freteEl) freteEl.textContent = frete === 0 ? "GRÁTIS" : `R$ ${frete.toFixed(2).replace('.', ',')}`;
    if (totalEl) totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function initCart() {
    updateCartUI();

    // Event delegation para botões de adicionar ao carrinho
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn-add-cart");
        if (btn) {
            e.preventDefault();
            const id = parseInt(btn.getAttribute("data-id"), 10);
            const nome = btn.getAttribute("data-nome");
            const preco = parseFloat(btn.getAttribute("data-preco"));
            const imagem = btn.getAttribute("data-imagem");
            const cor = btn.getAttribute("data-cor") || "Padrão";

            // Se estiver na tela de detalhe com seletores
            let tamanho = "M";
            const sizeRadio = document.querySelector('input[name="tamanho-selecionado"]:checked');
            if (sizeRadio) {
                tamanho = sizeRadio.value;
            }

            let qtd = 1;
            const qtdInput = document.getElementById("produto-qtd-input");
            if (qtdInput) {
                qtd = parseInt(qtdInput.value, 10) || 1;
            }

            addToCart({ id, nome, preco, imagem, cor }, qtd, tamanho, cor);
        }
    });

    // Botão de checkout simulado
    const checkoutBtn = document.getElementById("btn-checkout");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            alert(" Parabéns! Compra simulada com sucesso no FITSOCK E-commerce!\n\nEste é um projeto acadêmico de demonstração.");
            saveCart([]);
        });
    }
}

/* ==========================================================================
   6. NOTIFICAÇÃO TOAST VISUAL
   ========================================================================== */
function showNotification(message) {
    let toast = document.getElementById("fitsock-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "fitsock-toast";
        toast.style.position = "fixed";
        toast.style.bottom = "24px";
        toast.style.right = "24px";
        toast.style.backgroundColor = "#111111";
        toast.style.color = "#FFFFFF";
        toast.style.borderLeft = "5px solid #B7FF00";
        toast.style.padding = "14px 22px";
        toast.style.borderRadius = "8px";
        toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
        toast.style.zIndex = "9999";
        toast.style.fontSize = "14px";
        toast.style.fontWeight = "600";
        toast.style.transition = "all 0.3s ease";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
    }, 3000);
}

/* ==========================================================================
   7. SCROLL SUAVE PARA LINKS DO MENU
   ========================================================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId && targetId !== "#") {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });
}
