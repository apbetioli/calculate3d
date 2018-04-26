class Parameters {
    constructor() {
        this.inputs = document.querySelectorAll("#parameters input");
        this.storeOnChange();
    }

    load() {
        this.inputs.forEach(input => {
            let value = localStorage.getItem(input.getAttribute('id'));
            if(value)
                input.value = value;
        });
    }

    store() {
        this.inputs.forEach(input => localStorage.setItem(input.getAttribute('id'), input.value));
    }

    storeOnChange() {
        this.inputs.forEach(input => input.onchange = () => {
            this.store();
        });
    }
};

export default Parameters;