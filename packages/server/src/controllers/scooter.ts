const scooterData = require('../database/scooters.json');

class ScooterController {
    getScooters() {
        return JSON.parse(JSON.stringify(scooterData));
    }

    getScootersBy(params) {
        const { scooterId, startDate, endDate } = params;

        const data = JSON.parse(JSON.stringify(scooterData));

        return data.filter(({ id }: { id: number }) => id === Number(scooterId));
    }
}

export default ScooterController;
