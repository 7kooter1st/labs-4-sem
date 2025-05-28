export class sosButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("sos-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id="sos-button" class="btn btn-primary" type="button" style="height: 50px; width: 200px; margin-top: 20px; margin-left: 10px; margin-right: 10px">сумма квадратов</button>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }

    sumOfSquares(arr) {
        return arr.reduce((sum, num) => sum + num * num, 0);
      }
}