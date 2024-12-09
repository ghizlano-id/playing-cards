export enum MonsterType {
    PLANT = 'plant',
	ELECTRIC = 'electric',
	FIRE = 'fire',
	WATER = 'water'
}
export interface IMonsterProperties {
    imageUrl : string;
    color : string;
}

export const MonsterTypeProperties: {[key: string]: IMonsterProperties} = {
	[MonsterType.PLANT]: {
		imageUrl: 'assets/img/plant.png',
		color: 'rgba(135, 255, 124)'
	},
	[MonsterType.ELECTRIC]: {
		imageUrl: 'assets/img/icons8-electric-16.png',
		color: 'rgb(255, 255, 104)'
	},
	[MonsterType.FIRE]: {
		imageUrl: 'assets/img/icons8-fire-48.png',
		color: 'rgb(255, 104, 104)'
	},
	[MonsterType.WATER]: {
		imageUrl: 'assets/img/icons8-water-80.png',
		color: 'rgba(118, 234, 255)'
	},
}