import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { Header } from "../../components/header/index.js";
import { ajax } from "../../modules/ajax.js"; // Добавляем импорт ajax
import { stockUrls } from "../../modules/stockUrls.js"; // Добавляем импорт stockUrls

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.data = null; // Добавляем поле для хранения данных
    }

    async getData() {
        try {
            return new Promise((resolve) => {
                ajax.get(stockUrls.getStockById(this.id), (data) => {
                    this.data = data; // Сохраняем данные
                    this.renderData(data);
                    resolve(data);
                });
            });
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
            return null;
        }
    }

    renderData(item) {
        if (!item) {
            console.warn("Нет данных для отображения");
            return;
        }
        
        const product = new ProductComponent(this.pageRoot); // Исправлено на ProductComponent
        product.render(item);
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    async render() {
        this.parent.innerHTML = '';
        
        // Рендерим Header
        const header = new Header(this.parent);
        header.render(null, this.clickBack.bind(this));
        
        // Добавляем контейнер для продукта
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        // Получаем и рендерим данные
        await this.getData();
        
        // Если нужно явно вызвать рендер после получения данных
        if (this.data) {
            this.renderData(this.data);
        }
    }
}