import { MainPage } from "../main/index.js";
import { Header } from "../../components/header/index.js";
import { AddButtonComponent } from "../../components/add-button/index.js";
import { DeleteButtonComponent } from "../../components/delete-button/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class EditPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [];
    }

    get pageRoot() {
        return document.getElementById('edit-page');
    }

    getHTML() {
        return `<div id="edit-page" class="d-flex flex-wrap"></div>`;
    }

    getData() {
        ajax.get(stockUrls.getStocks(), (data, status) => {
            if (status === 200 && data) {
                this.data = data;
                this.renderData();
            } else {
                console.error('Ошибка при получении данных:', status);
            }
        });
    }

    renderData() {
        const container = document.getElementById('edit-page');
        if (!container) return;
        
        container.innerHTML = '';
        this.data.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, null);
        });
    }

    clickAdd() {
        const form = document.createElement('div');
        form.id = 'add-form';
        form.className = 'w-100 mb-4 p-3';
        form.innerHTML = `
            <h3>Добавить новое видео</h3>
            <form id="new-video-form" class="row g-3">
                <div class="col-md-6">
                    <label for="src" class="form-label">URL изображения</label>
                    <input type="text" class="form-control" id="src" required>
                </div>
                <div class="col-md-6">
                    <label for="title" class="form-label">Название</label>
                    <input type="text" class="form-control" id="title" required>
                </div>
                <div class="col-md-4">
                    <label for="likes" class="form-label">Лайки</label>
                    <input type="number" class="form-control" id="likes" required>
                </div>
                <div class="col-md-4">
                    <label for="dislikes" class="form-label">Дизлайки</label>
                    <input type="number" class="form-control" id="dislikes" required>
                </div>
                <div class="col-md-4">
                    <label for="time" class="form-label">Время</label>
                    <input type="text" class="form-control" id="time" required>
                </div>
                <div class="col-md-6">
                    <label for="author" class="form-label">Автор</label>
                    <input type="text" class="form-control" id="author" required>
                </div>
                <div class="col-md-6">
                    <label for="status" class="form-label">Статус</label>
                    <input type="number" class="form-control" id="status" required>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Сохранить</button>
                    <button type="button" class="btn btn-secondary" onclick="document.getElementById('add-form').remove()">Отмена</button>
                </div>
            </form>
        `;
        
        this.pageRoot.insertAdjacentElement('afterbegin', form);
        
        document.getElementById('new-video-form').onsubmit = (e) => {
            e.preventDefault();
            
            const newItem = {
                src: document.getElementById('src').value,
                title: document.getElementById('title').value,
                likes: parseInt(document.getElementById('likes').value),
                dislikes: parseInt(document.getElementById('dislikes').value),
                author: document.getElementById('author').value,
                time: document.getElementById('time').value,
                status: parseInt(document.getElementById('status').value)
            };

            ajax.post(stockUrls.createStock(), newItem, (data, status) => {
                if (status === 201) {
                    this.getData();
                    form.remove();
                } else {
                    console.error('Ошибка при добавлении данных:', status);
                }
            });
        };
    }

    clickDelete() {
        if (this.data.length > 1) {
            const lastItem = this.data[this.data.length - 1];
            const deleteUrl = stockUrls.getStockById(lastItem.id);
            ajax.delete(deleteUrl, (data, status) => {
                if (status === 200) {
                    this.getData();
                } else {
                    console.error('Ошибка при удалении:', status);
                }
            });
        } else {
            alert("Нельзя удалить последнюю страницу!");
        }
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        
        const header = new Header(this.parent);
        header.render(null, this.clickBack.bind(this));
        
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const addButton = new AddButtonComponent(this.parent);
        addButton.render(this.clickAdd.bind(this));

        const deleteButton = new DeleteButtonComponent(this.parent);
        deleteButton.render(this.clickDelete.bind(this));

        this.getData();
    }
}