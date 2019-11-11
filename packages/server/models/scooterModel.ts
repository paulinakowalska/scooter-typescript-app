const scooterData = require('./../views/scooters.json');

type ScooterType = {
    id: number;
    name: string;
};

type FilterScooterParamsType = {
    id: number;
};

type ScootersType = Array<ScooterType>;

class ScooterModel {
    public readonly data: ScootersType;

    constructor() {
        this.data = JSON.parse(JSON.stringify(scooterData));
    }

    get scooters(): ScootersType {
        return this.data;
    }

    getSelectedScooters(params): ScootersType {
        const { scooterId, startDate, endDate } = params;

        return this.data.filter(({ id }: FilterScooterParamsType) => id === Number(scooterId));
    }
}

module.exports = ScooterModel;
