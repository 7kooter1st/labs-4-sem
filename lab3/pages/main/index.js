import {ButtonComponent} from "../../components/button/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import { AddButtonComponent } from "../../components/add-button/index.js";
import { DeleteButtonComponent } from "../../components/delete-button/index.js";
import { pages } from "../../data/pagesInfo.js"

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    getData() {
        return pages;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }

    clickCard(e) {
        console.log("клик")
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    clickAdd() {
        const firstItem = pages[0];
        const lastIndex = Math.max(...pages.map(item => item.id))
        const newItem = {
            ...firstItem,
            id: lastIndex + 1
        };
        pages.push(newItem)
        const productCard = new ProductCardComponent(this.pageRoot)
        productCard.render(pages[lastIndex], this.clickCard.bind(this));
    }

    clickDelete() {
        const data = this.getData();
        const lastIndex = Math.max(...data.map(item => item.id))
        const lastItem = data[lastIndex];
        if (lastIndex > 1){
            data.pop(lastItem)
            const mainPage = new MainPage(this.parent)
            mainPage.render()
        }
        else{
            throw console.error("остановись придурок!");
        }
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const addButton = new AddButtonComponent(this.pageRoot)
        addButton.render(this.clickAdd.bind(this))

        const deleteButton = new DeleteButtonComponent(this.pageRoot)
        deleteButton.render(this.clickDelete.bind(this))

        const 
        
        const data = this.getData(pages)
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
}