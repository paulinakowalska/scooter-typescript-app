const scooterData = require('../database/scooters.json');

type ScooterFilterParams = {
    scooterId: string;
    startDate: string;
    endDate: string;
};

type ScooterModel = {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
};

class ScooterController {
    getScooters(): Array<ScooterModel> {
        return JSON.parse(JSON.stringify(scooterData));
    }

    getScootersBy(params: ScooterFilterParams): Array<ScooterModel> {
        const { scooterId, startDate, endDate } = params;

        const data = JSON.parse(JSON.stringify(scooterData));

        return data.filter(
            (data: ScooterModel) =>
                data.id === Number(scooterId) || (data.startDate === startDate && data.endDate === endDate),
        );
    }
}

export default ScooterController;
