export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
        this.sosButton = new sosButtonComponent(parent);
        this.onesButton = new onesButtonComponent(parent);
    }

    getHTML(data) {
        return (`
            <div class="video-page-container" style="max-width: 1200px; margin: 0 auto; padding: 20px;">
                <!-- Основное видео -->
                <div class="video-player" style="width: 100%; background: #000; border-radius: 8px; margin-bottom: 20px;">
                    <div style="position: relative; padding-top: 56.25%;">
                        <img src="${data.src}" alt="видео" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
                        <div class="video-controls" style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.7)); padding: 20px; color: white; display: flex; align-items: center;">
                            <button style="background: none; border: none; color: white; font-size: 24px; margin-right: 15px;">▶</button>
                            <div style="flex-grow: 1; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; margin-right: 15px;">
                                <div style="width: 30%; height: 100%; background: red; border-radius: 2px;"></div>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <span style="margin-right: 15px;">${data.time}</span>
                                <button style="background: none; border: none; color: white; font-size: 20px; margin-right: 15px;">🔊</button>
                                <button style="background: none; border: none; color: white; font-size: 20px;">⛶</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Информация о видео -->
                <div class="video-info" style="display: flex; margin-bottom: 20px;">
                    <div class="channel-info" style="display: flex; align-items: center; margin-right: 20px;">
                        <div class="channel-avatar" style="width: 50px; height: 50px; border-radius: 50%; background: #ddd; margin-right: 12px;"></div>
                        <div>
                            <h3 style="margin: 0 0 5px 0; font-size: 16px;">${data.title}</h3>
                            <p style="margin: 0; color: #606060; font-size: 14px;">Канал · 1,2 млн подписчиков</p>
                        </div>
                    </div>
                    <div class="video-actions" style="margin-left: auto; display: flex; align-items: center;">
                        <button style="background: #f1f1f1; border: none; border-radius: 18px; padding: 8px 16px; margin-right: 10px; display: flex; align-items: center;">
                            <span style="margin-right: 6px;">👍</span> ${data.likes || '0'}
                        </button>
                        <button style="background: #f1f1f1; border: none; border-radius: 18px; padding: 8px 16px; margin-right: 10px; display: flex; align-items: center;">
                            <span style="margin-right: 6px;">👎</span> ${data.dislikes || '0'}
                        </button>
                        <button style="background: #f1f1f1; border: none; border-radius: 18px; padding: 8px 16px; margin-right: 10px; display: flex; align-items: center;">
                            <span style="margin-right: 6px;">↗</span> Поделиться
                        </button>
                        <button style="background: #f1f1f1; border: none; border-radius: 18px; padding: 8px 16px; display: flex; align-items: center;">
                            <span style="margin-right: 6px;">+</span> Сохранить
                        </button>
                    </div>
                </div>

                <!-- Описание видео -->
                <div class="video-description" style="background: #f9f9f9; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <div style="display: flex; margin-bottom: 10px;">
                        <span style="font-weight: bold; margin-right: 10px;">125K просмотров</span>
                        <span style="color: #606060;">${new Date().toLocaleDateString()}</span>
                    </div>
                    <p style="margin: 0; line-height: 1.5;">${data.text}</p>
                </div>

                <!-- Комментарии -->
                <div class="video-comments" style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 20px;">1,234 комментария</h3>
                    
                    <div class="comment" style="display: flex; margin-bottom: 15px;">
                        <div class="comment-avatar" style="width: 40px; height: 40px; border-radius: 50%; background: #ddd; margin-right: 12px;"></div>
                        <div class="comment-content" style="flex-grow: 1;">
                            <div style="font-weight: bold; margin-bottom: 5px;">Имя пользователя</div>
                            <div style="margin-bottom: 5px;">Это отличное видео! Спасибо за контент!</div>
                            <div style="display: flex; align-items: center; color: #606060; font-size: 14px;">
                                <span style="margin-right: 15px;">👍 125</span>
                                <span style="margin-right: 15px;">👎 2</span>
                                <span>Ответить</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Рекомендации -->
                <div class="recommendations">
                    <h3 style="margin-bottom: 15px;">Рекомендуем</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px;">

                    </div>
                </div>
                
                <!-- Контейнер для результатов -->
                <div id="sos-result" style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 4px;"></div>
                <div id="ones-result" style="margin-top: 10px; padding: 10px; background: #f0f0f0; border-radius: 4px;"></div>
            </div>
        `);
    }

    // ... остальные методы класса ProductComponent ...

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Обработчик для кнопки суммы квадратов (использует лайки и дизлайки)
        this.sosButton.render(() => {
            const likes = parseInt(data.likes) || 0;
            const dislikes = parseInt(data.dislikes) || 0;
            const result = this.sosButton.sumOfSquares([likes, dislikes]);
            
            document.getElementById('sos-result').textContent = 
                `Лайки: ${likes}, Дизлайки: ${dislikes}\n` +
                `Сумма квадратов: ${likes}² + ${dislikes}² = ${result}`;
        });

        // Обработчик для кнопки максимальной последовательности единиц
        this.onesButton.render(() => {
            const likesBinary = parseInt(data.likes).toString(2);
            const result = maxSequenceOfOnes(likesBinary);
            
            document.getElementById('ones-result').textContent = 
                `Лайки в двоичном виде: ${likesBinary}\n` +
                `Максимальная последовательность единиц: ${result}`;
        });
    }
}

export class sosButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document.getElementById("sos-button").addEventListener("click", listener);
    }

    getHTML() {
        return (`
            <button id="sos-button" class="btn btn-primary" type="button" 
                    style="height: 50px; width: 250px; margin-top: 20px; margin-left: 10px; margin-right: 10px">
                Сумма квадратов лайков/дизлайков
            </button>
        `);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }

    sumOfSquares(arr) {
        return arr.reduce((sum, num) => sum + num * num, 0);
    }
}

export class onesButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document.getElementById("ones-button").addEventListener("click", listener);
    }

    getHTML() {
        return (`
            <button id="ones-button" class="btn btn-secondary" type="button" 
                    style="height: 50px; width: 350px; margin-top: 20px; margin-left: 10px; margin-right: 10px">
                Макс последовательность единиц в лайках
            </button>
        `);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}

export function maxSequenceOfOnes(str) {
    let maxCount = 0;
    let currentCount = 0;
    
    for (let char of str) {
        if (char === '1') {
            currentCount++;
            maxCount = Math.max(maxCount, currentCount);
        } else {
            currentCount = 0;
        }
    }
    
    return maxCount;
}