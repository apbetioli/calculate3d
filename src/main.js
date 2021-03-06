import Parameters from './parameters';
import Print, {Input, Text} from './print';
import GCode from './gcode';

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

        this.fileInput.value = '';
    }

    parseGCode(file, content) {
        const print = new Print(file.name);

        const gcode = new GCode(content);
        print.weight = gcode.weight;
        print.time = gcode.time;
        print.formattedTime = gcode.formattedTime;

        this.prints.push(print);
        this.render();
    }

    render() {
        if(this.prints.length == 0)
            return;

        this.printsTable.style.display = 'block';
        this.printsBody.innerHTML = "";

        const total = new Print('TOTAL');
        const roi = this.calculateROI();
        const shipping = this.parameters.getValue('shipping');
        const transactionFee =this.parameters.getValue('transaction_fee');

        this.prints.forEach(print => {

            print.filamentCost = print.weight * this.parameters.getValue('filament_cost') / 1000;
            print.energyCost = print.time * this.parameters.getValue('power_rating') * this.parameters.getValue('energy_cost') / (60 * 1000);
            print.additionalCost = this.parameters.getValue('additional_cost');
            print.totalCost = print.filamentCost + print.energyCost + print.additionalCost;
            print.failureMargin = print.totalCost * this.parameters.getValue('failure_margin') / 100;
            print.markup = print.totalCost * this.parameters.getValue('markup') / 100;
            print.roi = print.time * roi;
            print.sellPrice = print.totalCost + print.failureMargin + print.roi + print.markup;
            print.finishing = print.sellPrice * this.parameters.getValue('finishing') / 100;
            print.transactionFee = (print.sellPrice + print.finishing) * transactionFee / 100;
            print.finalPrice = print.sellPrice + print.finishing + print.transactionFee;
            print.shipping = shipping + (shipping * transactionFee / 100);

            total.add(print);

            this.printsBody.appendChild(print.render());
        });

        this.printsBody.appendChild(total.render());
    }

    calculateROI() {
        return this.parameters.getValue('investment') / this.parameters.getValue('desired_time') / 30 / this.parameters.getValue('work_hours') / 60;
    }

}

new App();