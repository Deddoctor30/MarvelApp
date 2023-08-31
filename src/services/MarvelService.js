import {useHttp} from '../hooks/http.hooks';

const MarvelService = () => {
   const {loading, request, error, clearError} = useHttp();
   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=120bb64d426861126a36cbbb871c5bac';
   const _baseOffset = 210;
   const _comics = 'https://gateway.marvel.com:443/v1/public/comics?';

   const getAllCharacters = async (offset = _baseOffset) => {               // offset по дефолту сделаем _baseOffset, но передаем offset для гибкости кода
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
   }

   const getCharacter = async (id) => {
      const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
      return _transformCharacter(res.data.results[0]);
   }

   const getCharacterByName = async (name) => {
      const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
   }

   const getAllComics = async (offset = _baseOffset) => {
      const res = await request(`${_comics}limit=8&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformComics);
   }

   const getComics = async (id) => {
      const res = await request(`${_apiBase}comics/${id}?&${_apiKey}`);
      return _transformComics(res.data.results[0]);
   }

   const _transformCharacter = (item) => {
      const nameLength = 26;
      return {
         id: item.id,
         name: item.name.length > nameLength ? `${item.name.slice(0, nameLength)}...` : item.name,
         description: item.description,
         thumbnail: `${item.thumbnail.path}.${item.thumbnail.extension}`,
         homepage: item.urls[0].url,
         wiki: item.urls[1].url,
         comics: item.comics.items.length > 5 ? item.comics.items.slice(0, 5) : item.comics.items,
      }
   }

   const _transformComics = (item) => {
      return {
         id: item.id,
         title: item.title,
         description: item.description || 'Находится в разработке',
         thumbnail: `${item.thumbnail.path}.${item.thumbnail.extension}`,
         pages: item.pageCount || 'Не найдено',
         price: item.prices[0].price || 'Не доступно',
         language: item.textObjects.language || 'Английский',
      }
   }

   return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics, getCharacterByName}
}

export default MarvelService;