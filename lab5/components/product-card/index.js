export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="video-card" style="width: 300px; margin-bottom: 16px;">
                    <div class="video-thumbnail" style="position: relative;">
                        <img class="thumbnail-image" src="${data.src}" alt="превью видео" style="width: 100%; border-radius: 8px;">
                        <div class="video-time" style="position: absolute; bottom: 4px; right: 4px; background: rgba(0,0,0,0.8); color: white; padding: 2px 4px; border-radius: 4px; font-size: 12px;">${data.time}</div>
                    </div>
                    <div class="video-info" style="display: flex; margin-top: 8px;">
                        <div class="channel-icon" style="width: 36px; height: 36px; border-radius: 50%; background: #ddd; margin-right: 12px;"></div>
                        <div class="video-details" style="flex: 1;">
                            <h3 class="video-title" style="margin: 0; font-size: 14px; font-weight: 500; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${data.title}</h3>
                            <p class="video-meta" style="margin: 4px 0 0; color: #606060; font-size: 12px;">Канал · ${Math.floor(Math.random() * 100)} тыс. просмотров · ${Math.floor(Math.random() * 12)} месяцев назад</p>
                        </div>
                    </div>
                    <button class="video-button" id="click-card-${data.id}" data-id="${data.id}" style="display: none;"></button>
                </div>
            `
        )
    }

    addListeners(data, listener) {
        const card = document.getElementById(`click-card-${data.id}`);
        const parentCard = card.closest('.video-card');
        
        // Клик по всей карточке
        parentCard.style.cursor = 'pointer';
        parentCard.addEventListener("click", listener);
        
        // Или можно оставить только кнопку, если нужно
        // card.addEventListener("click", listener);
    }
    
    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}