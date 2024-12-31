import Home from "../pages/Home";
import DetailMovie from "../pages/DetaileMovie";
import WatchMovie from "../pages/WatchMovie";
import DetailCast from "../pages/DetailCast";
import ListGenre from "../pages/ListGenre";
import GenreCountry from "../pages/GenreCountry";
import NewMovie from "../pages/NewMovie";
import SearchMovie from "../pages/SearchMovie";

const RouterPublic: {path: string, element: JSX.Element}[] = [
    {
        path: '/',
        element: <Home/>
    }
    ,{
        path: '/detailmovie/:id',
        element: <DetailMovie/>
    },
    {
        path: '/watchmovie/:id',
        element: <WatchMovie/>
    },
    {
        path: '/detailcast/:id',
        element: <DetailCast/>
    },
    {
        path: '/listgenre/:id',
        element: <ListGenre/>
    },
    {
        path: '/genrecountry/:id',
        element: <GenreCountry/>
    },
    {
        path: '/newmovie',
        element: <NewMovie/>
    },
    {
        path: '/searchmovie',
        element: <SearchMovie/>
    }
]

export {RouterPublic};