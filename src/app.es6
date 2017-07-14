import $ from 'jquery';
import ModelViewer from './modelViewer';

$(document).ready(()=>{

/*$(document).on('click','a', (e)=>{
    e.preventDefault();
    let pageHref = $(e.currentTarget).attr('href');
    getPage(pageHref);
})*/

pageFunctions(window.location.pathname);

function pageFunctions(pageName){
    console.log(pageName);
    if(pageName == '/') {
        $.get('card.html', (cardTemplate) => {
            $.get('/api/models', (cardsData) => {
                cardsData.forEach((cardData) => {
                    let card = cardTemplate;
                    card = card.replace('{{img}}', cardData.img);
                    card = card.replace('{{modelName}}', cardData.name);
                    card = card.replace('{{link}}', cardData.link);
                    var cardC = $('#cards').append(card);
                });
            });
        });
    } else if(pageName.indexOf('view') !== -1) {
        var model = window.location.href.split('?')[1].split('&')[0].split('=')[1];
        var texture = window.location.href.split('?')[1].split('&')[1].split('=')[1];
        var name = window.location.href.split('?')[1].split('&')[2].split('=')[1];
        console.log(name)
        var mv = new ModelViewer('gl');
        $('#modelName').html(name);
        mv.init(model + '.obj', texture + '.png');
    }
}

})

