import axios from 'axios';

let cancelKey;

const liveSearch = async (query) => {
    cancelKey && cancelKey.cancel();

    cancelKey = axios.CancelToken.source()
    try {
      const res = await axios(query, { cancelToken: cancelKey.token });
      const result = res.data;

      return result;
    } catch (error) {
        if(axios.isCancel(error)) {
          console.log('Request canceled');
        } else {
          console.log('Something went wrong: ', error.message)
        }
    }
}

export default liveSearch;