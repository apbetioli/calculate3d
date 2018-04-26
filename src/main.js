import Parameters from './parameters';
import Print from './print';

class App {
    constructor() {
        this.parameters = new Parameters();
        this.parameters.load();

        this.prints = [];

        this.bindUI();
        this.render();
    }

    bindUI() {
        document.getElementById('addButton').onclick = () => this.addPrint();
    }

    addPrint() {
        this.prints.push(new Print("baby groot"));
        this.render();
    }

    render() {
        let prints_body = document.getElementById("prints_body");
        prints_body.innerHTML = "";

        this.prints.forEach(print => {
            prints_body.appendChild(print.render());
        });
    }

}

new App();