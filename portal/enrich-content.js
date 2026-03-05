const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const itemsDir = path.join(__dirname, 'content', 'items');

const enrichData = {
    'gru-latam': { time: 'Aberto 24h', tips: 'O lounge fica na área de embarque internacional do Terminal 3. Ótimo buffet.', google: 'https://maps.app.goo.gl/hG2yN3y8fQnBxM5y8', site: 'https://www.latamairlines.com/br/pt/experiencia/aeroporto/salas-vip/sao-paulo', youtube: 'https://www.youtube.com/watch?v=FjIuQy097a8' },
    'jnb-greenmotion': { time: '06h00 - 22h00', tips: 'Tire fotos de todos os arranhões no carro antes de sair. Peça pra marcarem no papel.', google: 'https://maps.app.goo.gl/YtqFkP8Rz7nK4V9Z7', site: 'https://greenmotion.com/car-hire/south-africa/johannesburg-airport', youtube: 'https://www.youtube.com/watch?v=7uC8W3Xz4iE' },
    'alzu-petroport': { time: '06h00 - 22h00', tips: 'Peça um lanche no Nando\'s, sente na varanda e aproveite a vista dos Rinocerontes!', google: 'https://maps.app.goo.gl/1U1sT2jJ6ZQ3nFjHA', site: 'https://www.alzu.co.za/petroport/', youtube: 'https://www.youtube.com/watch?v=vV7YJm74xKs' },
    'walkerson-dullstroom': { time: 'Check-in: 14h00', tips: 'Aproveite o spa e não deixe de jantar no restaurante principal deles. Vista dos lagos é surreal.', google: 'https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8', site: 'https://www.walkersons.co.za/', youtube: 'https://www.youtube.com/watch?v=1F_4591qJj8' },
    'mac-mac-falls': { time: '08h00 - 17h00', tips: 'Desça até a plataforma de observação. Tenha moedas (ZAR 50) para a entrada.', google: 'https://maps.app.goo.gl/4Pj9R1fJ3ZQ3nFjHA', site: 'https://www.mpumalanga.com/things-to-do/nature-reserves/mac-mac-falls', youtube: 'https://www.youtube.com/watch?v=s5RjF2r8-P0' },
    'graskop-gorge': { time: '08h30 - 17h00', tips: 'Caminhe pela trilha suspensa de madeira lá embaixo na floresta. Muito bem estruturado.', google: 'https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8', site: 'https://graskopgorgeliftcompany.co.za/', youtube: 'https://www.youtube.com/watch?v=68T0j_1Kqg8' },
    'angels-view': { time: 'Check-in 14h00', tips: 'Peça no bar a bebida Angel\'s Tears e assista o pôr do sol na piscina de borda infinita.', google: 'https://maps.app.goo.gl/YtqFkP8Rz7nK4V9Z7', site: 'https://angelsview.co.za/', youtube: 'https://www.youtube.com/watch?v=Yy4vQj22h84' },
    'gods-window': { time: '07h00 - 17h00', tips: 'Suba até o topo da colina (Rain Forest) para ter a vista de 360 graus.', google: 'https://maps.app.goo.gl/1U1sT2jJ6ZQ3nFjHA', site: 'https://www.mpumalanga.com/things-to-do/nature-reserves/gods-window', youtube: 'https://www.youtube.com/watch?v=zVvX6Kz1D2o' },
    'bourkes-luck': { time: '07h00 - 17h00', tips: 'Vá até o ponto onde os rios Treur (tristeza) e Blyde (alegria) se encontram.', google: 'https://maps.app.goo.gl/4Pj9R1fJ3ZQ3nFjHA', site: 'https://shingwedzi.co.za/bourkes-luck-potholes/', youtube: 'https://www.youtube.com/watch?v=6xO9H_XvGXY' },
    'three-rondavels': { time: '07h00 - 17h00', tips: 'Melhor horário para fotos é depois das 14h, com o sol iluminando as formações.', google: 'https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8', site: 'https://www.krugerpark.co.za/africa_three_rondavels.html', youtube: 'https://www.youtube.com/watch?v=4d0U5G3Q3mU' },
    'mdluli-safari': { time: 'Game Drives: 05h30 / 16h00', tips: 'Faça amizade com seu Ranger e diga os animais que você faz mais questão de ver!', google: 'https://maps.app.goo.gl/YtqFkP8Rz7nK4V9Z7', site: 'https://mdlulisafarilodge.co.za/', youtube: 'https://www.youtube.com/watch?v=9L9jR09_o28' },
    'sleepover-orpen': { time: 'Check-in 14h00', tips: 'Ideal para estar na porta do parque às 05h30 e pegar os felinos da região de Satara caçando.', google: 'https://maps.app.goo.gl/1U1sT2jJ6ZQ3nFjHA', site: 'https://sleepover-motels.co.za/orpen-gate/', youtube: 'https://www.youtube.com/watch?v=3-M9Xw5bYdE' },
    'ngwenya-glass': { time: '08h00 - 16h00', tips: 'Tudo feito com vidro reciclado e você pode assistir os artesãos soprando o vidro.', google: 'https://maps.app.goo.gl/4Pj9R1fJ3ZQ3nFjHA', site: 'https://ngwenyaglass.co.sz/', youtube: 'https://www.youtube.com/watch?v=7M7n0J8q8wM' },
    'summerfield-resort': { time: 'Check-in 14h00', tips: 'Explore os jardins botânicos pela manhã. Aves raras, pavões e cenários impecáveis.', google: 'https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8', site: 'https://summerfieldresort.com/', youtube: 'https://www.youtube.com/watch?v=VxFo95bU2nQ' },
    'sixt-plz': { time: '07h00 - 20h00', tips: 'Seja ágil ao pegar a mala em PLZ, pois costuma ter fila no guichê. Diga que quer um "Upgrade complimentary".', google: 'https://maps.app.goo.gl/YtqFkP8Rz7nK4V9Z7', site: 'https://www.sixt.com/car-rental/south-africa/port-elizabeth', youtube: 'https://www.youtube.com/watch?v=5U6K7h0N4H4' },
    'radisson-plz': { time: 'Check-in 15h00', tips: 'Caminhe no calçadão em frente cedinho ou beba lendo um livro com vista pro oceano.', google: 'https://maps.app.goo.gl/1U1sT2jJ6ZQ3nFjHA', site: 'https://www.radissonhotels.com/en-us/hotels/radisson-blu-port-elizabeth', youtube: 'https://www.youtube.com/watch?v=M9Uv2bE0m4s' },
    'bloukrans-bridge': { time: '09h00 - 17h00', tips: 'Você não precisa pular! Pode só acompanhar na ponte caminhando pela passarela de metal vazada.', google: 'https://maps.app.goo.gl/4Pj9R1fJ3ZQ3nFjHA', site: 'https://www.faceadrenalin.com/', youtube: 'https://www.youtube.com/watch?v=68T0j_1Kqg8' },
    'bungalow-plett': { time: 'Check-in 14h00', tips: 'Tome o café da manhã devagar. A vibe praiana aqui (The Hub) é a cara da Garden Route chique no verão.', google: 'https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8', site: 'https://www.thebungalowplett.co.za/', youtube: 'https://www.youtube.com/watch?v=xZ_sXoHwqD8' },
    'robberg': { time: '07h00 - 18h00', tips: 'Faça a trilha circular média nas dunas! Leve água extra, muito vento e sol batendo.', google: 'https://maps.app.goo.gl/YtqFkP8Rz7nK4V9Z7', site: 'https://www.capenature.co.za/reserves/robberg-nature-reserve', youtube: 'https://www.youtube.com/watch?v=e_k9bO3KqjM' },
    'marine-hermanus': { time: 'Check-in 14h00', tips: 'As baleias chegam até as pedras do hotel. Fique de olho da piscina!', google: 'https://maps.app.goo.gl/1U1sT2jJ6ZQ3nFjHA', site: 'https://www.themarinehotel.co.za/', youtube: 'https://www.youtube.com/watch?v=bV7X_O5XvjI' },
    'table-mountain': { time: '08h00 - 19h00 (pode mudar por causa do vento)', tips: 'Cordilheira formou as nuvens grossas (Toalha de Mesa)? Não suba. Tempo abriu limpo? Vá na hora!', google: 'https://maps.app.goo.gl/4Pj9R1fJ3ZQ3nFjHA', site: 'https://tablemountain.net/', youtube: 'https://www.youtube.com/watch?v=3I0T2fN6Mlc' },
    'marly-camps-bay': { time: 'Check-in 14h00', tips: 'O restaurante Chinchilla que fica no topo do hotel é um dos mais hypados do pôr do sol.', google: 'https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8', site: 'https://themarly.co.za/', youtube: 'https://www.youtube.com/watch?v=9S_wH9H4eM8' },
    'babylonstoren': { time: '09h00 - 17h00', tips: 'Jardins imperdíveis. Reserve o restaurante Babel com MUITA antecedência ou coma na estufa de vidro.', google: 'https://maps.app.goo.gl/YtqFkP8Rz7nK4V9Z7', site: 'https://babylonstoren.com/', youtube: 'https://www.youtube.com/watch?v=t7O_eX8Xw5o' },
    'wine-tram': { time: '09h00 - 17h00', tips: 'Use a linha Laranja, que te permite visitar lugares como Groot Drakenstein e Boschendal. Faça 3 a 4 paradas no máximo.', google: 'https://maps.app.goo.gl/1U1sT2jJ6ZQ3nFjHA', site: 'https://winetram.co.za/', youtube: 'https://www.youtube.com/watch?v=v0L_W2C9r4M' },
    'sandton-sun': { time: 'Check-in 14h00', tips: 'Aproveite a conexão direta e coberta por dentro do hotel para o Sandton City Mall e Mandela Square.', google: 'https://maps.app.goo.gl/4Pj9R1fJ3ZQ3nFjHA', site: 'https://www.tsogosun.com/sandton-sun-hotel', youtube: 'https://www.youtube.com/watch?v=vV7YJm74xKs' },
    'soweto-tour': { time: 'Manhã (09h00 - 13h00)', tips: 'Entenda a força e energia do Soweto. Não perca a rua onde viveram Mandela e Desmond Tutu.', google: 'https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8', site: 'https://www.moafrikatours.com/soweto-tour/', youtube: 'https://www.youtube.com/watch?v=H7J_A9j2eN0' }
};

const files = fs.readdirSync(itemsDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
    const slug = file.replace('.md', '');
    const data = enrichData[slug];

    if (data) {
        const filePath = path.join(itemsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);

        parsed.data.time = data.time;
        parsed.data.links = {
            googleMaps: data.google,
            official: data.site
        };
        parsed.data.visuals = {
            youtubeUrl: data.youtube
        };
        parsed.data.details = {
            tips: data.tips
        };

        const newMarkdown = matter.stringify(parsed.content, parsed.data);
        fs.writeFileSync(filePath, newMarkdown);
        console.log(`✅ Enriched ${slug}.md`);
    } else {
        console.log(`⚠️ Skip ${slug}.md (No data)`);
    }
});
