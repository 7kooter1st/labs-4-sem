export class Header {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("home-button")
            .addEventListener("click", listener)
    }

    getHTML(data) {
        return (
            `
                <div class="title" id="title" style="width: 100%; height: 100px; background-color: lightgray; padding-left: 30px; text-align: left;font-size: 30px;">Видеохостинг
                    <button id="home-button" class="btn btn-primary" type="button" style="height: 50px; width: 200px; margin-top: 20px; margin-left: 10px; margin-right: 10px">Домой</button>
                </div>
                
            `
        )
    }

    
    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}