import {ButtonComponent} from "../../components/button/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import { AddButtonComponent } from "../../components/add-button/index.js";
import { DeleteButtonComponent } from "../../components/delete-button/index.js";
import { pages } from "../../data/pagesInfo.js"
import { sosButtonComponent } from "../../components/homeTask/1_3.js";
import { Header } from "../../components/header/index.js";
import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";
import { EditButtonComponent } from "../../components/edit-button/index.js";
import { EditPage } from "../newPage/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            this.renderData(data);
        })
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
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

    // clickAdd() {
    //     const firstItem = pages[0];
    //     const lastIndex = Math.max(...pages.map(item => item.id))
    //     const newItem = {
    //         ...firstItem,
    //         id: lastIndex + 1,
    //         status: 0, 
    //         text: "програмирование на JS урок " + (lastIndex + 1)
    //     };
    //     pages.push(newItem)
    //     const productCard = new ProductCardComponent(this.pageRoot)
    //     productCard.render(pages[lastIndex], this.clickCard.bind(this));
    // }

    // clickDelete() {
    //     const data = this.getData();
    //     const lastIndex = Math.max(...data.map(item => item.id))
    //     const lastItem = data[lastIndex];
    //     if (lastIndex > 1){
    //         data.pop(lastItem)
    //         const mainPage = new MainPage(this.parent)
    //         mainPage.render()
    //     }
    //     else{
    //         throw console.error("остановись придурок!");
    //     }
    // }

    clickSos(card){
        let id_arr = [pages.forEach((items) => id)]
        const productCard = ProductCardComponent(card)

    }

    clickEdit() {
        const editPage = new EditPage(this.parent);
        editPage.render();
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const header = new Header(this.pageRoot)
        header.render(this.clickCard.bind(this))

        const editButton = new EditButtonComponent(this.pageRoot)
        editButton.render(this.clickEdit.bind(this))
        
        this.getData()
    }
}