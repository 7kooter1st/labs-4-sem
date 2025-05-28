export class AddButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("add-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id="add-button" class="btn btn-primary" type="button" style="height: 50px; width: 200px; margin-top: 20px; margin-left: 10px; margin-right: 10px">добавить</button>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}