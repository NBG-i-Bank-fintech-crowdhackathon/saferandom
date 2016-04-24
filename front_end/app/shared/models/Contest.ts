export class Contest{
	public static types: Array<Object> 
	 = [{ id: 1, title: "Bitcoin block" },
		{ id: 2, title: "S&P 500 stocks" },
		{ id: 3, title: "Weather Underground data" },
		{ id: 4, title: "Official Flight Landing Timestamps" }];


	public static contstates: Array<Object> = 
	                     [{ id: 0, title: "Open" },
						  { id: 1, title:   "In Draw" },
						  { id: 2, title: "Completed" },
						  { id: 3, title: "Cancelled" }];


	constructor(public id: number,
				public title:string,
				public state: number,
				public type: number,
				public date: string,
				public prize: string,
				public participantsArray: Array<Object>,
				public winner: number,
				public wintoken: string){

	}

	public getMethodTitle(): string{
		try {
			return Contest.types.filter((type: Object) => {
				if (type.id == this.type)
					return type;
			})[0].title;
		}catch(error){
			return Contest.types[0];
		}
	} 

	public getStateTitle(): string {
		try {
			return Contest.contstates.filter((state: Object) => {
				if (state.id == this.state)
					return state;
			})[0].title;
		}catch(error){
			return "Completed";
		}

	}

	public getWinnerName():string{
		if( this.state >= 2 ){
			return this.participantsArray.filter( (participant: Object) =>{
				return participant.id == this.winner;
			} )[0];
		}
	}

	public getDate(): string{
		return new Date(this.date);
	}
}