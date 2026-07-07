const WORKER_URL = 'https://flat-paper-88b5.viniciusmabi31.workers.dev';


// Mapeamento de categorias do site para a GNews
const categoryMap = {
    'technology': 'technology',
    'business': 'business',
    'entertainment': 'entertainment',
    'sports': 'sports',
    'general': 'general'
};

// Busca notícias reais da GNews API
async function fetchNews(category = 'technology') {
    const gnewsCategory = categoryMap[category] || 'technology';

    const url = `${WORKER_URL}?category=${gnewsCategory}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.warn('GNews API erro:', response.status);
            return getFallbackNews(category);
        }

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            console.warn('Nenhuma notícia retornada, usando fallback');
            return getFallbackNews(category);
        }

        // Normaliza o formato para o mesmo que o site já usa
        return data.articles.map((article, index) => ({
            id: index + 1,
            title: article.title,
            description: article.description || 'Clique para ler a notícia completa.',
            content: article.content || article.description || '',
            urlToImage: article.image || null,
            source: { name: article.source?.name || 'Notícia' },
            publishedAt: article.publishedAt,
            url: article.url,
            author: article.source?.name || 'Redação',
            category: category
        }));

    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
        return getFallbackNews(category);
    }
}

// Fallback caso a API falhe (ex: sem internet, limite atingido)
function getFallbackNews(category) {
    const fallbacks = {
        technology: [
            {
                id: 1,
                title: "Inteligência Artificial transforma o mercado de trabalho em 2025",
                description: "Especialistas apontam que a IA está criando novas oportunidades e transformando profissões em todo o mundo.",
                content: "A inteligência artificial continua a remodelar o mercado de trabalho global, com novas funções surgindo e outras sendo automatizadas.",
                urlToImage: "https://placehold.co/800x400/1a1a2e/00d4ff?text=Inteligencia+Artificial",
                source: { name: "Tech News" },
                publishedAt: new Date().toISOString(),
                url: "#",
                author: "Redação Tech",
                category: "technology"
            },
            {
                id: 2,
                title: "5G expande cobertura para novas regiões do Brasil",
                description: "Operadoras investem em infraestrutura para levar conectividade de alta velocidade a mais cidades.",
                content: "A expansão do 5G no Brasil continua acelerada, com novas antenas sendo instaladas em regiões metropolitanas e do interior.",
                urlToImage: "https://placehold.co/800x400/0f3460/25f4ee?text=5G+Brasil",
                source: { name: "Telecom Brasil" },
                publishedAt: new Date(Date.now() - 3600000).toISOString(),
                url: "#",
                author: "Redação",
                category: "technology"
            }
        ],
        business: [
            {
                id: 3,
                title: "Mercado financeiro registra alta expressiva nesta semana",
                description: "Bolsa de valores sobe com otimismo dos investidores sobre dados econômicos.",
                content: "O mercado financeiro brasileiro apresentou desempenho positivo, impulsionado por boas notícias no cenário econômico.",
                urlToImage: "https://placehold.co/800x400/1a472a/25f4ee?text=Mercado+Financeiro",
                source: { name: "Finance News" },
                publishedAt: new Date().toISOString(),
                url: "#",
                author: "Redação Econômica",
                category: "business"
            }
        ],
        entertainment: [
            {
                id: 4,
                title: "Cinema brasileiro conquista prêmio internacional",
                description: "Produção nacional é destaque em importante festival de cinema europeu.",
                content: "O cinema brasileiro voltou a brilhar no cenário internacional com mais uma premiação de destaque.",
                urlToImage: "https://placehold.co/800x400/4a0e4e/25f4ee?text=Cinema+Brasileiro",
                source: { name: "Entertainment BR" },
                publishedAt: new Date().toISOString(),
                url: "#",
                author: "Redação",
                category: "entertainment"
            }
        ],
        sports: [
            {
                id: 5,
                title: "Seleção Brasileira se prepara para grande competição",
                description: "Jogadores convocados iniciam treinos visando torneio internacional.",
                content: "A Seleção Brasileira deu início à preparação para o próximo grande torneio, com treinos intensos e novidades na convocação.",
                urlToImage: "https://placehold.co/800x400/1a3a3a/fe2c55?text=Selecao+Brasileira",
                source: { name: "Sports Brasil" },
                publishedAt: new Date().toISOString(),
                url: "#",
                author: "Redação Esportiva",
                category: "sports"
            }
        ],
        general: [
            {
                id: 6,
                title: "Brasil avança em índices de desenvolvimento humano",
                description: "Relatório aponta melhora em educação, saúde e renda da população brasileira.",
                content: "O Brasil registrou avanços significativos nos principais indicadores de desenvolvimento humano, segundo novo relatório.",
                urlToImage: "https://placehold.co/800x400/1a2d4d/25f4ee?text=Brasil+Noticias",
                source: { name: "Notícias BR" },
                publishedAt: new Date().toISOString(),
                url: "#",
                author: "Redação",
                category: "general"
            }
        ]
    };

    return fallbacks[category] || fallbacks.general;
}
