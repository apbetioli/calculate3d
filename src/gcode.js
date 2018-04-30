class GCode {
    constructor(content) {
        this.time = 0;
        this.speed = 0;
        this.x0 = 0;
        this.y0 = 0;
        this.z0 = 0;
        this.e0 = 0;

        let lines = content.split(/\r\n|\n/);
        lines.forEach(line => {
            this.parseLine(line);
        });
    }

    parseLine(line) {
        if(line.startsWith('G92')) {
            this.g92(line)
        }
        else if(line.startsWith('G1')) {
            this.g1(line)
        }
        else if(line.startsWith('; filament used')) {
            this.parseFilamentUsedSlic3r(line);
        }
        else if(line.startsWith(';   Plastic weight')) {
            this.parseWeight(line);
        }
        else if(line.startsWith(';   Plastic volume')) {
            this.parseVolume(line);
        }
        else if(line.startsWith(';   Filament length')) {
            this.parseFilamentLenght(line);
        }
        else if(line.startsWith(';   Build time')) {
            this.parseBuildTime(line);
        }
        
    }

    parseBuildTime(line) {
        let valueIndex = line.indexOf(':') + 1;
        this.formattedTime = line.substring(valueIndex);

        console.log('calculated time: ' + this.time); 
        this.time = 0;

        let tokens = this.getValues(line);
        for(let i = 0; i < tokens.length; i += 2) {
            let value = parseFloat(tokens[i]);
            let unit = tokens[i+1];

            if(unit == 'hours' || unit == 'hour') {
                this.time += value * 60;
            }
            else if(unit == 'minutes' || unit == 'minute') {
                this.time += value;
            }
        }

        console.log('simplify time: ' + this.time); 
    }

    g1(line) {
        let tokens = line.split(' ');
        let deltaE = 0;
        let deltaX = 0;
        let distance = 0;

        for(let i = 1; i < tokens.length; i ++) {
            let axis = tokens[i][0];
            let value = parseInt(tokens[i].substring(1));
            
            switch(axis) {
                case 'E': {
                    deltaE = value - this.e0; 
                    break;
                }
                case 'F': {
                    this.speed = value; 
                    break;
                }
                case 'X': {
                    deltaX = value - this.x0;
                    this.x0 = value;
                    break;
                }
                case 'Y': {
                    let deltaY = value - this.y0;
                    this.y0 = value;

                    distance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
                    break;
                }
                case 'Z': {
                    let deltaZ = value - this.z0;
                    this.z0 = value;
                    distance = deltaZ;
                    break;
                }
            }
        }

        distance = Math.max(distance, deltaE); //In case it's only extruding

        if(this.speed != 0) {
            let time = distance / this.speed;
            this.time += time;
        }
    }

    g92(line) {
        let tokens = line.split(' ');
        switch(tokens[1][0]) {
            case 'E': this.e0 = 0; break;
            case 'X': this.x0 = 0; break;
            case 'Y': this.y0 = 0; break;
            case 'Z': this.z0 = 0; break;
        }
    }

    parseFilamentLenght(line) {
        this.length = this.getValues(line)[0];
    }

    parseFilamentUsedSlic3r(line) {
        let valueIndex = line.indexOf('=') + 1;
        let tokens = line.substring(valueIndex).trim().split(' ');

        if(tokens[0].endsWith('g')) {
            this.weight = tokens[0].replace('g', '');
        } 
        else if(tokens[0].endsWith('mm')) {
            this.length = tokens[0].replace('mm', '');
            this.volume = tokens[1].replace('(', '').replace('cm3)', '');
        }
    }

    parseVolume(line) {
        this.volume = this.getValues(line)[0];
    }

    parseWeight(line) {
        this.weight = this.getValues(line)[0];
    }

    getValues(line) {
        let valueIndex = line.indexOf(':') + 1;
        let tokens = line.substring(valueIndex).trim().split(' ');
        return tokens;
    }
};

export default GCode;