
export type BuildingUnitType = {
	unit_name: string;
	unit_type_id: string;
	number_of_units: number;
	number_of_rooms: number;
	other_rooms: any[];
	price: string;
	unit_description: string;
	unit_purpose: "lease" | "sale";
}

export type AddBuildingUnitType = BuildingUnitType & {
	unit_type: {
		name: string;
		id: string;
	};
}
