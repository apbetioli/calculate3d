import Parameters from './parameters';
import Print, {Input, Text} from './print';

class App {
    constructor() {
        this.parameters = new Parameters();
        this.parameters.addOnChangeListeners(() => this.render());

        this.prints = [];

        this.bindUI();
        this.render();
    }

    bindUI() {
        this.printsTable = document.getElementById('prints_table');
        this.printsTable.style.display = 'none';

        this.printsBody = document.getElementById('prints_body');

        this.fileInput = document.getElementById('file');
        this.fileInput.onchange = (e) => this.readFiles(e.target.files);
    }
    
    readFiles(files) {
        Object.values(files).forEach((file) => {
            var reader = new FileReader();
            reader.onload = () => this.parseGCode(file, reader.result);
            reader.readAsText(file);	
        });
    }

    parseGCode(file, gcode) {
        let print = new Print(file.name);

        //TODO
        print.weight = 200;
        print.time = 60;

        this.prints.push(print);
        this.render();
    }

    render() {
        if(this.prints.length == 0)
            return;

        this.printsTable.style.display = 'block';

        this.printsBody.innerHTML = "";
        this.prints.forEach(print => {

            print.filamentCost = print.weight * this.parameters.getValue('filament_cost') / 1000;
            print.energyCost = print.time * this.parameters.getValue('power_rating') * this.parameters.getValue('energy_cost') / (60 * 1000);
            print.additionalCost = parseFloat(this.parameters.getValue('additional_cost'));
            print.totalCost = print.filamentCost + print.energyCost + print.additionalCost;
            print.failureMargin = print.totalCost * this.parameters.getValue('failure_margin') / 100;
            print.markup = print.totalCost * this.parameters.getValue('markup') / 100;
            print.sellPrice = print.totalCost + print.failureMargin + print.markup;

            this.printsBody.appendChild(print.render());
        });
    }

}

new App();