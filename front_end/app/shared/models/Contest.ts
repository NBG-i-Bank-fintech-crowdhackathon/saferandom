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
				public date: number,
				public prize: string,
				public participantsArray: Array<Object>){
		console.log(this);
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
				if (state.id == this.id)
					return state;
			})[0].title;
		}catch(error){
			return "Demo";
		}

	}

	public getDate(): string{
		let date = new Date(this.date),
			dateStr = `${this.pad(date.getHours())}:${this.pad(date.getMinutes())} ${this.pad(date.getDate())}/${this.pad(date.getMonth()+1)}/${date.getFullYear()}`;
		console.log(date, dateStr);
		return dateStr;
	}

	private pad(num:number){
		return `00${num}`.slice(-2);
	}
}