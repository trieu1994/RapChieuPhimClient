export class Schedule {
  cinema_id: number;
  movie_id: number;
  listTime: string;
  dateShow: string;
  price: string;
  address: string;
  lng: string;
  lat: string;
}

export class AllInfoMovie {

    // status
    idStatus: number;
    status_name: string;

    // schedule
    idMovie: number;
    idCinema: number;
    showingDay: Date;
    showingTime: string;

    // movie
    eng_title: string;
    viet_title: string;
    genre: string;
    duration: string;
    release_day: string;
    direct: string;
    actor: string;
    image_url: string;
    desc: string;

    // cinema
    id: string;
}
// tslint:disable-next-line:class-name
export class Schedule_Movie {
    movie_id: number;
    cinema_id: number;
    dateShow: string;
    listTime: string;

// movie
    titleEng: string;
    titleViet: string;
    // genre: string;
    deration: string;
    pubDay: string;
    direct: string;
    actor: string;
    image: string;
    description: string;

    // cinema
    cinema: string;

}

